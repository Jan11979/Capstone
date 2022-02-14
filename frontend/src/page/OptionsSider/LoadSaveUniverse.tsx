import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {postLoadUniverse, putSaveUniverse} from "../../controller/Fetching";
import {DbCommandItem} from "../../model/BackendConnection";


export function LoadSaveUniverse( ) {
    const [name, setSaveName] = useState("");

    const handleOnChangeSaveName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setSaveName(enteredName);
    };
    const handleOnClickLoad: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickLoad");
        let dbCommandItem: DbCommandItem = { name, universe:0}
        postLoadUniverse(dbCommandItem).then();
        window.location.reload();
    }
    const handleOnClickSave: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickSave");
        let dbCommandItem: DbCommandItem = { name, universe:0}
        putSaveUniverse(dbCommandItem).then();
    }



    return (
        <div>
            <p>Save Universe</p>
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
                <Button variant="outlined" startIcon={<FileDownloadIcon/>}
                        onClick={handleOnClickSave}>
                    Save
                </Button>
                <Button variant="outlined" startIcon={<FileUploadIcon/>}
                        onClick={handleOnClickLoad}>
                    Load
                </Button>

            </div>
        </div>

    )
}