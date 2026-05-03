// local
import { auth, db } from './firebase/firebaseConfig';
import { getUserDetails } from './Redux/authUserSlice';
import { getProjectsData } from './Redux/projectsSlice';
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
import { useEffect, useState } from 'react';

// react router
import { useNavigate } from 'react-router';

// pages
import Offline from './pages/offline-page/Offline';

function App() {
    const themeValue = useSelector(getThemeValue)
    const userDetails = useSelector(getUserDetails)
    const tasksData = useSelector(getTasksData)
    const projectData = useSelector(getProjectsData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOnline, setIsOnline] = useState(window.navigator.onLine)

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

    // set all user tasks that he is owner or editor or viewer
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

            // sort tasks by dueDate first, by task will be end soon is first 
            uniqueTasks.sort((a, b) => {
                // if isCompleted is different
                if (a.isCompleted !== b.isCompleted) {
                    return a.isCompleted ? 1 : -1;
                }

                if (new Date(a.dueDate) < new Date(b.dueDate)) return -1
                if (new Date(a.dueDate) > new Date(b.dueDate)) return 1
                return 0
            })
            dispatch(setTasksData(uniqueTasks))
        }

        const qTasks = query(
            collection(db, "tasks"),
            where("userId", "==", userDetails?.id)
        );

        const qAccessTasksEditors = query(
            collection(db, "tasks"),
            where("access.editors", "array-contains", { id: userDetails?.id, email: userDetails?.email })
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
    }, [dispatch, userDetails?.id, userDetails?.email])

    // set all projects that user is owner or editor or viewer
    useEffect(() => {
        if (!userDetails?.id) return;

        let ownerProjects = [];
        let accessProjectsEditors = [];
        let accessProjectsViewers = [];

        function mergeAndDispatch() {
            const merged = [
                ...ownerProjects,
                ...accessProjectsEditors,
                ...accessProjectsViewers
            ];

            const uniqueProjects = Array.from(
                new Map(merged.map(p => [p.id, p])).values()
            );

            // sort projects by dueDate first, by project will be end soon is first
            uniqueProjects.sort((a, b) => {
                // if isCompleted is different
                if (a.isCompleted !== b.isCompleted) {
                    return a.isCompleted ? 1 : -1;
                }

                if (new Date(a.dueDate) < new Date(b.dueDate)) return -1
                if (new Date(a.dueDate) > new Date(b.dueDate)) return 1
                return 0
            });

            dispatch(setProjectsData(uniqueProjects));
        }

        // owner
        const qOwner = query(
            collection(db, "projects"),
            where("userId", "==", userDetails.id)
        );

        // editors
        const qEditors = query(
            collection(db, "projects"),
            where("access.editors", "array-contains", {
                id: userDetails.id,
                email: userDetails.email
            })
        );

        // viewers
        const qViewers = query(
            collection(db, "projects"),
            where("access.viewers", "array-contains", {
                id: userDetails.id,
                email: userDetails.email
            })
        );

        const unSub1 = onSnapshot(qOwner, (snapshot) => {
            ownerProjects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            mergeAndDispatch();
        });

        const unSub2 = onSnapshot(qEditors, (snapshot) => {
            accessProjectsEditors = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            mergeAndDispatch();
        });

        const unSub3 = onSnapshot(qViewers, (snapshot) => {
            accessProjectsViewers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            mergeAndDispatch();
        });

        return () => {
            unSub1();
            unSub2();
            unSub3();
        };
    }, [userDetails?.id, userDetails?.email, dispatch]);

    // set user categories when open app
    useEffect(() => {
        if (!userDetails?.id) return;

        // Categories snapshot
        const qCategories = query(
            collection(db, "categories"),
            where("userId", "==", userDetails.id)
        );
        const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
            const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // sort categories by created date (newest first)
            categories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            dispatch(setCategoriesData(categories))
        },
            (error) => console.error("categories error:", error));

        return () => {
            unsubscribeCategories()
        }
    }, [userDetails?.id, dispatch])

    // check deuDate to make it complete dynamically
    useEffect(() => {
        if (!tasksData || tasksData.length === 0) {
            return
        }
        tasksData?.map((task) => {
            if (new Date() > new Date(task.dueDate).getTime() && !task.isCompleted) {
                updateData("tasks", task.id, { isCompleted: true })
                return
            } else {
                return
            }
        })

        // project check project dueDate to make it complete dynamically
        if (!projectData || projectData.length === 0) {
            return
        }

        projectData?.map((project) => {
            if (new Date() > new Date(project.dueDate).getTime() && !project.isCompleted) {
                updateData("projects", project.id, { isCompleted: true, progress: "100" })
                return
            } else {
                return
            }
        })

    }, [tasksData, projectData])

    // check privacy to handle access users 
    useEffect(() => {
        // handle task privacy
        if (!tasksData || tasksData.length === 0) {
            return
        }

        const emptyAccess = {
            viewers: [],
            editors: []
        }

        tasksData?.map((task) => {
            if (task?.privacy === "private") {
                updateData("tasks", task.id, { access: { ...task?.access, ...emptyAccess } })
                return
            }
            else {
                return
            }
        })

        // handle project privacy
        if (!projectData || projectData.length === 0) {
            return
        }

        projectData?.map((project) => {
            if (project?.privacy === "private") {
                updateData("projects", project.id, { access: { ...project?.access, ...emptyAccess } })
                return
            }
            else {
                return
            }
        })

    }, [tasksData, projectData])

    // check project completion when progress is 100
    useEffect(() => {
        if (!projectData || projectData.length === 0) {
            return
        }

        projectData?.map((project) => {
            if (String(project.progress) == "100" && !project.isCompleted) {
                updateData("projects", project.id, { isCompleted: true })
                return
            } else {
                return
            }
        })
    }, [projectData])

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

    // handle offline mode
    useEffect(() => {
        const handleOffline = () => {
            setIsOnline(false)
        }
        const handleOnline = () => {
            setIsOnline(true)
        }
        window.addEventListener("offline", handleOffline)
        window.addEventListener("online", handleOnline)
        return () => {
            window.removeEventListener("offline", handleOffline)
            window.removeEventListener("online", handleOnline)
        }
    }, [])

    if (!isOnline) {
        return <Offline />
    }
    return (
        <>
            <Outlet />

        </>
    );
}

export default App;