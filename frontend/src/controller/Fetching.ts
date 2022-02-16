import {
    DbCommandItem,
    FaderItem,
    FaderPageSelect,
    CreateFixtureItem,
    ActiveFixtureItem, FixtureItem
} from "../model/BackendConnection";


export async function postSingleFader(faderItem: FaderItem) {
    await fetch(`/api/faderpage/setvalue`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( faderItem )
    });
}

export async function postLoadUniverse(dbCommandItem: DbCommandItem) {
    await fetch(`/api/loadandsave/loaduniverse`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    });
}

export async function putSaveUniverse(dbCommandItem: DbCommandItem) {
    await fetch(`/api/loadandsave/saveuniverse`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( dbCommandItem )
    });
}

export async function postLoadFixtures(fixtureItemList:FixtureItem[]) {
    await fetch(`/api/loadandsave/loadfixtures`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    });
}

export async function putSaveFixtures(fixtureItemList:FixtureItem[]) {
    await fetch(`/api/loadandsave/savefixtures`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    });
}

export async function postLoadFixturScene( sceneName:string ) {
    await fetch(`/api/loadandsave/loadfixturscene/${sceneName}`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
    });
}

export async function putSaveFixturScene( sceneName:string, fixtureItemList:FixtureItem[]) {
    await fetch(`/api/loadandsave/savefixturscene/${sceneName}`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( fixtureItemList )
    });
}




export async function getActiveFixtureList() {
    const rawResponse = await fetch(`/api/fixture/allactivefixture`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + "No Token"},
    });
    return rawResponse.json();
}

export async function putSetActiveFixtureChecked(activeFixtureItem: ActiveFixtureItem) {
    await fetch(`/api/fixture/setactivefixturechecked`, {
        method: 'PUT',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( activeFixtureItem )
    });
}

export async function getActiveFixtureTemplateList() {
    const rawResponse = await fetch(`/api/fixture/allfixturetemplatelist`, {
        method: 'GET',
        headers: {"Authorization": "Bearer" + "No Token"},
    });
    return rawResponse.json();
}

export async function postCreateFixture(createfixture: CreateFixtureItem) {
    await fetch(`/api/fixture/createfixture`, {
        method: 'POST',
        headers: {"Authorization": "Bearer" + "No Token",'Content-Type': 'application/json'},
        body: JSON.stringify( createfixture )
    });
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


