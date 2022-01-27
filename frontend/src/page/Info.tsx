import React from "react";


interface ElementPropsInfoText {
    text: string
}
function DrawInfoText({text}: ElementPropsInfoText) {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
}
interface ElementPropsInfo {
    list: string[]
}
function DrawInfo({list}: ElementPropsInfo) {
    if( list.length === 0 )
        return (
            <div>
                <p>Error</p>
            </div>
        )

// {list.map( (elem, i) => {<text key={i}> {elem} </text> })}
    return (
        <div>
            <p>Info:</p>

            <div>
                {list.map( (elem, i) => < DrawInfoText key={i} text={ elem }/>)}
            </div>
        </div>

    )
}

export default DrawInfo;