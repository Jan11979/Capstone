import React from "react";
import {FaderItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import {HueFader} from "./HueFader";
import {KelvinFader} from "./KelvinFader";
import {RGBFader} from "./RGBFader";
import {FADER_TYPE_EMPTY} from "../../controller/DataService";



interface PropsFaderDistributor {
    faderItem: FaderItem,
    setRGBItem: Function
}

export function FaderDistributor({faderItem, setRGBItem}: PropsFaderDistributor) {

    switch (faderItem.type) {
        case FADER_TYPE_RGB:
            return (<div>< RGBFader faderItem={faderItem} setRGBItem={setRGBItem}/></div>);
        case FADER_TYPE_KELVIN:
            return (<div>< KelvinFader faderItem={faderItem}/></div>);
        case FADER_TYPE_HUE:
            return (<div>< HueFader faderItem={faderItem} setRGBItem={setRGBItem}/></div>);
        case FADER_TYPE_VALUE:
            return (<div>< Fader faderItem={faderItem} /></div>);
        case FADER_TYPE_EMPTY:
        default:
            return (<div></div>);

    }
}
export const FADER_TYPE_VALUE = 1;
export const FADER_TYPE_HUE = 2;
export const FADER_TYPE_KELVIN = 3;
export const FADER_TYPE_RGB = 4;