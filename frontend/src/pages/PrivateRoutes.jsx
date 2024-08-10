import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes(){
    const isLoogedIn = localStorage.getItem("isLoggedIn");
    return(
        isLoogedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;
    