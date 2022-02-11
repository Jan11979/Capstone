import './FrameSet.scss';

import React, {useEffect, useState} from "react";

import {
    FetchString,
    LOCATION_CONNECTION,
    LOCATION_EDIT_CHART,
    LOCATION_LOAD_SAVE,
    LOCATION_SETTINGS
} from "../controller/DataService";
import {getActiveFixtureList, getInfo} from "../controller/Fetching";
import DrawInfo from "./Info";
import {HeadFrame} from "./HeadFrame";
import {FaderPage} from "./Fader/FaderPage";
import {RGBMixerCircle} from "./RGBMixerPicture/RGBMixerPicture";
import {ActiveFixtureList, RGBItem} from "../model/BackendConnection";
import {Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {LoadSaveUniverse} from "./LoadSaveUniverse";
import {ActiveFixtureSelect} from "./ActiveFixtureSelect";
import {FixtureFaderPage} from "./Fader/FixtureFaderPage";
import {ActiveSliderSelect} from "./ActiveSliderSelect";


function DrawFrameSet() {
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(searchParams.get('fbtype') === null )
        {
            let navString = "&fbtype=" + "basic" +
                "&startaddresse=" + "1" +
                "&faderquantity=" + "12";
            navigate({ pathname: location.pathname, search: navString, });
        }
        else {
            navigate({pathname: location.pathname, search: location.search,});
        }
    }, [])

    const [searchParams] = useSearchParams();
    const idParam = searchParams.get('fbtype')

    let tmpInfo: string[] = ["No Info"];
    const [info, setInfo] = useState(tmpInfo);
    useEffect(() => {
        getInfo()
            .then((data: any) => setInfo(FetchString(data)))
        console.log("getUserAuthoritie Called :", info);
    }, [])

    const tmprgb: RGBItem = {red: 255, green: 255, blue: 255};
    const [rgbItem, setRGBItem] = useState(tmprgb);


    let tmpActiveFixtureList: ActiveFixtureList[] = [];
    const [activeFixtureList, setActiveFixtureList] = useState(tmpActiveFixtureList);
    let tmpActiveFixtureListSelected: string[] = [];//["Empty"];
    const [activeFixtureListSelected, setActiveFixtureListSelected] = useState(tmpActiveFixtureListSelected);
    useEffect(() => {
        getActiveFixtureList()
            .then((data: any) => setActiveFixtureList(data));
    }, [])

    useEffect(() => {
        const listSelected: string[] = [];
        activeFixtureList.map((value) => {
            if (value.checked !== -1) {
                listSelected.push(value.name);
            }
        })
        setActiveFixtureListSelected(listSelected);
    }, [activeFixtureList])



    return (
        <div>
            <div>
                <header className="Header">
                    <div>
                        < HeadFrame/>
                    </div>
                </header>
            </div>
            <div className="Body">
                <div className="LeftBody">
                    <Routes>
                        <Route path={LOCATION_LOAD_SAVE} element={< LoadSaveUniverse/>}/>
                        <Route path={LOCATION_SETTINGS} element={<div>
                            { idParam === "basic" && <ActiveSliderSelect /> }
                            {idParam === "edit" && < ActiveFixtureSelect list={activeFixtureList}
                                                                            setListfunc={setActiveFixtureList}
                            listSelectedfunc={setActiveFixtureListSelected}/>}
                        </div>}/>
                    </Routes>
                </div>
                <div className="MidBody">
                    { idParam === "basic" &&
                    < FaderPage setRGBItem={setRGBItem}/>
                    }
                    { idParam === "edit" &&
                    < FixtureFaderPage setRGBItem={setRGBItem} list={activeFixtureListSelected} />
                    }
                </div>
                <div className="RightBody">
                    < RGBMixerCircle rgbItem={rgbItem}/>
                </div>
            </div>
            <div className="BottomBody">
                < DrawInfo list={activeFixtureListSelected}/>
            </div>
        </div>
    )
}

// activeFixtureListSelected list
export default DrawFrameSet;
/*
<Routes>
                    <Route path={LOCATION_EDIT_CHART} element={< FixtureFaderPage setRGBItem={setRGBItem} list={activeFixtureListSelected} />}/>
                    <Route path={"*"} element={< FaderPage setRGBItem={setRGBItem}/>}/>
                    </Routes>

 */