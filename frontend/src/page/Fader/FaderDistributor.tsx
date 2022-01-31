import React from "react";
import {FaderItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import {ColorFader} from "./ColorFader";
import {KelvinFader} from "./KelvinFader";


interface PropsFaderDistributor {
    faderItem: FaderItem
}

export function FaderDistributor({faderItem}: PropsFaderDistributor) {

    switch (faderItem.type) {
        case 3:
            return (<div>< KelvinFader faderItem={faderItem}/></div>);
        case 2:
            return (<div>< ColorFader faderItem={faderItem}/></div>);
        case 1:
        default:
            return (<div>< Fader faderItem={faderItem}/></div>);
    }
}
