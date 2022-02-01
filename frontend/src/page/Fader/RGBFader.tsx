import {FaderItem, RGBItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import React, {useState} from "react";
import {RGBMixerRectangle} from "../RGBMixerPicture/RGBMixerPicture";
import {postSingleFader} from "../../controller/Fetching";

function CreateRGBFaderItem(channeloffset:number, faderItem:FaderItem ) :FaderItem {
    let newfaderItem:FaderItem = { channel:faderItem.channel + channeloffset, value:faderItem.value, type:faderItem.type, universe:faderItem.universe }
    return newfaderItem;
}

export function CreateRGBItem( color:string, rgbItem:RGBItem, value:number) :RGBItem {
   switch (color){
        case "red":
            rgbItem.red = value;
            break;
        case "green":
            rgbItem.green = value;
            break;
        case "blue":
            rgbItem.blue = value;
            break;
    }
    return rgbItem;
}


interface PropsColorFader {
    faderItem: FaderItem,
    setRGBItem: Function
}



export function RGBFader({faderItem, setRGBItem}: PropsColorFader) {
    let tmprgb: RGBItem = {red:0, green:255, blue:0};
    const [localRgbItem, setLocalRGBItem] = useState(tmprgb);

    let redFader:FaderItem = CreateRGBFaderItem( 0,  faderItem );
    let greenFader:FaderItem = CreateRGBFaderItem( 1, faderItem );
    let blueFader:FaderItem = CreateRGBFaderItem(2, faderItem );

    const overwritePostSingleFader = ( overwriteFaderItem:FaderItem, color:string) => {
        let newRGB: RGBItem = CreateRGBItem( color, localRgbItem, overwriteFaderItem.value);
        setLocalRGBItem(newRGB);
        setRGBItem({red:newRGB.red, green:newRGB.green, blue:newRGB.blue});
        postSingleFader(overwriteFaderItem);
    }

    return (
        <div className="RGBFaderBase">
            <div className="RGBColorBlock" >
                < RGBMixerRectangle rgbItem={localRgbItem} rectangleWidth={125} />
            </div>
            <div  className="RGBFaderBlock"  >
                < Fader faderItem={redFader} color="red" overwritePostSingleFader={overwritePostSingleFader} />
                < Fader faderItem={greenFader} color="green" overwritePostSingleFader={overwritePostSingleFader}  />
                < Fader faderItem={blueFader} color="blue" overwritePostSingleFader={overwritePostSingleFader}/>
            </div>
        </div>);

}