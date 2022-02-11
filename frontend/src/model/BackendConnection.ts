

export interface FaderItem {
    type: number,
    value: number,
    valueX1?: number,
    valueX2?: number,
    channel: number,
    universe: number
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