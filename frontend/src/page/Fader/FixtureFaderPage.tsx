import {FaderItem} from "../../model/BackendConnection";
import React, {useEffect, useState} from "react";
import {getSimpleFaderPage, putLoadActiveFaderList} from "../../controller/Fetching";
import {FaderDistributor} from "./FaderDistributor";



interface PropsFixtureFaderPage {
    setRGBItem: Function
    list: string[];
}

export function FixtureFaderPage({setRGBItem, list }: PropsFixtureFaderPage) {
    let tmpFaderList: FaderItem[] = [];
    const [faderList, setFaderList] = useState(tmpFaderList);
    useEffect(() => {
        if(list.length){
            putLoadActiveFaderList(list)
                .then((data: any) => setFaderList(data))
        }
        else{
            setFaderList([]);
        }
    }, [list])

    return (
        <div className='FaderPage'>
            {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem} setRGBItem={setRGBItem} />)}
        </div>
    );

}