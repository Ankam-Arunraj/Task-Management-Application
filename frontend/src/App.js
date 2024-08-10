import logo from './logo.svg';
import './App.css';
import TaskList from './pages/TaskList';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import NavBar from './pages/NavBar';
import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './pages/PrivateRoutes';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import MyTask from './pages/MyTask';
import Users from './pages/Users';
import AdminTaskList from './pages/admin/AdminTaskList';
import { useEffect, useState } from 'react';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
        <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<Dashboard/>}>
            <Route path="/tasks" element={<TaskList/>}></Route>
            <Route path="/adminTasks" element={<AdminTaskList/>}></Route>
            <Route path="/mytask" element={<MyTask/>}></Route>
            <Route path="/create-task" element={<CreateTask/>}></Route>
            <Route path="/users" element={<Users/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/change_password" element={<ChangePassword/>}></Route>
        </Route>
      </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;