import utils from "./utils.js";

const auth = {
    loginUser: async function loginUser(user) {
        const query = `
            mutation LoginUser($user: UserInput!) {
                loginUser(user: $user) {
                    success
                    token
                    errorType
                    message
                }
            }
        `;

        const result = await utils.useFetch(query, { user });
        const data = result.loginUser;

        if (data.token) {
            localStorage.setItem('token', data.token);
            return {
                success: true
            };
        }

        return {
            success: false,
            message: data.message
        };

    },
    registerUser: async function registerUser(user) {
        const query = `
            mutation RegisterUser($user: UserInput!) {
                registerUser(user: $user) {
                    success
                    errorType
                    message
                }
            }
        `;

        const result = await utils.useFetch(query, { user });
        const data = result.registerUser;

        if (data.success) {
            console.log("User registred successfully.");
            // Automatically log in after registration
            return await auth.loginUser(user);
        }

        return data;
    },
    verifyUser: async function verifyUser(username) {
        // Used when sharing doc rights with other users to verify entered username is a registred user.
        const query = `
            query VerifyUser($username: String!) {
                verifyUser(username: $username)
            }
        `;

        const result = await utils.useFetch(query, { username });

        if (result.success === false) {
            return false;
        }

        // Returnerar true eller false
        return result.verifyUser;
    }
};

export default auth;