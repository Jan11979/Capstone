import './Fader.scss';
import React from "react";
import {Box, Slider, SliderThumb, Typography} from "@mui/material";
import {FaderItem} from "../../model/BackendConnection";

interface PropsFader {
    faderItem: FaderItem
}

export function Fader({faderItem}: PropsFader) {
    const [value, setValue] = React.useState<number | string | Array<number | string>>(
        30,
    );
    const text:string = "Value " + faderItem.value;
    const text2:string = "Channel " + faderItem.channel;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const iOSBoxShadow =
        '10 3px 1px rgba(0,99,0,0.1),0 4px 8px rgba(0,99,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
    interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}
    function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                {value}
            </SliderThumb>
        );
    }
    return (
        <div className='Fader'>
            <Box sx={{ height: 300 }}>
                <Slider
                    sx={{
                        width: 3,
                        color:  '#7aff38',
                        backgroundColor: 'rgba(122,122,122,0)',
                        '& .MuiSlider-thumb': {
                            height: 28,
                            width: 28,
                            backgroundColor: '#41be17',
                            boxShadow: iOSBoxShadow,'&:focus, &:hover, &.Mui-active': {
                                boxShadow:'0 0px 1px rgba(0,0,0,0.3),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                                '@media (hover: none)': {boxShadow: iOSBoxShadow, },},
                        },
                    }}
                    step={0.0001}
                    min={0}
                    max={1}
                    components={{ Thumb: AirbnbThumbComponent }}
                    aria-label="ios slider"
                    defaultValue={60}
                    value={typeof value === 'number' ? value : 0}
                    orientation="vertical"
                    //valueLabelDisplay="on"
                    onChange={handleSliderChange}
                />
            </Box>
        </div>
    );
}