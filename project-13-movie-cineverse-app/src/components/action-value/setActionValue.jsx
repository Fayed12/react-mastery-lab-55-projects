// local
import styles from "./setAction.module.css"

function SetActionValue({ changedName, action, setAction, setPage }) {

    return (
        <>
            <div className={styles.sortActions}>
                <ul>
                    <li
                        className={action === "popular" ? styles.active : ""}
                        onClick={() => { setAction("popular"); setPage(1); }}
                    >
                        Popular
                    </li>
                    <li
                        className={action === "topRated" ? styles.active : ""}
                        onClick={() => { setAction("topRated"); setPage(1); }}
                    >
                        Top Rated
                    </li>
                    <li
                        className={action === changedName ? styles.active : ""}
                        onClick={() => { setAction(`${changedName}`); setPage(1); }}
                    >
                        Upcoming
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SetActionValue;