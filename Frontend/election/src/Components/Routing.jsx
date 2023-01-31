import React from 'react'
import {Route, Routes } from "react-router-dom";
import SignIn from './SignIn';
import SignUp from './SignUp';
const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<h2>Login successful</h2>} />
                <Route path='/auth/login' element={<SignIn />} />
                <Route path='/auth/signup' element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default Routing;
