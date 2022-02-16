import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, {useState} from "react";
import { postLoadFixturScene, putSaveFixturScene} from "../../controller/Fetching";
import {ActiveFixtureItem, FixtureItem} from "../../model/BackendConnection";


function generateLoadAndSaveFixtureList(list:ActiveFixtureItem[], checker:boolean): FixtureItem[] {
    const fixtureItemList: FixtureItem[] = [];
    list.forEach((value) => {
        if (checker) {
            if (value.checked !== -1) {
                fixtureItemList.push({name: value.name});
            }
        } else {
            fixtureItemList.push({name: value.name});
        }
    })
    return fixtureItemList;
}


interface PropsLoadSaveFixtureSet {
    list: ActiveFixtureItem[]
}
export function LoadSaveFixtureSet({list}: PropsLoadSaveFixtureSet) {
    const [name, setSaveName] = useState("");
    const [checked, setChecked] = React.useState(true);

    const handleOnChangeSaveName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setSaveName(enteredName);
    };
    const handleOnClickLoad: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickLoad");
        postLoadFixturScene( name ).then();
        window.location.reload();
    }
    const handleOnClickSave: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickSave");
        putSaveFixturScene(name ,generateLoadAndSaveFixtureList( list, checked )).then();
    }
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <p>Save Fixtures</p>
            <div>
                <TextField
                    id="standard"
                    label="Name"
                    value={name}
                    variant="standard"
                    onChange={handleOnChangeSaveName}
                />
            </div>
            <div>
                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChangeChecked}
                                                     inputProps={{'aria-label': 'controlled'}}/>}
                                  label="Only Selected"/>
            </div>
            <div>
                <Button variant="outlined" startIcon={<FileDownloadIcon/>}
                        onClick={handleOnClickSave}> Save
                </Button>
                <Button variant="outlined" startIcon={<FileUploadIcon/>}
                        onClick={handleOnClickLoad}> Load
                </Button>
            </div>
        </div>

    )

}