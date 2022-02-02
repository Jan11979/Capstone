import './FrameSet.scss';

import React, {useEffect, useState} from "react";

import {FetchString} from "../controller/DataService";
import {getInfo} from "../controller/Fetching";
import DrawInfo from "./Info";
import {HeadFrame} from "./HeadFrame";
import {FaderPage} from "./Fader/FaderPage";
import {RGBMixerCircle} from "./RGBMixerPicture/RGBMixerPicture";
import {RGBItem} from "../model/BackendConnection";



function DrawFrameSet() {
    let tmpInfo: string[] = ["No Info"];
    const [info, setInfo] = useState(tmpInfo);
    useEffect(() => {
        getInfo()
            .then((data: any) => setInfo( FetchString(data) ))
        console.log("getUserAuthoritie Called :", info);
    }, [])

    const tmprgb: RGBItem = {red:255, green:255, blue:255};
    const [rgbItem, setRGBItem] = useState(tmprgb);


    return (
        <div>
            <div>
                <header className="Header">
                    <div>
                        < HeadFrame />
                    </div>
                </header>
            </div>
            <div className="Body">
                <div className="LeftBody">
                </div>
                <div className="MidBody">
                    < FaderPage setRGBItem={setRGBItem}/>
                </div>
                <div className="RightBody">
                    < RGBMixerCircle rgbItem={rgbItem} />
                </div>
            </div>
            <div className="BottomBody">
                < DrawInfo list={ info } />
            </div>
        </div>
    )
}

export default DrawFrameSet;
