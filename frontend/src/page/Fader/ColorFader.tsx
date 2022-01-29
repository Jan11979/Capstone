import './Fader.scss';
import {FaderItem} from "../../model/BackendConnection";
import iro from "@jaames/iro";
import React, {useEffect} from "react";


interface PropsColorFader {
    faderItem: FaderItem
}

export function ColorFader({faderItem}: PropsColorFader) {

    let colorPickerIdTable: string[] = [];
    for (let i = 0; i < 20; i++) {
        colorPickerIdTable[i] = "ColorPickerId" + i;
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
            console.log("R:" + color.red + "  G:" + color.green + "  B:" + color.blue)
            console.log("hue:" + color.hue)
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