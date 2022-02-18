import {ActiveFixtureItem, FixtureItem} from "../../model/BackendConnection";
import React from "react";
import {postLoadFixtures, putSaveFixtures} from "../../controller/Fetching";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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


interface PropsLoadSaveFixture {
    list: ActiveFixtureItem[],
    setReload: Function
}
export function LoadSaveFixture({list, setReload}: PropsLoadSaveFixture) {
    const [checked, setChecked] = React.useState(true);


    const handleOnClickLoad: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickLoad");
        postLoadFixtures(generateLoadAndSaveFixtureList( list, checked )).then();
        setReload(true);
    }
    const handleOnClickSave: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickSave");
        putSaveFixtures(generateLoadAndSaveFixtureList( list, checked )).then();
    }
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <p>Save Fixtures</p>
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