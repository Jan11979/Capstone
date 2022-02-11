import {DbCommandItem, FaderItem, FaderPageSelect} from "../model/BackendConnection";

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

export async function postLoadUniverse(dbCommandItem: DbCommandItem) {
    await fetch(`/api/data/load`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    });
}

export async function putSaveUniverse(dbCommandItem: DbCommandItem) {
    await fetch(`/api/data/save`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    });
}

export async function getActiveFixtureList() {
    const rawResponse = await fetch(`/api/fixture/allactivefixture`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + "No Token"},
    });
    return rawResponse.json();
}

export async function putLoadActiveFaderList(list: string[]) {
    const rawResponse = await fetch(`/api/fixture/getfixture`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( list )
    });
    return rawResponse.json();
}

export async function postFixtureFader(faderItem: FaderItem) {
    await fetch(`/api/fixture/setfixturevalue`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderItem )
    });
}


export async function postCreateSelectFaderPage(faderPageSelect: FaderPageSelect) {
    const rawResponse = await fetch(`/api/faderpage/simpleselectpage`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderPageSelect )
    });
    return rawResponse.json();
}


