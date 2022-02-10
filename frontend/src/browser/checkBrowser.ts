
export const CheckCromeAndSafari = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    return (sUsrAg.indexOf("Chrome") > -1) || (sUsrAg.indexOf("Safari") > -1);

}

// Add Samsung because of Testing Samsung Device in Firefox Mode (No local Test Possible)
export const CheckFirefox = () : boolean  =>{
    let sUsrAg = navigator.userAgent;
    return !!((sUsrAg.indexOf("Firefox") > -1) || (sUsrAg.indexOf("Samsung")));

}