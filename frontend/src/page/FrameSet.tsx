import './FrameSet.scss';

import React, {useEffect, useState} from "react";

import {
    LOCATION_CONNECTION,
    LOCATION_LOAD_SAVE,
    LOCATION_SETTINGS
} from "../controller/DataService";
import {getActiveFixtureList} from "../controller/Fetching";
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


function FrameSet() {
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

    const tmprgb: RGBItem = {red: 255, green: 255, blue: 255};
    const [rgbItem, setRGBItem] = useState(tmprgb);


    let tmpActiveFixtureList: ActiveFixtureList[] = [];
    const [activeFixtureList, setActiveFixtureList] = useState(tmpActiveFixtureList);
    let tmpActiveFixtureListSelected: string[] = [];
    const [activeFixtureListSelected, setActiveFixtureListSelected] = useState(tmpActiveFixtureListSelected);
    useEffect(() => {
        getActiveFixtureList()
            .then((data: any) => setActiveFixtureList(data));
    }, [])

    useEffect(() => {
        const listSelected: string[] = [];
        activeFixtureList.forEach((value) => {
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
                                                                            setListfunc={setActiveFixtureList}/>}
                        </div>}/>
                        <Route path={LOCATION_CONNECTION} element={<Typography variant="h1">Con</Typography>}/>
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
                < DrawInfo />
            </div>
        </div>
    )
}
export default FrameSet;
