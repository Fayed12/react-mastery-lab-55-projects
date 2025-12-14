// local
import styles from './ChatList.module.css';
import UserChatList from "../UserChatList/UserChatList";
import SearchUser from "../SearchUser/SearchUser"
import getAllUsers from '../../fierbase-services/fireStore/getAllUsers';
import { selectUser } from '../../redux/authSlice';
import { setContectedUsers } from '../../redux/usersSlice';
import { setCurrentChatId } from '../../redux/chatsSlice';
import { getContectedUsersData } from '../../redux/usersSlice';
import { getCurrentChatId } from "../../redux/chatsSlice.js";

// react
import { useEffect, useState } from "react";

// redux
import { useSelector,useDispatch } from "react-redux";

const ChatList = () => {

    const date = (new Date().toISOString().split("T")[0]);

    // global state
    const user = useSelector(selectUser);
    const contectedUsers = useSelector(getContectedUsersData);
    const currentChatId = useSelector(getCurrentChatId)
    const dispatch = useDispatch();

    // local state
    const [filteredUsers, setFilteredUsers] = useState(contectedUsers || []);
    const [search, setSearch] = useState("")

    // handle click chat
    const handleClickChat = (id) => {
        if (currentChatId === id) return;

        dispatch(setCurrentChatId(id));
    }

    // fetch all users
    useEffect(() => {
        async function getALlContectedUsers() {
            const allContectedUsers = await getAllUsers(user?.uid);
            
            if(allContectedUsers.length > 0){
                dispatch(setContectedUsers(allContectedUsers))
            }
        }
        getALlContectedUsers();
    }, [user?.uid, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>chats</span>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.searchUser}>
                <SearchUser onChange={(e) => setSearch(e.target.value)} search={search} users={contectedUsers} setFilteredUsers={setFilteredUsers} />
            </div>
            <div className={styles.chatList}>   
                {filteredUsers?.map((item, index) => {
                    return (
                        <UserChatList key={index} data={item} loginUser={user} handleClickChat={handleClickChat} />
                    )
                })}
            </div>
        </div>
    );
};

export default ChatList;
