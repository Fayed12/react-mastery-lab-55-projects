// local
import { auth, db } from './firebase/firebaseConfig';
import { getUserDetails } from './Redux/authUserSlice';
import { setDataError, setDataLoading, setUserData } from './Redux/authUserSlice';
import { getThemeValue } from './Redux/themeSlice';
import { getTasksData, setTasksData } from './Redux/tasksSlice';
import { setCategoriesData } from './Redux/categoriesSlice';
import { setProjectsData } from './Redux/projectsSlice';
import updateData from "./firebase/updateExistingData"
import { setAllUsersData } from './Redux/authUserSlice';

// react router
import { Outlet } from 'react-router'

// react redux
import { useSelector, useDispatch } from 'react-redux';

// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

// react 
import { useEffect } from 'react';

// react router
import { useNavigate } from 'react-router';

function App() {
    const themeValue = useSelector(getThemeValue)
    const userDetails = useSelector(getUserDetails)
    const tasksData = useSelector(getTasksData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // set user data when login user changed
    useEffect(() => {
        dispatch(setDataLoading());

        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    const userdata = {
                        name: user?.displayName,
                        email: user?.email,
                        id: user?.uid
                    }
                    dispatch(setUserData(userdata));
                } else {
                    dispatch(setUserData(null));
                }
            },
            (error) => {
                console.error(error);
                dispatch(setDataError());
            }
        );

        return () => unsubscribe();
    }, [dispatch]);

    // set all user tasks and all related task he has connect with it 
    useEffect(() => {
        if (!userDetails?.id) return;

        // tasks snapshot
        let ownerTasks = [];
        let accessTasksEditors = [];
        let accessTasksViewers = [];

        // function that take all returned values and merge it then use New map to remove duplicated tasks and return it as array but Array.from
        function mergeAndDispatch() {
            const merged = [...ownerTasks, ...accessTasksEditors, ...accessTasksViewers];

            const uniqueTasks = Array.from(
                new Map(merged.map(t => [t.id, t])).values()
            );
            dispatch(setTasksData(uniqueTasks))
        }

        const qTasks = query(
            collection(db, "tasks"),
            where("userId", "==", userDetails?.id)
        );

        const qAccessTasksEditors = query(
            collection(db, "tasks"),
            where("access.editors", "array-contains", { id: userDetails?.id, email: userDetails?.email  })
        );

        const qAccessTasksViewers = query(
            collection(db, "tasks"),
            where("access.viewers", "array-contains", { id: userDetails?.id, email: userDetails?.email })
        );

        const unSub1 = onSnapshot(qTasks, (snapshot) => {
            ownerTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            mergeAndDispatch()
        }, (error) => console.error("Tasks error:", error));

        const unSub2 = onSnapshot(qAccessTasksEditors, (snapshot) => {
            accessTasksEditors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            mergeAndDispatch()
        }, (error) => console.error("Tasks Editors error:", error));

        const unSub3 = onSnapshot(qAccessTasksViewers, (snapshot) => {
            accessTasksViewers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            mergeAndDispatch()
        }, (error) => console.error("Tasks Viewers error:", error));

        return () => {
            unSub1()
            unSub2()
            unSub3()
        }
    }, [dispatch, userDetails?.id,userDetails?.email])

    // set user categories and projects when open app
    useEffect(() => {
        if (!userDetails?.id) return;

        // Categories snapshot
        const qCategories = query(
            collection(db, "categories"),
            where("userId", "==", userDetails.id)
        );
        const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
            const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            dispatch(setCategoriesData(categories))
        },
            (error) => console.error("categories error:", error));


        // projects snapshot
        const qProjects = query(
            collection(db, "projects"),
            where("userId", "==", userDetails.id)
        );
        const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
            const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            dispatch(setProjectsData(projects))
        }, (error) => console.error("projects error:", error));

        return () => {
            unsubscribeCategories()
            unsubscribeProjects()
        }
    }, [userDetails?.id, dispatch])

    // check deuDate to make it complete dynamically
    useEffect(() => {
        if (!tasksData || tasksData.length === 0) {
            return
        }
        tasksData?.map((task) => {
            if (new Date() > new Date(task.dueDate).getTime()) {
                updateData("tasks", task.id, { isCompleted: true })
                return
            } else {
                return
            }
        })

    }, [tasksData])

    // go to app if user is logged in and user data is exit
    useEffect(() => {
        if (userDetails) {
            navigate("/dashboard", { replace: true })
        }
    }, [userDetails, navigate])

    // handle theme based on theme value
    useEffect(() => {
        if (themeValue === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [themeValue])

    // handle get all users form database 
    useEffect(() => {
        const qUsers = query(collection(db, "users"));

        const unsubscribeTasks = onSnapshot(qUsers, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            dispatch(setAllUsersData(users))
        })

        return () => unsubscribeTasks()

    }, [dispatch])

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;