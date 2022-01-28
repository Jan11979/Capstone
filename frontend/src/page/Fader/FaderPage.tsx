import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {getInfo, getSimpleFaderPage} from "../../controller/Fetching";
import {FaderItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";



export function FaderPage() {
    let tmpFaderList: FaderItem[] = [];//[{"value": 999, "channel": 0, "type": 0, "universe": 0}];
    const [faderList, setFaderList] = useState(tmpFaderList);
    useEffect(() => {
        getSimpleFaderPage()
            .then((data: any) => setFaderList(data))
    }, [])



        return (
            <div className='FaderPage'>

                {faderList.map((elem, i) => < Fader key={i} faderItem={elem}/>)}
            </div>
        );
    //}
}