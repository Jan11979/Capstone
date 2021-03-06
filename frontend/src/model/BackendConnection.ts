
export interface LoginData {
    name: string,
    password: string
}

export interface FaderItem {
    type: number,
    value: number,
    valueX1?: number,
    valueX2?: number,
    channel: number,
    universe: number,
    fixtureName: string,
    fixtureID: number
}

export interface RGBItem {
    red: number,
    green: number,
    blue: number
}

export interface DbCommandItem {
    name: string,
    universe: number
}

export interface ActiveFixtureItem {
    name: string,
    checked: number
}

export interface FaderPageSelect {
    startAddress: number,
    quantity: number,
    universe: number
}

export interface CreateFixtureItem {
    templateName: string,
    fixtureName: string,
    address: number,
    universe: number
}


export interface FixtureItem {
    name: string
}