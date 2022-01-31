import './Fader.scss';
import {FaderItem} from "../../model/BackendConnection";
import iro from "@jaames/iro";
import React, {useEffect} from "react";
import {postSingleFader} from "../../controller/Fetching";


interface PropsColorFader {
    faderItem: FaderItem
}

export function ColorFader({faderItem}: PropsColorFader) {
    let colorPickerIdTable: string[] = [];
    for (let i = 0; i < 20; i++) {
        colorPickerIdTable[i] = "ColorPickerId" + i;
    }

    const onChange = (hue:number, red:number, green:number, blue:number) => {
        console.log("R:" + red + "  G:" + green + "  B:" + blue, "HUE:"+ hue)
        faderItem.value = Number(hue);
        postSingleFader(faderItem);
    }

    let colorPicker: iro.ColorPicker;
    useEffect(() => {

        colorPicker = new (iro.ColorPicker as any)("#" + colorPickerIdTable[faderItem ? faderItem.channel : 0], {
            width: 300,
            color: "rgb(0, 255, 0)",
            borderWidth: 1,
            borderColor: "#070707",
            layoutDirection: 'horizontal',
            handleRadius: 14,
            padding: 6,
            margin: 12,
            layout: [
                {
                    component: iro.ui.Slider,
                    options: {
                        sliderType: 'hue',
                        sliderSize: 30
                    }
                }]
        });
        colorPicker.on('input:change', (color: any) => {
            onChange( color.hue, color.red, color.green, color.blue );
        })

    }, [])

    return (
        <div>
            <div className='Fader'>
                <div id={colorPickerIdTable[faderItem ? faderItem.channel : 0]} />
            </div>
        </div>
    );
}