import axios from "axios";

export async function getSimpleFaderPage() {
    const rawResponse = await fetch(`/api/fp/simplepage`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + "No Token"},
    });
    const content = await rawResponse.json();
    return content;
}


export const getInfo = () =>
    axios.get(`/api/info`).then(response => response.data)


