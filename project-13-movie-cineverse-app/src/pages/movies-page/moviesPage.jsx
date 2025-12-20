// {optional} each movie ar tv contain link to show it

// local
import styles from "./movies.module.css"
import { getPopularMovies } from "../../services/tmdbApi";
import { getTopRatedMovies } from "../../services/tmdbApi";
import { getUpcomingMovies } from "../../services/tmdbApi";
import SetActionValue from "../../components/action-value/setActionValue";
import SetPageValue from "../../components/page-value/setPageValue";
import CardGrid from "../../components/grid-cards/CardGrid";

// react
import { useEffect, useState } from "react";

function MoviesPage() {
    const [action, setAction] = useState("popular")
    const [page, setPage] = useState(1)
    const [data, setData] = useState()

    // handle data based on action 
    useEffect(() => {
        if (action === "popular") {
            async function getPopular() {
                const data = await getPopularMovies(page);
                if (data) {
                    setData(data)
                }
            }
            getPopular()
        }

        if (action === "topRated") {
            async function getTopRated() {
                const data = await getTopRatedMovies(page);
                if (data) {
                    setData(data)
                }
            }
            getTopRated()
        }

        if (action === "upcoming") {
            async function getUpcoming() {
                const data = await getUpcomingMovies(page);
                if (data) {
                    setData(data)
                }
            }
            getUpcoming()
        }
    }, [action, page])

    return (
        <div className={styles.moviesPage}>
            <div className={styles.header}>
                <h1>Movies Collection</h1>
                <SetActionValue changedName="onTheAir" action={action} setAction={setAction} setPage={setPage} />
            </div>

            <>
            <CardGrid data={data}/>
            </>

            <SetPageValue setPage={setPage} toatPages={data?.total_pages} page={page}/>
        </div>
    );
}

export default MoviesPage;
