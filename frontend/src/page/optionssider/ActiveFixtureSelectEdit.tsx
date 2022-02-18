import './ActiveFixtureSelectEdit.scss';
import React from "react";
import {ActiveFixtureItem} from "../../model/BackendConnection";

import {Button} from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {AddFixture} from "./AddFixture";
import {LoadSaveFixture} from "./LoadSaveFixture";
import {DeleteFixture} from "./DeleteFixture";
import {ActiveFixtureSelect} from "./ActiveFixtureSelect";

interface PropsActiveFixtureSelectEdit {
    list: ActiveFixtureItem[],
    setListfunc: Function,
    setReload: Function
}

export function ActiveFixtureSelectEdit({list, setListfunc, setReload}: PropsActiveFixtureSelectEdit) {
    const [addFixtureDialog, setAddFixtureDialog] = React.useState(false);
    const [loadAndSaveFixtureDialog, setLoadAndSaveFixtureDialog] = React.useState(false);
    const [deleteFixtureDialog, setDeleteFixtureDialog] = React.useState(false);

    const onClickAddFixtures = () => {
        setAddFixtureDialog(!addFixtureDialog)
    }
    const onClickLoadANdSaveFixtures = () => {
        setLoadAndSaveFixtureDialog(!loadAndSaveFixtureDialog)
    }
    const onClickDeleteFixtures = () => {
        setDeleteFixtureDialog(!deleteFixtureDialog)
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

                    {deleteFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowBackIosIcon fontSize="large"/>}
                            onClick={onClickDeleteFixtures}> Hide Delete</Button>}
                    {!deleteFixtureDialog &&
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon fontSize="large"/>}
                            onClick={onClickDeleteFixtures}> Delete Fixture </Button>}

                    < ActiveFixtureSelect list={list} setListfunc={setListfunc} />

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
                    <div>
                        {deleteFixtureDialog &&
                        < DeleteFixture list={list} setReload={setReload}/>}
                        {!deleteFixtureDialog &&
                        <div/>}
                    </div>
                </div>
            </div>
        </div>
    );
}