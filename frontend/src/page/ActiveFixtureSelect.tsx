import React, {useEffect, useState} from "react";
import {ActiveFixtureList, DbCommandItem} from "../model/BackendConnection";
import {getActiveFixtureList, putLoadUniverse, putSaveUniverse} from "../controller/Fetching";
import {Button, Checkbox, List, ListItem, ListItemText, TextField} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

interface PropsActiveFixtureSelect {
    list: ActiveFixtureList[],
    setListfunc: Function
    listSelectedfunc: Function
}

export function ActiveFixtureSelect({list, setListfunc, listSelectedfunc}: PropsActiveFixtureSelect) {
    const [checked, setChecked] = React.useState([-1]);

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
                        <ListItem
                            key={key}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon/>
                                </IconButton>
                            }
                            disablePadding
                        >
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