import React, { useState } from 'react';

import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

import './AuthForm.css';

export default function AuthForm({ showAuthForm, setShowAuthForm, setLoggedIn }) {

    return (
        <>
            {showAuthForm === "login" && (
                <LoginForm
                    setShowAuthForm={setShowAuthForm}
                    setLoggedIn={setLoggedIn}
                />
            )}
            {showAuthForm === "register" && (
                <RegisterForm
                    setShowAuthForm={setShowAuthForm}
                    setLoggedIn={setLoggedIn}
                />
            )}
        </>
    );
}