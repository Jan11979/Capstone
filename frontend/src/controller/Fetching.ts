import {
    DbCommandItem,
    FaderItem,
    FaderPageSelect,
    CreateFixtureItem,
    ActiveFixtureItem, FixtureItem, LoginData
} from "../model/BackendConnection";
import axios from "axios";
import {STORAGE_KEY_TOKEN} from "./DataService";



export const postLogin = (loginData: LoginData) =>
    axios.post(`/auth/login`, loginData).then(response => response.data)
// export async function postLogin(loginData: LoginData) {
//     const rawResponse = await fetch(`/auth/login`, {
//         method: 'POST',
//         headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
//         body: JSON.stringify(loginData)
//     });
//     return rawResponse.json();
// }

export async function getPing() {
    return await fetch(`/service/ping`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token"},
    });
}

function handelError(response: Response):Response {
    if (response.status === 403) {
        window.location.reload();
    }
    return response;
}

export async function postSingleFader(faderItem: FaderItem) {
    handelError(await fetch(`/api/faderpage/setvalue`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "kein Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderItem )
    }));
}

export async function postLoadUniverse(dbCommandItem: DbCommandItem) {
    handelError(await fetch(`/api/loadandsave/loaduniverse`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    }));
}

export async function putSaveUniverse(dbCommandItem: DbCommandItem) {
    handelError(await fetch(`/api/loadandsave/saveuniverse`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    }));
}

export async function postLoadFixtures(fixtureItemList:FixtureItem[]) {
    handelError(await fetch(`/api/loadandsave/loadfixtures`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    }));
}

export async function putSaveFixtures(fixtureItemList:FixtureItem[]) {
    handelError(await fetch(`/api/loadandsave/savefixtures`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    }));
}

export async function postLoadFixturScene( sceneName:string ) {
    handelError(await fetch(`/api/loadandsave/loadfixturscene/${sceneName}`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
    }));
}

export async function putSaveFixturScene( sceneName:string, fixtureItemList:FixtureItem[]) {
    handelError(await fetch(`/api/loadandsave/savefixturscene/${sceneName}`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    }));
}




export async function putDeleteActiveFixturesChecked(activeFixtureItem: ActiveFixtureItem[]) {
    await fetch(`/api/fixture/deleteactivefixture`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( activeFixtureItem )
    });
}

export async function getActiveFixtureList() {
    const rawResponse =   await fetch(`/api/fixture/allactivefixture`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token"},
    });
    return rawResponse.json();
}

export async function putSetActiveFixtureChecked(activeFixtureItem: ActiveFixtureItem) {
    handelError(await fetch(`/api/fixture/setactivefixturechecked`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( activeFixtureItem )
    }));
}



export async function getActiveFixtureTemplateList() {
    const rawResponse = await fetch(`/api/fixture/allfixturetemplatelist`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token"},
    });
    return rawResponse.json();
}

export async function postCreateFixture(createfixture: CreateFixtureItem) {
    handelError(await fetch(`/api/fixture/createfixture`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( createfixture )
    }));
}



export async function putLoadActiveFaderList(list: string[]) {
    const rawResponse =  await fetch(`/api/fixture/getfixture`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( list )
    });
    return rawResponse.json();
}

export async function postFixtureFader(faderItem: FaderItem) {
    handelError(await fetch(`/api/fixture/setfixturevalue`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderItem )
    }));
}


export async function postCreateSelectFaderPage(faderPageSelect: FaderPageSelect) {
    const rawResponse =  await fetch(`/api/faderpage/simpleselectpage`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + localStorage.getItem(STORAGE_KEY_TOKEN) || "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderPageSelect )
    });
    return rawResponse.json();
}


