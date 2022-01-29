import './Fader.scss';
import {FaderItem} from "../../model/BackendConnection";
import iro from "@jaames/iro";
import React, {useEffect} from "react";


interface PropsKelvinFader {
    faderItem: FaderItem
}

export function KelvinFader({faderItem}: PropsKelvinFader) {
    let kelvinPickerIdTable: string[] = [];
    for (let i = 0; i < 20; i++) {
        kelvinPickerIdTable[i] = "KelvinPickerId" + i;
    }
    let kelvinPicker: iro.ColorPicker;
    useEffect(() => {
        kelvinPicker = new (iro.ColorPicker as any)("#" + kelvinPickerIdTable[faderItem ? faderItem.channel : 0], {
            width: 300,
            borderWidth: 2,
            borderColor: "#000000",
            layoutDirection: 'horizontal',
            handleRadius: 14,
            padding: 6,
            margin: 12,
            layout: [
                {
                    component: iro.ui.Slider,
                    options: {
                        sliderType: 'kelvin',
                        sliderSize: 30,
                        minTemperature: 2000,
                        maxTemperature: 10114,
                    }
                },
            ]
        });
        kelvinPicker.color.set({kelvin: 6600});
        kelvinPicker.on('input:change', (color: any) => {
            console.log("kelvin:" + color.kelvin)
        })

    }, [])

    return (
        <div>
            <div className='Fader'>
                <div id={kelvinPickerIdTable[faderItem ? faderItem.channel : 0]} />
            </div>
        </div>
    );
}