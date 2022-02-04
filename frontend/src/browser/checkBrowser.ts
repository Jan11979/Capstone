
export const CheckCromeAndSafari = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    if ((sUsrAg.indexOf("Chrome") > -1) || (sUsrAg.indexOf("Safari"))) {
        return true;
    }
    return false
}

// Add Samsung because of Testing Samsung Device in Firefox Mode (No local Test Possible)
export const CheckFirefox = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    if ((sUsrAg.indexOf("Firefox") > -1) || (sUsrAg.indexOf("Samsung"))){
        return true
    }
    return false
}