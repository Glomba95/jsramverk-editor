import React, { useState } from 'react';
import authModel from '../../../models/auth.js';

export default function RegisterForm({ setShowAuthForm, setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(e) {
        e.preventDefault();

        if (username !== "" && password !== "") {
            const user = {
                username: `${username}`,
                password: `${password}`
            }

            const result = await authModel.registerUser(user);

            if (result.success) {
                setLoggedIn(true);

                setUsername("");
                setPassword("");
                setShowAuthForm("none");
            } else {
                alert(result.message);
            }
        }
    }

    // Form to register user.
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Register</h2>
                <button
                    className="link-style-button"
                    type="button"
                    onClick={() => setShowAuthForm("login")}
                >
                    Already have an account? <b>Login</b>
                </button>
                <form onSubmit={register}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" >Register</button>
                </form>
            </div>
        </div>
    );
}