
export const FADER_TYPE_EMPTY = 0;
export const FADER_TYPE_VALUE = 1;
export const FADER_TYPE_HUE = 2;
export const FADER_TYPE_KELVIN = 3;
export const FADER_TYPE_RGB = 4;

export const LOCATION_ROOT = "/";
export const LOCATION_LOAD_SAVE = "/data";
export const LOCATION_SETTINGS = "/edit";
export const LOCATION_BASIC_CHART = "/chartbasic";
export const LOCATION_EDIT_CHART = "/chartedit";
export const LOCATION_CONNECTION = "/connection";

export const FetchString = (data: any): string[]  => {
    if( data === undefined)
        data = ["Leer"];
    let newData:string[] = data;
    return newData;
}
