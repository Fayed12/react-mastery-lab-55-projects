// local
import styles from './ChatList.module.css';
import UserChatList from "../UserChatList/UserChatList"
import SearchUser from "../SearchUser/SearchUser"
import getAllUsers from '../../fierbase-services/fireStore/getAllUsers';
import { selectUser } from '../../redux/authSlice';
import { setContectedUsers } from '../../redux/usersSlice';
import getAllChats from '../../fierbase-services/fireStore/getallChats';
import { setAllContectedChats, setCurrentChatId } from '../../redux/chatsSlice';

// react
import { useEffect, useState } from "react";

// redux
import { useSelector,useDispatch } from "react-redux";

const ChatList = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const date = (new Date().toISOString().split("T")[0]);
    const [search, setSearch] = useState("");
    const [data,setdata] = useState([])

    // handle click chat
    const handleClickChat = (id) => {
        dispatch(setCurrentChatId(id))
    }

    // fetch all users
    useEffect(() => {
        async function getALlContectedUsers() {
            const allContectedUsers = await getAllUsers(user?.uid);
            if(allContectedUsers.length > 0){
                dispatch(setContectedUsers(allContectedUsers))
                setdata(allContectedUsers)
            }
        }
        getALlContectedUsers();
    }, [user?.uid, dispatch]);

    // fetch all chats
    useEffect(() => {
        async function getALlContectedChats() {
            const allContectedChats = await getAllChats(user?.uid);
            if(allContectedChats.length > 0){
                dispatch(setAllContectedChats(allContectedChats))
            }
        }
        getALlContectedChats();

    }, [user?.uid, dispatch]);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>chats</span>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.searchUser}>
                <SearchUser onChange={(e) => setSearch(e.target.value)} search={search} />
            </div>
            <div className={styles.chatList}>
                {data.map((item,index)=>{
                    return (
                        <>
                        <UserChatList key={index} data={item} loginUser={user} handleClickChat={handleClickChat}/>
                        </>
                    )
                })}
            </div>
        </div>
    );
};

export default ChatList;
