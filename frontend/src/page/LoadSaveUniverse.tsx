import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {putLoadUniverse, putSaveUniverse} from "../controller/Fetching";
import {DbCommandItem} from "../model/BackendConnection";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LOCATION_LOAD_SAVE, LOCATION_ROOT} from "../controller/DataService";


export function LoadSaveUniverse( ) {
    const [name, setSaveName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();


    let navigate = useNavigate();
    const location = useLocation();

    const handleOnChangeSaveName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setSaveName(enteredName);
    };
    const handleOnClickLoad: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleOnClickLoad");
        let dbCommandItem: DbCommandItem = { name, universe:0}
        putLoadUniverse(dbCommandItem);
    }
    const handleOnClickSave: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleOnClickSave");
        let dbCommandItem: DbCommandItem = { name, universe:0}
        putSaveUniverse(dbCommandItem);
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