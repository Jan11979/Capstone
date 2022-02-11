import './FaderPage.scss';
import React, {useEffect, useState} from "react";
import { postCreateSelectFaderPage} from "../../controller/Fetching";
import {FaderItem, FaderPageSelect} from "../../model/BackendConnection";
import {FaderDistributor} from "./FaderDistributor";
import {useSearchParams} from "react-router-dom";


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
            setSearchParams(searchParams);
        }
    }, [])


    useEffect(() => {
        let startAddress = Number(searchParams.get('startaddresse'));
        let quantity = Number(searchParams.get('faderquantity'));
        const faderPageSelect: FaderPageSelect = {startAddress, quantity};

        postCreateSelectFaderPage(faderPageSelect)
            .then((data: any) => setFaderList(data))
    }, [searchParams])


    // useEffect(() => {
    //     getSimpleFaderPage()
    //         .then((data: any) => setFaderList(data))
    // }, [])
    if (faderList && faderList.length) {
        return (
            <div className='FaderPage'>
                {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem} setRGBItem={setRGBItem}/>)}
            </div>
        );
    }else {
        return (
            <div className='FaderPage'>
            </div>
        );
    }

}