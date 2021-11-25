import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link,NavLink,Navigate } from "react-router-dom";
import logo  from '../logo.svg';


export const Navigation = () => {
    return (
        <BrowserRouter>
            <div className="main-layout">
                <nav>
                    <img src={logo}  alt="React logo" />
                    <ul>
                        <li>
                            <NavLink to="/home" className={ ({isActive})=> isActive ? 'isActive':''} >Home </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={ ({isActive})=> isActive ? 'isActive':''} >about</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users" className={ ({isActive})=> isActive ? 'isActive':''} >Users</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>


            <Routes>
                <Route path="home" element={<h1>Home</h1>} />
                <Route path="about" element={<h1>about</h1>} />
                <Route path="users" element={<h1>users</h1>} />
                <Route path="/*" element={<Navigate to="/home" replace /> } />
            </Routes>
        </BrowserRouter>
    )
}
