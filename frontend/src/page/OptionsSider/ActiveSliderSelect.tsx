
import React, {useState} from "react";
import {TextField} from "@mui/material";
import { useSearchParams} from "react-router-dom";



export function ActiveSliderSelect() {

    const [searchParams, setSearchParams] = useSearchParams();
    let tmpStartAddress = Number(searchParams.get('startaddresse'));
    let tmpQuantity = Number(searchParams.get('faderquantity'));
    const [address, setAddress] = useState(tmpStartAddress);
    const [quantity, setQuantity] = useState(tmpQuantity);

    const handleOnChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tmpAddress = Number(event.target.value )
        if( tmpAddress < 1 ){
            tmpAddress = 1;
        }
        if( tmpAddress + quantity  > 512 ){
            tmpAddress = 512 - quantity;
        }
        setAddress(tmpAddress );
        searchParams.set("startaddresse", tmpAddress.toString());
        searchParams.set("faderquantity", quantity.toString());
        setSearchParams(searchParams);
    };
    const handleOnChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tmpQuantity = Number(event.target.value )
        if( tmpQuantity < 1 ){
            tmpQuantity = 1;
        }
        if( tmpQuantity + address  > 512 ){
            tmpQuantity = 512 - address;
        }
        setQuantity(tmpQuantity );
        searchParams.set("startaddresse", address.toString());
        searchParams.set("faderquantity", tmpQuantity.toString());
        setSearchParams(searchParams);
    };
    return (
        <div>
            <TextField
                id="outlined-number"
                label="StartAddress"
                type="number"
                value={address}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleOnChangeAddress}
            />
            <p> </p>
            <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                value={quantity}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleOnChangeQuantity}
            />
        </div>

    )
}