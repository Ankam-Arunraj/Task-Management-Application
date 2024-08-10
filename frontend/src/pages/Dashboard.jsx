import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"

function Dashboard(){
    return(
        <div className="container-fluid">
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Dashboard