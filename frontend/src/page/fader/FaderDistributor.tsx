import React from "react";
import {FaderItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import {HueFader} from "./HueFader";
import {KelvinFader} from "./KelvinFader";
import {RGBFader} from "./RGBFader";
import {
    FADER_TYPE_EMPTY,
    FADER_TYPE_KELVIN2C, FADER_TYPE_MASTER_HUE2RGB,
    FADER_TYPE_MASTER_KELVIN, FADER_TYPE_MASTER_RGB,
} from "../../controller/DataService";


interface PropsFaderDistributor {
    faderItem: FaderItem,
    setRGBItem: Function
}

export function FaderDistributor({faderItem, setRGBItem}: PropsFaderDistributor) {

    switch (faderItem.type) {
        case FADER_TYPE_RGB:
            return (<div>< RGBFader faderItem={faderItem} setRGBItem={setRGBItem}/></div>);
        case FADER_TYPE_MASTER_KELVIN:
        case FADER_TYPE_MASTER_RGB:
            return (<div>< Fader faderItem={faderItem}/></div>);
        case FADER_TYPE_KELVIN2C:
             return (<div>< KelvinFader faderItem={faderItem}/></div>);
        case FADER_TYPE_HUE:
        case FADER_TYPE_MASTER_HUE2RGB:
            return (<div>< HueFader faderItem={faderItem} setRGBItem={setRGBItem}/></div>);
        case FADER_TYPE_VALUE:
            return (<div>< Fader faderItem={faderItem}/></div>);
        case FADER_TYPE_EMPTY:
        default:
            return (<div/>);

    }
}

export const FADER_TYPE_VALUE = 1;
export const FADER_TYPE_HUE = 2;
export const FADER_TYPE_KELVIN = 3;
export const FADER_TYPE_RGB = 4;