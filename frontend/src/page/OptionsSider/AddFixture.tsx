//import './AddFixture.scss';
import React, {useEffect, useState} from "react";
import {getActiveFixtureTemplateList, postCreateFixture} from "../../controller/Fetching";
import AddIcon from '@mui/icons-material/Add';
import {ActiveFixtureList, CreateFixtureItem} from "../../model/BackendConnection";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useSearchParams} from "react-router-dom";


function checkFixtureNameAllowed(list: ActiveFixtureList[], name: string): string {
    if (name.length <= 3) {
        return "short";
    }
    if (list.some(item => name === item.name)) {
        return "double";
    }
    return "";
}

interface PropsAddFixture {
    list: ActiveFixtureList[],
    setReload: Function
}
export function AddFixture({list, setReload}: PropsAddFixture) {
    const [templateName, setTemplateName] = React.useState('');
    const [universe, setUniverse] = React.useState(0);
    const [fixtureName, setFixtureName] = React.useState('');
    const [fixtureAddress, setFixtureAddress] = React.useState(1);
    const [createButtonAllowed, setCreateButtonAllowed] = React.useState(false);
    const [fixtureNameErrorText, setFixtureNameErrorText] = React.useState("small"); //"Incorrect entry."

    let tmpTemplateFixtureList: string[] = [];
    const [templateFixtureList, setTemplateFixtureList] = useState(tmpTemplateFixtureList);

    useEffect(() => {
        getActiveFixtureTemplateList()
            .then((data: any) => setTemplateFixtureList(data));
    }, [])


    const checkCreateAllowed = (tmpFixtureName:string) =>{
        let nameAllowedErrorText = checkFixtureNameAllowed(list, tmpFixtureName);
        if (nameAllowedErrorText === "") {
            setFixtureNameErrorText("");

        } else {
            setFixtureNameErrorText(nameAllowedErrorText);
        }

        if ((templateName !== '') && ( nameAllowedErrorText === "") ) {
            setCreateButtonAllowed(true);
        } else {
            setCreateButtonAllowed(false);
        }
    }
    const handleChange = (event: SelectChangeEvent) => {
        setTemplateName(event.target.value);
        checkCreateAllowed(fixtureName);
    };
    const handleChangeUniverse = (event: SelectChangeEvent) => {
        setUniverse(Number(event.target.value));
    };
    const handleOnChangeFixtureName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFixtureName(event.target.value);
        checkCreateAllowed(event.target.value);
    };
    const handleOnChangeFixtureAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        let address = Number(event.target.value)
        if (address < 1) {
            address = 1;
        }
        if (address > 512) {
            address = 512;
        }
        setFixtureAddress(address);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const handleOnClickCreate: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("handleOnClickCreate");
        let createfixture: CreateFixtureItem = { fixtureName:fixtureName, templateName:templateName, address:fixtureAddress, universe:universe };
        postCreateFixture(createfixture).then();
        setCreateButtonAllowed(false)
        setReload("TRUE");
    }

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-template">Template</InputLabel>
                <Select
                    labelId="select-template"
                    id="select-template"
                    value={templateName}
                    label="Template"
                    onChange={handleChange}
                >
                    {templateFixtureList.map((tName, i) => <MenuItem key={i} value={tName}>{tName}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-universe">Universe</InputLabel>
                <Select
                    labelId="select-universe"
                    id="select-universe"
                    value={universe.toString()}
                    label="Universe"
                    onChange={handleChangeUniverse}
                >
                    <MenuItem value={0}>1</MenuItem>
                    <MenuItem value={1}>2</MenuItem>
                    <MenuItem value={2}>3</MenuItem>
                    <MenuItem value={3}>4</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <TextField
                    id="standard"
                    label="Address"
                    value={fixtureAddress.toString()}
                    variant="standard"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleOnChangeFixtureAddress}/>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <TextField
                    id="standard"
                    label="Name"
                    value={fixtureName}
                    variant="standard"
                    onChange={handleOnChangeFixtureName}
                    helperText={fixtureNameErrorText}/>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 120}}>
                {createButtonAllowed === true &&
                <Button variant="outlined" startIcon={<AddIcon/>}
                        onClick={handleOnClickCreate}> Create </Button>
                }
                {createButtonAllowed === false &&
                <Button disabled variant="outlined" startIcon={<AddIcon/>}
                        onClick={handleOnClickCreate}> Create </Button>
                }
            </FormControl>
        </div>
    );
}