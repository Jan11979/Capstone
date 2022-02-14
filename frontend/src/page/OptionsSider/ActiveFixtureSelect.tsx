import './ActiveFixtureSelect.scss';
import React from "react";
import {ActiveFixtureList} from "../../model/BackendConnection";

import {Button, Checkbox, List, ListItem, ListItemText} from "@mui/material";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {AddFixture} from "./AddFixture";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {LOCATION_LOAD_SAVE, LOCATION_ROOT} from "../../controller/DataService";
import AddIcon from "@mui/icons-material/Add";

interface PropsActiveFixtureSelect {
    list: ActiveFixtureList[],
    setListfunc: Function

}

export function ActiveFixtureSelect({list, setListfunc}: PropsActiveFixtureSelect) {

    const handleToggle = (tiggleName: string) => () => {
        let newActiveFixtureList: ActiveFixtureList[] = [];
        list.forEach((value) => {
            if (value.name === tiggleName) {
                if (value.checked === -1)
                    value.checked = 0;
                else
                    value.checked = -1;
            }
            newActiveFixtureList.push(value);
        })
        setListfunc(newActiveFixtureList);
    };

    const [addFixtureDialog, setAddFixtureDialog] = React.useState("OFF");
    const onClickAddFixtures = () => {
        if (addFixtureDialog === "OFF") {
            setAddFixtureDialog("ON")
        } else {
            setAddFixtureDialog("OFF")
        }

    }

    return (
        <div>
            <p>Select Fixture</p>
            <div className="ActiveFixtureSelectBase">
                <div>
                    {addFixtureDialog === "ON" &&
                    <Button variant="outlined" endIcon={<ArrowBackIosIcon fontSize="large"/>}
                            onClick={onClickAddFixtures}> Hide </Button> }
                    {addFixtureDialog === "OFF" &&
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon fontSize="large"/>}
                            onClick={onClickAddFixtures}> Add Fixture </Button> }
                    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        {list.map((value, key) => {
                            const labelId = `checkbox-list-label-${key}`;
                            return (
                                <ListItem key={key} disablePadding>
                                    <ListItemButton role={undefined} onClick={handleToggle(value.name)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={value.checked !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.name}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div>
                    {addFixtureDialog === "ON" &&
                    < AddFixture list={list}/>}
                    {addFixtureDialog === "OFF" &&
                    <div/>}
                </div>
            </div>
        </div>
    );
}