import './ActiveFixtureSelect.scss';
import React from "react";
import {ActiveFixtureItem} from "../../model/BackendConnection";

import {Button, Checkbox, List, ListItem, ListItemText} from "@mui/material";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {AddFixture} from "./AddFixture";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {putSetActiveFixtureChecked} from "../../controller/Fetching";
import {LoadSaveFixture} from "./LoadSaveFixture";


interface PropsActiveFixtureSelect {
    list: ActiveFixtureList[],
    setListfunc: Function,
    setReload: Function
}

export function ActiveFixtureSelect({list, setListfunc, setReload}: PropsActiveFixtureSelect) {
    const [addFixtureDialog, setAddFixtureDialog] = React.useState(false);
    const [loadAndSaveFixtureDialog, setLoadAndSaveFixtureDialog] = React.useState(false);

    const handleToggle = (tiggleName: string) => () => {
        let newActiveFixtureList: ActiveFixtureItem[] = [];
        list.forEach((value) => {
            if (value.name === tiggleName) {
                if (value.checked === -1)
                    value.checked = 0;
                else
                    value.checked = -1;

                putSetActiveFixtureChecked(value).then();
            }
            newActiveFixtureList.push(value);
        })
        setListfunc(newActiveFixtureList);
    };

    const onClickAddFixtures = () => {
        if (!addFixtureDialog) {
            setAddFixtureDialog(true)
        } else {
            setAddFixtureDialog(false)
        }
    }
    const onClickLoadANdSaveFixtures = () => {
        if (!loadAndSaveFixtureDialog) {
            setLoadAndSaveFixtureDialog(true)
        } else {
            setLoadAndSaveFixtureDialog(false)
        }
    }

    return (
        <div>
            <p>Select Fixture</p>
            <div className="ActiveFixtureSelectBase">
                <div>
                    {addFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowBackIosIcon fontSize="large"/>}
                            onClick={onClickAddFixtures}> Hide Add</Button>}
                    {!addFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon fontSize="large"/>}
                            onClick={onClickAddFixtures}> Add Fixture </Button>}
                    {loadAndSaveFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowBackIosIcon fontSize="large"/>}
                            onClick={onClickLoadANdSaveFixtures}> Hide L&S</Button>}
                    {!loadAndSaveFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon fontSize="large"/>}
                            onClick={onClickLoadANdSaveFixtures}> Load&Save Fixture </Button>}
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
                <div className="dialogsider">
                    <div>
                        {addFixtureDialog &&
                        < AddFixture list={list} setReload={setReload}/>}
                        {!addFixtureDialog &&
                        <div/>}
                    </div>
                    <div>
                        {loadAndSaveFixtureDialog &&
                        < LoadSaveFixture list={list} setReload={setReload}/>}
                        {!loadAndSaveFixtureDialog &&
                        <div/>}
                    </div>
                </div>
            </div>
        </div>
    );
}