// local
import styles from './SearchUser.module.css';

const SearchUser = ({search, onChange}) => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search user..." value={search} onChange={onChange} />
        </div>
    );
};

export default SearchUser;
