import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import { getSimpleFaderPage} from "../../controller/Fetching";
import {FaderItem} from "../../model/BackendConnection";
import {FaderDistributor} from "./FaderDistributor";


interface PropsFaderPage {
    setRGBItem: Function
}

export function FaderPage({setRGBItem }: PropsFaderPage) {
    let tmpFaderList: FaderItem[] = [];
    const [faderList, setFaderList] = useState(tmpFaderList);
    useEffect(() => {
        getSimpleFaderPage()
            .then((data: any) => setFaderList(data))
    }, [])

    return (
        <div className='FaderPage'>
            {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem} setRGBItem={setRGBItem} />)}
        </div>
    );

}