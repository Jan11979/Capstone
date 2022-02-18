import {ActiveFixtureItem} from "../../model/BackendConnection";
import React from "react";
import {putSetActiveFixtureChecked} from "../../controller/Fetching";
import { Checkbox, List, ListItem, ListItemText} from "@mui/material";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

interface PropsActiveFixtureSelect {
    list: ActiveFixtureItem[],
    setListfunc: Function
}

export function ActiveFixtureSelect({list, setListfunc }: PropsActiveFixtureSelect) {

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

    return (
        <div>
            <p>Select Fixture</p>
            <div className="ActiveFixtureSelectBase">
                <div>
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
            </div>
        </div>
    );
}