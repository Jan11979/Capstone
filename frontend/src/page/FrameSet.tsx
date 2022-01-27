import React, {useEffect, useState} from "react";

import {FetchString} from "../controller/DataService";
import {getInfo} from "../controller/Fetching";
import DrawInfo from "./Info";



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
                        < DrawInfo list={ info } />
                    </div>
                </header>
            </div>
        </div>
    )
}

export default DrawFrameSet;
