import React from "react";
import {ActiveFixtureList} from "../model/BackendConnection";

import { Checkbox, List, ListItem, ListItemText} from "@mui/material";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

interface PropsActiveFixtureSelect {
    list: ActiveFixtureList[],
    setListfunc: Function
    listSelectedfunc: Function
}

export function ActiveFixtureSelect({list, setListfunc, listSelectedfunc}: PropsActiveFixtureSelect) {

    const handleToggle = (tiggleName: string) => () => {
        let newActiveFixtureList:ActiveFixtureList[] = [];
        list.map((value, key) => {
            if (value.name === tiggleName) {
                if( value.checked === -1 )
                    value.checked = 0;
                else
                    value.checked = -1;
            }
            newActiveFixtureList.push(value);
        })
        setListfunc(newActiveFixtureList);
    };

    return (
        <div><p>Select Fixture</p>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {list.map((value, key) => {
                    const labelId = `checkbox-list-label-${key}`;
                    return (
                        <ListItem key={key} disablePadding >
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
    );
}