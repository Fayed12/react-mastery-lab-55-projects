// react router
import { Outlet, useLocation } from "react-router";

// local
import PlogNav from "../components/plog-layout/plogNavBar/plogNav";
import Footer from "../components/home-layout/Footer/Footer";

function BlogLayout() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const pageNames = {
        allPostsHome: "Home",
        postDetails: "Post Details",
        createPost: "Create Post",
        profile: "Profile",
        settings: "Settings"
    };

    const linkName = pageNames[path] || "Home";
    return (
        <div className="container">
            <PlogNav />
            <main className="main">
                <div className="header">
                    <p>Blog / <span>{linkName}:</span></p>
                </div>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default BlogLayout;
