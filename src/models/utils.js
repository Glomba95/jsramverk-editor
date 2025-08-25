const baseUrl = window.location.href.includes("localhost") ?
    "http://localhost:1337" :
    "https://www.student.bth.se/~ebam18/editor"
// "https://jsramverk-editor-ebam18.azurewebsites.net",

const utils = {
    baseUrl: baseUrl,
    graphqlUrl: `${baseUrl}/graphql`,
    useFetch: async function useFetch(query, variables = null, useToken = false) {
        try {
            const body = { query };

            if (variables) {
                body.variables = variables;
            }

            const headers = { 'content-type': 'application/json' };

            if (useToken) {
                const token = localStorage.getItem('token');
                headers['x-access-token'] = token;
            }

            const response = await fetch(utils.graphqlUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            return result.data;

        } catch (err) {
            console.error("GraphQL fetch error:", err);
            return { success: false, message: `GraphQL fetch error: ${err}` };
        }
    }
};

export default utils;