import './Fader.scss';
import {FaderItem} from "../../model/BackendConnection";
import iro from "@jaames/iro";
import React, {useEffect} from "react";
import {postSingleFader} from "../../controller/Fetching";


interface PropsKelvinFader {
    faderItem: FaderItem
}

export function KelvinFader({faderItem}: PropsKelvinFader) {
    let kelvinPickerIdTable: string[] = [];
    for (let i = 0; i < 20; i++) {
        kelvinPickerIdTable[i] = "KelvinPickerId" + i;
    }

    const onChange = (kelvin: number) => {
        console.log("kelvin:" + kelvin)
        faderItem.value = Number(kelvin * 2.55 );
        postSingleFader(faderItem);
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
                        maxTemperature: 10000,
                    }
                },
            ]
        });
        kelvinPicker.color.set({kelvin: 6600});
        kelvinPicker.on('input:change', (color: any) => {
//            Keep old version in mind!
//            onChange(color.kelvin + ( (color.kelvin-2000)  * 0.0019 ) );
            let tmp = color.kelvin - 2000;
            onChange((tmp + ((tmp) * 0.2524)) / 100.0);
        })

    }, [])

    return (
        <div>
            <div className='Fader'>
                <div id={kelvinPickerIdTable[faderItem ? faderItem.channel : 0]}/>
            </div>
        </div>
    );
}