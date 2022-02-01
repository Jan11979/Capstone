
export const FADER_TYPE_VALUE = 1;
export const FADER_TYPE_HUE = 2;
export const FADER_TYPE_KELVIN = 3;
export const FADER_TYPE_RGB = 4;


export const FetchString = (data: any): string[]  => {
    if( data === undefined)
        data = ["Leer"];
    let newData:string[] = data;
    return newData;
}
