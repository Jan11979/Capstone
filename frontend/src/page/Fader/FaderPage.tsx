import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import { getSimpleFaderPage} from "../../controller/Fetching";
import {FaderItem} from "../../model/BackendConnection";
import {FaderDistributor} from "./FaderDistributor";


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
            {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem}/>)}
        </div>
    );

}