// AuthProvider.js

import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ecoplant-back.yirade.dev/api/v1/login/', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            });
    
            if (response.status === 200) {
                const data = await response.json(); 
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                history.push('/');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ecoplant-back.yirade.dev/api/v1/register/', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'email': e.target.email.value,
                    'password': e.target.password.value
                })
            });
    
            if (response.status === 200) {
                const data = await response.json(); 
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                history.push('/');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.push('/login');
    };

    const updateToken = async () => {
        try {
            const response = await fetch('https://ecoplant-back.yirade.dev/api/v1/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': authTokens?.refresh })
            });
    
            if (response.status === 200) {
               
            } else {
                logoutUser();
            }
    
            if (loading) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            logoutUser();
        }
    };
    

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        registerUser: registerUser, // Add registerUser to context data
        logoutUser: logoutUser,
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);

    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
