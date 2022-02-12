import {FaderItem, RGBItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import React, {useState} from "react";
import {RGBMixerRectangle} from "../RGBMixerPicture/RGBMixerPicture";
import {postFixtureFader, postSingleFader} from "../../controller/Fetching";

function CreateRGBFaderItem(channeloffset:number, faderItem:FaderItem ) :FaderItem {
    let newFaderItem:FaderItem = { channel:faderItem.channel + channeloffset, value:faderItem.value, type:faderItem.type, universe:faderItem.universe, fixtureID:faderItem.fixtureID, fixtureName:faderItem.fixtureName }
    if(( channeloffset === 1 )&&(faderItem.valueX1 !== undefined )){
        newFaderItem.value = faderItem.valueX1;
    }
    else if(( channeloffset === 2 )&&(faderItem.valueX2 !== undefined )){
        newFaderItem.value = faderItem.valueX2;
    }
    return newFaderItem;
}

export function UpdateRGBItem(color:string, rgbItem:RGBItem, value:number) :RGBItem {
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

    let redFader:FaderItem = CreateRGBFaderItem( 0,  faderItem );
    let greenFader:FaderItem = CreateRGBFaderItem( 1, faderItem );
    let blueFader:FaderItem = CreateRGBFaderItem(2, faderItem );

    let tmprgb: RGBItem = {red:redFader.value, green:greenFader.value, blue:blueFader.value};
    const [localRgbItem, setLocalRGBItem] = useState(tmprgb);


    const overwritePostSingleFader = ( overwriteFaderItem:FaderItem, color:string) => {
        let newRGB: RGBItem = UpdateRGBItem( color, localRgbItem, overwriteFaderItem.value);
        setLocalRGBItem(newRGB);
        setRGBItem({red:newRGB.red, green:newRGB.green, blue:newRGB.blue});

        if( faderItem.fixtureName === "STD" ){
            postSingleFader(overwriteFaderItem).then();
        }else{
            postFixtureFader(overwriteFaderItem).then();
        }


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