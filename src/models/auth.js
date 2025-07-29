const auth = {
    // baseUrl: window.location.href.includes("localhost") ?
    //     "http://localhost:1337" :
    //     "https://jsramverk-editor-ebam18.azurewebsites.net",
    baseUrl: "http://localhost:1337",
    loginUser: async function loginUser(user) {
        const response = await fetch(`${auth.baseUrl}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();

        if (!response.ok) {
            console.log("authmodel: !response.ok");
            return {
                success: false,
                message: result.errorMessage
            }
        }
        if (result.token) {
            localStorage.setItem('token', result.token);

            return {
                success: true,
            };
        }
    },
    registerUser: async function registerUser(user) {
        const response = await fetch(`${auth.baseUrl}/auth/register`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.errorMessage
            }
        }

        // Automatically log in after registration
        const loginUserRes = await auth.loginUser(user);

        return loginUserRes;
    },
    verifyUser: async function verifyUser(username) {
        // Used when sharing doc rights with other users to verify entered username is a registred user.
        const response = await fetch(`${auth.baseUrl}/auth/verifyuser`, {
            body: JSON.stringify({ username }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        // returns user if username is registred else false
        return result;
    }
};

export default auth;