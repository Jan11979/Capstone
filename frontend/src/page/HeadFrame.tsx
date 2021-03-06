import './HeadFrame.scss';
import React from "react";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import {ColorModeContext} from "../App";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    LOCATION_CONNECTION,
    LOCATION_LOAD_SAVE,
    LOCATION_ROOT,
    LOCATION_SETTINGS
} from "../controller/DataService";
import {LogoRGBMixerCircle} from "./RGBMixerPicture/RGBMixerPicture";


export function HeadFrame() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    let navigate = useNavigate();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    let navString = "&fbtype=" + searchParams.get('fbtype') +
                    "&startaddresse=" + searchParams.get('startaddresse') +
                    "&faderquantity=" + searchParams.get('faderquantity') +
                    "&universe=" + searchParams.get('universe') +
                    "&RGBMixer=" + searchParams.get('RGBMixer');

    const onClickLoadSave = () => {
        if (location.pathname.includes(LOCATION_LOAD_SAVE)) {
            navigate({ pathname: LOCATION_ROOT, search: navString });
        } else {
            navigate({ pathname: LOCATION_LOAD_SAVE, search: navString, });
        }
    }
    const onClickSettings = () => {
        if (location.pathname.includes(LOCATION_SETTINGS)) {
            navigate({ pathname: LOCATION_ROOT, search: navString, });
        } else {
            navigate({ pathname: LOCATION_SETTINGS, search: navString, });
        }
    }
    const onClickOutputSettings = () => {
        if (location.pathname.includes(LOCATION_CONNECTION)) {
            navigate({ pathname: LOCATION_ROOT, search: navString, });
        } else {
            navigate({ pathname: LOCATION_CONNECTION, search: navString, });
        }
    }
    const onClickChartEdit = () => {
        searchParams.set("fbtype", "edit");
        setSearchParams(searchParams);
    }
    const onClickChartBasic = () => {
        searchParams.set("fbtype", "basic");
        setSearchParams(searchParams);
    }

    const onClickLogo = () => {
        if( searchParams.get('RGBMixer') === "true" ){
            searchParams.set("RGBMixer", "false");
            setSearchParams(searchParams);
        }
        else{
            searchParams.set("RGBMixer", "true");
            setSearchParams(searchParams);
        }

    }

    const idParam = searchParams.get('fbtype')

    return (
        <div className="Head">
            <div className="Logo" onClick={onClickLogo} >
                < LogoRGBMixerCircle />
            </div>
            <div className="HeadMenu">
                <IconButton  onClick={onClickLoadSave} ><SaveIcon fontSize="large"/></IconButton>
                <IconButton  onClick={onClickSettings}><SettingsIcon fontSize="large"/></IconButton>
                <IconButton  onClick={onClickOutputSettings}><SettingsInputSvideoIcon fontSize="large"/></IconButton>
                { idParam === "basic" && <div><IconButton  onClick={onClickChartBasic}><BarChartIcon color="success" fontSize="large"/></IconButton>
                    <IconButton  onClick={onClickChartEdit}><StackedBarChartIcon fontSize="large"/></IconButton></div> }
                { idParam === "edit" && <div><IconButton  onClick={onClickChartBasic}><BarChartIcon fontSize="large"/></IconButton>
                    <IconButton  onClick={onClickChartEdit}><StackedBarChartIcon color="success" fontSize="large"/></IconButton></div> }

            </div>
            <div className="DarkMode">
                <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="large"/> :
                        <Brightness4Icon fontSize="large"/>}
                </IconButton>
            </div>
        </div>
    );
}
