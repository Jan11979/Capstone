
export const CheckCromeAndSafari = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    if ((sUsrAg.indexOf("Chrome") > -1) || (sUsrAg.indexOf("Safari"))) {
        return true;
    }
    return false
}
export const CheckFirefox = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf("Firefox") > -1){
        return true
    }
    return false
}
