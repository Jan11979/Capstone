import './FrameSet.scss';

import { Typography } from "@mui/material";
import React, {useEffect, useState} from "react";

import {FetchString} from "../controller/DataService";
import {getInfo} from "../controller/Fetching";
import DrawInfo from "./Info";
import {HeadFrame} from "./HeadFrame";




function DrawFrameSet() {
    let tmpInfo: string[] = ["No Info"];
    const [info, setInfo] = useState(tmpInfo);
    useEffect(() => {
        getInfo()
            .then((data: any) => setInfo( FetchString(data) ))
        console.log("getUserAuthoritie Called :", info);
    }, [])

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
                    < DrawInfo list={ info } />
                </div>
                <div className="RightBody">

                </div>
            </div>
            <div className="BottomBody">
                <Typography variant="h4">Ende</Typography>
            </div>
        </div>
    )
}

export default DrawFrameSet;
