import React, { useState } from 'react';
import authModel from '../../../models/auth.js';

export default function LoginForm({ setShowAuthForm, setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();

        if (username !== "" && password !== "") {
            // TODO kontrollera input för ogiltiga tecken.
            const user = {
                username: `${username}`,
                password: `${password}`
            }

            const result = await authModel.loginUser(user);

            if (result.success) {
                localStorage.setItem("activeUser", username);
                setLoggedIn(true);

                setUsername("");
                setPassword("");
                setShowAuthForm("none");
            } else {
                console.log("login() !result.success.");
                console.log("login() result: \n", result);
                alert(result.message);
            }
        }
    }

    // Form to login user.
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <button
                    className="link-style-button"
                    type="button"
                    onClick={() => setShowAuthForm("register")}
                >
                    Don't have an account? <b>Register</b>
                </button>
                <form onSubmit={login}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" >Login</button>
                </form>
            </div>
        </div>
    );
}
