// local
import { auth, db } from './firebase/firebaseConfig';
import { getUserDetails } from './Redux/authUserSlice';
import { setDataError, setDataLoading, setUserData } from './Redux/authUserSlice';
import { getThemeValue } from './Redux/themeSlice';
import { setTasksData } from './Redux/tasksSlice';
import { setCategoriesData } from './Redux/categoriesSlice';
import { setProjectsData } from './Redux/projectsSlice';

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

    // set user tasks, categories and projects when open app
    useEffect(() => {
        if (!userDetails?.id) return;

        // tasks snapshot
        const qTasks = query(
            collection(db, "tasks"),
            where("userId", "==", userDetails.id)
        );
        const unsubscribeTasks = onSnapshot(qTasks, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            dispatch(setTasksData(tasks))
        },
            (error) => console.error("Tasks error:", error));


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
        },
            (error) => console.error("projects error:", error));

        return () => {
            unsubscribeTasks()
            unsubscribeProjects()
            unsubscribeCategories()
        }
    }, [dispatch, userDetails?.id])

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

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;