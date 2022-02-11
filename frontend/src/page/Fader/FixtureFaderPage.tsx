import './FaderPage.scss';

import {FaderItem} from "../../model/BackendConnection";
import React, {useEffect, useState} from "react";
import { putLoadActiveFaderList} from "../../controller/Fetching";
import {FaderDistributor} from "./FaderDistributor";


interface PropsSubFixtureFader {
    setRGBItem: Function,
    faderItem: FaderItem,
    name: string;
}

function SubFixtureFader({setRGBItem, faderItem, name}: PropsSubFixtureFader) {
    if (name === faderItem.fixtureName) {
        return (
                < FaderDistributor faderItem={faderItem} setRGBItem={setRGBItem}/>
        );
    } else {
        return (
            <div></div>
        );
    }
}


interface PropsSubFixtureFaderPage {
    setRGBItem: Function,
    listFaderItem: FaderItem[],
    name: string;
}

function SubFixtureFaderPage({setRGBItem, listFaderItem, name}: PropsSubFixtureFaderPage) {
    return (
        <div className='FixtureNamePack'>
            <div className='FixtureFaderPack'>
            {listFaderItem.map((elem, i) =>
                < SubFixtureFader key={i} name={name} faderItem={elem} setRGBItem={setRGBItem}/>)}
            </div>
            <p>{name}</p>
        </div>
    );
}

interface PropsFixtureFaderPage {
    setRGBItem: Function
    list: string[];
}

export function FixtureFaderPage({setRGBItem, list}: PropsFixtureFaderPage) {
    let tmpFaderList: FaderItem[] = [];
    const [faderList, setFaderList] = useState(tmpFaderList);
    useEffect(() => {
        if (list.length) {
            putLoadActiveFaderList(list)
                .then((data: any) => setFaderList(data))
        } else {
            setFaderList([]);
        }
    }, [list])

    return (
        <div className='FaderPage'>
            {list.map((eName, i) =>
                < SubFixtureFaderPage key={i} name={eName} listFaderItem={faderList} setRGBItem={setRGBItem}/>)}
        </div>
    );

    // return (
    //     <div className='FaderPage'>
    //         {faderList.map((elem, i) => < FaderDistributor key={i} faderItem={elem} setRGBItem={setRGBItem} />)}
    //     </div>
    // );

}

