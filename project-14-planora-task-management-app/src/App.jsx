// local
import { auth } from './firebase/firebaseConfig';
import { getUserDetails } from './Redux/authUserSlice';
import { setDataError, setDataLoading, setUserData } from './Redux/authUserSlice';

// react router
import { Outlet } from 'react-router'

// react redux
import { useSelector, useDispatch } from 'react-redux';

// firebase
import { onAuthStateChanged } from 'firebase/auth';

// react 
import { useEffect } from 'react';

// react router
import { useNavigate } from 'react-router';

function App() {

    const userDetails = useSelector(getUserDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(userDetails)
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

    // go to app if user is logged in and user data is exit
    useEffect(() => {
        if (userDetails) {
                navigate("/dashboard", {replace: true})
        }
    }, [userDetails, navigate])

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;