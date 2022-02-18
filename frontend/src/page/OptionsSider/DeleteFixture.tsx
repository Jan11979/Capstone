import {ActiveFixtureItem} from "../../model/BackendConnection";
import React from "react";
import { putDeleteActiveFixturesChecked } from "../../controller/Fetching";
import {Button, FormControl} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PropsAddFixture {
    list: ActiveFixtureItem[],
    setReload: Function
}
export function DeleteFixture({list, setReload}: PropsAddFixture) {

    const handleOnClickDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickCreate");
        putDeleteActiveFixturesChecked(list).then();
        setReload(true);
    }

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <Button variant="outlined" startIcon={<AddIcon/>}
                        onClick={handleOnClickDelete}> Delete All selected Fixture </Button>
            </FormControl>
        </div>
    );
}