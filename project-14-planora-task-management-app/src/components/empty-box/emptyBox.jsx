// local
import styles from "./emptyBox.module.css"
import MainButton from "../../ui/button/MainButton"

// react icons
import { MdAddToPhotos } from "react-icons/md"

function EmptyBox({ title, navigateFunc }) {
    return (
        <div className={styles.emptyBox}>
            <h1>No {title} Yet</h1>
            <p>Start by creating your first {title}</p>
            <MainButton title={`start create ${title}`} content={<span>Create new {title} <MdAddToPhotos /></span>} clickEvent={navigateFunc} />
        </div>
    )
}

export default EmptyBox