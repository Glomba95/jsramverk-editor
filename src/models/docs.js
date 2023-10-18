const docs = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-ebam18.azurewebsites.net",
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${docs.baseUrl}`);
        const result = await response.json();
        
        return result;
    },
    createDoc: async function createDoc(document) {
        const response = await fetch(`${docs.baseUrl}`, {
            body: JSON.stringify(document),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();

        return result;
    },
    updateDoc: async function updateDoc(document) {
        fetch(`${docs.baseUrl}`, {
            body: JSON.stringify(document),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    }
};

export default docs;