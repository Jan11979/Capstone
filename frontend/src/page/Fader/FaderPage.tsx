import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import { getSimpleFaderPage} from "../../controller/Fetching";
import {FaderItem} from "../../model/BackendConnection";
import {Fader} from "./Fader";
import {ColorFader} from "./ColorFader";
import {KelvinFader} from "./KelvinFader";


export function FaderPage() {
    let tmpFaderList: FaderItem[] = [];
    const [faderList, setFaderList] = useState(tmpFaderList);
    useEffect(() => {
        getSimpleFaderPage()
            .then((data: any) => setFaderList(data))
    }, [])

    return (
        <div className='FaderPage'>

            {/*<ColorTemperaturePicker color={kelvin} onChange={setKelvin} />*/}
            {faderList.map((elem, i) => < Fader key={i} faderItem={elem}/>)}
            {faderList.map((elem, i) => < ColorFader key={i} faderItem={elem}/>)}
            {faderList.map((elem, i) => < KelvinFader key={i} faderItem={elem}/>)}
        </div>
    );

}