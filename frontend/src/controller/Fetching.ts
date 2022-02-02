import axios from "axios";
import {FaderItem} from "../model/BackendConnection";

export async function getSimpleFaderPage() {
    const rawResponse = await fetch(`/api/faderpage/simplepage`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + "No Token"},
    });
    return rawResponse.json();
}

export async function postSingleFader(faderItem: FaderItem) {
    await fetch(`/api/faderpage/setvalue`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderItem )
    });
}



export const getInfo = () =>
    axios.get(`/api/info`).then(response => response.data)


