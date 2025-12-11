// local
import styles from './searchPopup.module.css';
import SearchUser from "../SearchUser/SearchUser"
import MainButton from '../ui/button/mainButton';
import { getAllAppUsersData } from '../../redux/usersSlice';
import { setCurrentChatId, setIsThereIsChat } from '../../redux/chatsSlice';
import { selectUser } from '../../redux/authSlice';
import {createNewChat} from "../../fierbase-services/fireStore/addNewChat"
import updateUserField from '../../fierbase-services/fireStore/updateValueInUsers';
import { setCurrentUserData } from '../../redux/chatsSlice';
import { getLoginUserData } from '../../redux/usersSlice';

// react
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';

// react icons
import { RxAvatar } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";

const SearchPopup = ({ closePopup }) => {
    const allAppUsers = useSelector(getAllAppUsersData);
    const loginUser = useSelector(selectUser);
    const loginUserData = useSelector(getLoginUserData);
    const dispatch = useDispatch();

    // local state
    const [filteredUsers, setFilteredUsers] = useState(allAppUsers);
    const [search, setSearch] = useState("");

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    // handle add new chat with any chat
    const handleStartChat = (user) => {
        // create chat id
        const chatId = loginUser.uid > user.uid ? `${loginUser.uid}-${user.uid}` : `${user.uid}-${loginUser.uid}`;

        // create chat
        async function createChat() {
            // create new chat
            await createNewChat(loginUser.uid, user.uid);

            // update user contactedUsers to both users
            if (!loginUserData?.contactedUsers?.includes(user.uid)) {
                const id = user.uid
                await updateUserField(loginUser.uid, {
                    contactedUsers: [...loginUserData.contactedUsers,id]
                });
            }
            if (!user?.contactedUsers?.includes(loginUser.uid)) {
                const id = loginUser.uid
                await updateUserField(user.uid, {
                    contactedUsers: [...user.contactedUsers,id]
                });
            }

            // update redux to open new chat
            dispatch(setCurrentChatId(chatId))
            dispatch(setIsThereIsChat(true))
            dispatch(setCurrentUserData(user))

            // close popup
            closePopup()
        }
        createChat();
    }
    return (
        <div className={styles.container} onClick={closePopup}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.headerRow}>
                    <h3>New Chat</h3>
                    <button className={styles.closeBtn} onClick={closePopup}><IoClose /></button>
                </div>
                <div className={styles.searchContainer}>
                    <SearchUser search={search} onChange={onChange} users={allAppUsers} setFilteredUsers={setFilteredUsers} />
                </div>
                <div className={styles.userContainer}>
                    {
                        filteredUsers?.map((user) => (
                            <div key={user?.uid} className={styles.user}>
                                <div className={styles.userInfoLeft}>
                                    <div className={styles.avatar}>
                                        <RxAvatar />
                                    </div>
                                    <div className={styles.userDetails}>
                                        <span className={styles.displayName}>{user?.displayName}</span>
                                        <span className={styles.email}>{user?.email}</span>
                                    </div>
                                </div>
                                <div className={styles.actionRight}>
                                    <MainButton children={<><FaPlus /> Start Chat</>} title={"Start Chat"} type={"button"} onclick={() => handleStartChat(user)} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
