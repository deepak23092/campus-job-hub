import React from 'react';
import LoginSignupContext from './loginSignupContext';

const LoginSignupState = (props) => {
    const host = 'https://campus-jobhub.vercel.app';

    const loginDetails = async (email, password) => {
        try {
            const response = await fetch(`${host}/company/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                // Redirect or update state to indicate successful login
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error state or display an error message to the user
        }
    };

    const signupDetails = async (name, email, password, confirmPassword, description, website) => {
        try {
            const response = await fetch(`${host}/company/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, email, password, confirmPassword, description, website }),
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                // Redirect or update state to indicate successful signup
            }
        } catch (error) {
            console.error('Error during signup:', error);
            // Handle error state or display an error message to the user
        }
    };

    return (
        <LoginSignupContext.Provider value={{ loginDetails, signupDetails }}>
            {props.children}
        </LoginSignupContext.Provider>
    );
};

export default LoginSignupState;
