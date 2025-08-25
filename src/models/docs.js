import utils from "./utils.js";

const docs = {
    getAllDocs: async function getAllDocs() {
        // TODO Byt namn på funktionen och queryn (lokala) från getAllDocs till något mer väl beskrivande

        // REVIEW vilka behövs?
        const query = `
            query GetAllDocs {
                documents {
                    _id
                    name
                    content
                    owner
                    sharedWith
                }
            }
        `;

        const result = await utils.useFetch(query, null, true);

        if (result.success === false) {
            return [];
        }

        // Returnerar array, alla dokument där inloggad användare är owner eller ingår i sharedWith.
        return result.documents;
    },
    createDoc: async function createDoc(document) {
        const query = `
            mutation CreateDoc($document: DocInput!) {
                createDoc(document: $document) {
                    _id
                    name
                    content
                    owner
                    sharedWith
                }
            }
        `;

        const result = await utils.useFetch(query, { document }, true);

        if (result.success === false) {
            return null;
        }

        // Returnerar det nyss skapade dokumentet
        return result.createDoc;
    },
    updateDoc: async function updateDoc(docId, doc) {
        const query = `
            mutation UpdateDoc($docId: ID!, $doc: DocInput!) {
                updateDoc(docId: $docId, doc: $doc)
            }
        `;

        const result = await utils.useFetch(query, { docId, doc }, true);

        if (result.success === false) {
            return false;
        }

        // updateDoc returnerar true eller false
        return result.updateDoc;
    },
    shareDoc: async function shareDoc(docId, shareWithUsername) {
        const query = `
            mutation ShareDoc($docId: ID!, $shareWithUsername: String!) {
                shareDoc(docId: $docId, shareWithUsername: $shareWithUsername) {
                    success
                    message
                    errorType
                }
            }
        `;

        const result = await utils.useFetch(query, { docId, shareWithUsername }, true);

        return result.shareDoc;
    }
};

export default docs;