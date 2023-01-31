import React, { useEffect, useState, createContext } from 'react'
import { getLoggedInUser, loginApi } from '../api/user';
const AuthContext = createContext({
    user: null,
    setUser: (user) => { },
    showLoginForm: false,
    setShowLoginForm: (show) => { },
    login: (email, password) => { },
    logout: () => { },
});

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(false);

    function login(email, password) {
        loginApi(email, password)
            .then(response => {
                const { token } = response.data.data;
                localStorage.setItem('auth-token', token);
                console.log(response.data)
                setShowLoginForm(true);
            })
            .catch(err => {
                alert('Login failed', {
                    type: 'error'
                })
            });
        console.log("login() in Auth context " + email + " " + password);
    }

    function logout() {
        localStorage.removeItem('auth-token');
        window.location.reload();
    }

    useEffect(() => {
        getLoggedInUser()
            .then(response => {
                const user = response.data.data;

                setUser(user);
            })
    }, [showLoginForm])

    return <AuthContext.Provider value={{
        user, setUser,
        showLoginForm, setShowLoginForm,
        login, logout,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;