const docs = {
    // baseUrl: window.location.href.includes("localhost") ?
    //     "http://localhost:1337" :
    //     "https://jsramverk-editor-ebam18.azurewebsites.net",
    //REVIEW - set token as a docs property?
    baseUrl: "http://localhost:1337",
    getAllDocs: async function getAllDocs() {
        let token = localStorage.getItem('token');
        const response = await fetch(`${docs.baseUrl}/docs`, {
            headers: {
                'x-access-token': token
            }
        });
        const result = await response.json();

        return result;
    },
    createDoc: async function createDoc(document) {
        let token = localStorage.getItem('token');
        const response = await fetch(`${docs.baseUrl}/docs`, {
            body: JSON.stringify(document),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: 'POST'
        });
        const result = await response.json();

        return result;
    },
    updateDoc: async function updateDoc(id, document) {
        let token = localStorage.getItem('token');
        fetch(`${docs.baseUrl}/docs/${id}`, {
            body: JSON.stringify(document),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: 'PUT'
        });
    }
};

export default docs;