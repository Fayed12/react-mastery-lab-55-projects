// local
import { getPopularTV } from "../../services/tmdbApi";
import { getTopRatedTV } from "../../services/tmdbApi";
import { getOnTheAirTV } from "../../services/tmdbApi";
import styles from "./tvPage.module.css"
import SetActionValue from "../../components/action-value/setActionValue";
import SetPageValue from "../../components/page-value/setPageValue";
import CardGrid from "../../components/grid-cards/CardGrid";

// react
import { useState, useEffect } from "react";

function TvPage() {
    const [action, setAction] = useState("popular")
    const [page, setPage] = useState(1)
    const [data, setData] = useState()

        // handle data based on action 
        useEffect(() => {
            if (action === "popular") {
                async function getPopular() {
                    const data = await getPopularTV(page);
                    if (data) {
                        setData(data)
                    }
                }
                getPopular()
            }
    
            if (action === "topRated") {
                async function getTopRated() {
                    const data = await getTopRatedTV(page);
                    if (data) {
                        setData(data)
                    }
                }
                getTopRated()
            }
    
            if (action === "onTheAir") {
                async function getOnTheAir() {
                    const data = await getOnTheAirTV(page);
                    if (data) {
                        setData(data)
                    }
                }
                getOnTheAir()
            }
        }, [action, page])
    return (
        <div className={styles.moviesPage}>
            <div className={styles.header}>
                <h1>tv / Series Collection</h1>
                <SetActionValue changedName="onTheAir" action={action} setAction={setAction} setPage={setPage} />
            </div>

            <>
                <CardGrid data={data}/>
            </>
            
            <SetPageValue setPage={setPage} page={page} toatPages={data?.total_pages}/>
        </div>
    );
}

export default TvPage;
