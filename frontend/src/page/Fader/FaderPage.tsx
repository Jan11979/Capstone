import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import { postCreateSelectFaderPage} from "../../controller/Fetching";
import {FaderItem, FaderPageSelect} from "../../model/BackendConnection";
import {FaderDistributor} from "./FaderDistributor";
import {useSearchParams} from "react-router-dom";

interface PropsDrawFaderPage {
    setRGBItem: Function
    faderList: FaderItem[]
}
function DrawFaderPage({setRGBItem, faderList}: PropsDrawFaderPage) {
    return (
        <div className='FaderPage'>
            {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem} setRGBItem={setRGBItem}/>)}
        </div>
    );
}

interface PropsFaderPage {
    setRGBItem: Function
}

export function FaderPage({setRGBItem}: PropsFaderPage) {
    let tmpFaderList: FaderItem[] = [];
    const [faderList, setFaderList] = useState(tmpFaderList);

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if(( Number(searchParams.get('startaddresse')) === 0 )||( Number(searchParams.get('faderquantity')) === 0 )){
            searchParams.set("startaddresse", "1");
            searchParams.set("faderquantity", "5");
            searchParams.set("universe", "0");
            setSearchParams(searchParams);
        }
    }, [])


    useEffect(() => {
        let startAddress = Number(searchParams.get('startaddresse'));
        let quantity = Number(searchParams.get('faderquantity'));
        let universe = Number(searchParams.get('universe'));
        const faderPageSelect: FaderPageSelect = {
            startAddress: Number(searchParams.get('startaddresse')),
            quantity: Number(searchParams.get('faderquantity')), 
            universe: Number(searchParams.get('universe'))
         };

        postCreateSelectFaderPage(faderPageSelect)
            .then((data: any) => {
                setFaderList(data)
            })
    }, [searchParams])

    if (faderList && faderList.length) {
        return (
            <div className='FaderPage'>
                < DrawFaderPage setRGBItem={setRGBItem} faderList={faderList} />
            </div>
        );
    }else {
        return (
            <div className='FaderPage'>
            </div>
        );
    }

}