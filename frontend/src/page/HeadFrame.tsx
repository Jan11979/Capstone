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
import {useLocation, useNavigate} from "react-router-dom";
import {
    LOCATION_CONNECTION,
    LOCATION_EDIT_CHART,
    LOCATION_LOAD_SAVE,
    LOCATION_ROOT,
    LOCATION_SETTINGS
} from "../controller/DataService";


export function HeadFrame() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    let navigate = useNavigate();
    const location = useLocation();

    const onClickLoadSave = () => {
        if (location.pathname.includes(LOCATION_LOAD_SAVE)) {
            navigate(LOCATION_ROOT, {replace: true});
        } else {
            navigate(LOCATION_LOAD_SAVE, {replace: true});
        }
    }
    const onClickSettings = () => {
        if (location.pathname.includes(LOCATION_SETTINGS)) {
            navigate(LOCATION_ROOT, {replace: true});
        } else {
            navigate(LOCATION_SETTINGS, {replace: true});
        }
    }
    const onClickOutputSettings = () => {
        if (location.pathname.includes(LOCATION_CONNECTION)) {
            navigate(LOCATION_ROOT, {replace: true});
        } else {
            navigate(LOCATION_CONNECTION, {replace: true});
        }
    }
    const onClickChart = () => {
        if (location.pathname.includes(LOCATION_EDIT_CHART)) {
            navigate(LOCATION_ROOT, {replace: true});
        } else {
            navigate(LOCATION_EDIT_CHART, {replace: true});
        }
    }


    return (
        <div className="Head">
            <div className="HeadMenu">
                <IconButton sx={{ml: 1}}>
                    <SaveIcon onClick={onClickLoadSave} fontSize="large"/>
                </IconButton>
                <IconButton sx={{ml: 1}} onClick={onClickSettings}><SettingsIcon fontSize="large"/></IconButton>
                <IconButton sx={{ml: 1}} onClick={onClickOutputSettings}><SettingsInputSvideoIcon
                    fontSize="large"/></IconButton>
                <IconButton sx={{ml: 1}} onClick={onClickChart}><BarChartIcon fontSize="large"/></IconButton>
                <IconButton sx={{ml: 1}} onClick={onClickChart}><StackedBarChartIcon fontSize="large"/></IconButton>
            </div>
            <div className="DarkMode">
                <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="large"/> :
                        <Brightness4Icon fontSize="large"/>}
                </IconButton>
            </div>
        </div>
    );
}
