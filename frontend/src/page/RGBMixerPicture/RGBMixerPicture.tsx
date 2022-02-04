import "./RGBMixerPicture.scss"
import {RGBItem} from "../../model/BackendConnection";
import {CheckCromeAndSafari, CheckFirefox} from "../../browser/checkBrowser";


interface PropsRGBMixerRectanglePicture {
    rgbItem: RGBItem,
    rectangleWidth?: number
}

export function RGBMixerRectangle({rgbItem, rectangleWidth}: PropsRGBMixerRectanglePicture) {
    if (rectangleWidth === undefined)
        rectangleWidth = 30;

    if (CheckCromeAndSafari()) {
        return (
            <div className="canvasRectangle">
                <svg width={rectangleWidth} height="30" viewBox={`0 0 ${rectangleWidth} 30`}
                     xmlns="http://www.w3.org/2000/svg">
                    <rect className="BaseRectangle" width={rectangleWidth} height="30" rx="5" ry="5"/>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} height="25" rx="5" ry="5"
                              fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} height="25" rx="5" ry="5"
                              fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} height="25" rx="5" ry="5"
                              fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
        )
    } else if (CheckFirefox()) {
        return (
            <div className="canvasRectangle">
                <svg width={rectangleWidth} height="30" x={0} y={0} viewBox={`0 0 ${rectangleWidth} 30`}
                     xmlns="http://www.w3.org/2000/svg">
                    <rect className="BaseRectangle" width={rectangleWidth} height="30" x={2.5} y={2.5} rx="5" ry="5"/>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} x={2.5} y={2.5} height="25" rx="5" ry="5"
                              fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} x={2.5} y={2.5} height="25" rx="5" ry="5"
                              fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <rect className="ColorRectangle" width={rectangleWidth - 5} x={2.5} y={2.5} height="25" rx="5" ry="5"
                              fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
        )
    } else {
        return (
            <div>
                R:{rgbItem.red} G:{rgbItem.green} B:{rgbItem.blue}
            </div>
        )
    }
}

interface PropsRGBMixerPicture {
    rgbItem: RGBItem,
}

//
export function RGBMixerCircle({rgbItem}: PropsRGBMixerPicture) {
    if (CheckCromeAndSafari()) {
        return (
            <div className="canvasCircle">
                <svg width="200" height="200" viewBox="0 0 190 165" xmlns="http://www.w3.org/2000/svg">

                    <circle className="BaseRed BaseCircle" r={57.5}/>
                    <circle className="BaseGreen BaseCircle" r={57.5}/>
                    <circle className="BaseBlue BaseCircle" r={57.5}/>
                    <g>
                        <circle className="RedCircle" r={55} fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <circle className="GreenCircle" r={55} fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <circle className="BlueCircle" r={55} fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
        )
    } else if (CheckFirefox()) {
        return (
            <div className="canvasCircle">
                <svg width="200" height="200" viewBox="0 0 190 165" xmlns="http://www.w3.org/2000/svg">

                    <circle className="BaseRed BaseCircle" r={57.5} cx={75} cy={75} />
                    <circle className="BaseGreen BaseCircle" r={57.5} cx={110} cy={75} />
                    <circle className="BaseBlue BaseCircle" r={57.5} cx={93} cy={101} />
                    <g>
                        <circle className="RedCircle" r={55} cx={75} cy={75} fill={`rgb(${rgbItem.red}, 0, 0)`}/>
                    </g>
                    <g>
                        <circle className="GreenCircle" r={55} cx={110} cy={75} fill={`rgb(0, ${rgbItem.green}, 0)`}/>
                    </g>
                    <g>
                        <circle className="BlueCircle" r={55} cx={93} cy={101} fill={`rgb(0, 0, ${rgbItem.blue})`}/>
                    </g>
                </svg>
            </div>
        )
    } else {
        return(
            <div>
                <p>Sorry, No Support for your Browser</p>
            </div>
        )
    }
}
