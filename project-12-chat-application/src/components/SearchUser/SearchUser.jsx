// local
import styles from './SearchUser.module.css';

// react
import { useEffect } from 'react';

const SearchUser = ({ search, onChange, setFilteredUsers, users }) => {
    useEffect(() => {
        const filtered = users?.filter((user) => user?.displayName?.toLowerCase().includes(search?.toLowerCase()));
        setFilteredUsers(filtered);
    }, [search, users, setFilteredUsers]);
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search user..." value={search} onChange={onChange} />
        </div>
    );
};

export default SearchUser;
