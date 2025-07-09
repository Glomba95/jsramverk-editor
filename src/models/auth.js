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
        console.log("models/auth loginUser response: \n", response);
        console.log("models/auth loginUser result: \n", result);


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
        console.log("models/auth registerUser response: \n", response);
        console.log("models/auth registerUser result: \n", result);

        if (!response.ok) {
            // NOTE if not ok but works is it the Status? if so Created? (status 201)
            console.log("authmodel: !response.ok");
            return {
                success: false,
                message: result.errorMessage
            }
        }

        // Automatically log in after registration
        const loginUserRes = await auth.loginUser(user);

        // REVIEW Behövs en parameter läggas till här för att vid miss påvisa huruvida registreringen eller inloggningen failade?
        return loginUserRes;
    }
};

export default auth;