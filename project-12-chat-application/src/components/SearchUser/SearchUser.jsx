import styles from './SearchUser.module.css';

const SearchUser = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search user..." />
        </div>
    );
};

export default SearchUser;
