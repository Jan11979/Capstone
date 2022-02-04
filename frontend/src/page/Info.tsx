import React from "react";
import {Typography} from "@mui/material";


interface ElementPropsInfoText {
    text: string
}
function DrawInfoText({text}: ElementPropsInfoText) {
    return (
        <div>
            <Typography variant="h6">{text}</Typography>
        </div>
    )
}
interface ElementPropsInfo {
    list: string[]
}
function DrawInfo({list}: ElementPropsInfo) {
    let sUsrAg = navigator.userAgent;

    if( list.length === 0 )
        return (
            <div>
                <p>Empty</p>
            </div>
        )
    return (
        <div>
            {sUsrAg}
            <div>
                {list.map( (elem, i) => < DrawInfoText key={i} text={ elem }/>)}
            </div>
        </div>

    )
}

export default DrawInfo;