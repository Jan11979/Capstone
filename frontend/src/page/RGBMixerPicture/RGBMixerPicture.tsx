import "./RGBMixerPicture.scss"
import {RGBItem} from "../../model/BackendConnection";


interface PropsRGBMixerRectanglePicture {
    rgbItem: RGBItem,
    rectangleWidth?: number
}

export function RGBMixerRectangle({rgbItem, rectangleWidth}: PropsRGBMixerRectanglePicture) {
    if(rectangleWidth === undefined)
        rectangleWidth = 30;
    return (
            <div className="canvasRectangle">
                <svg width={rectangleWidth} height="30" viewBox={`0 0 ${rectangleWidth} 30`} xmlns="http://www.w3.org/2000/svg" >
                    <rect className="BaseRectangle" width={rectangleWidth} height="30"  />
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth-5} height="25" fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth-5} height="25" fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth-5} height="25" fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
    )
}

interface PropsRGBMixerPicture {
    rgbItem: RGBItem,
}
export function RGBMixerCircle({rgbItem}: PropsRGBMixerPicture) {
    return (
            <div className="canvasCircle">
                <svg width="200" height="200" viewBox="0 0 190 165" xmlns="http://www.w3.org/2000/svg" >

                    <circle className="BaseRed BaseCircle"/>
                    <circle className="BaseGreen BaseCircle"/>
                    <circle className="BaseBlue BaseCircle"/>
                    <g>
                        <circle className="RedCircle" fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <circle className="GreenCircle" fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <circle className="BlueCircle" fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
    )
}
