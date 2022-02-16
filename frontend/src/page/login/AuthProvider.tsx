import {createContext, ReactElement, useState} from "react";
import jwt_decode from 'jwt-decode'

export interface AuthContextType {
    token?: string,
    jwtDecoded?: { sub?: string }
    setJwt: (jwt: string) => void
}

export const AuthContext = createContext<AuthContextType>({
    setJwt: (data) => {throw "Login not initialised"}
})

export default function AuthProvider({children} : {children: ReactElement<any, any>}) {

    const [token, setToken] = useState<string>()
    const [jwtDecoded, setJwtDecoded] = useState({})


    const setJwt = (jwt: string) => {
        console.log(jwt)
        setToken(jwt)
        setJwtDecoded(jwt_decode(jwt.toString()))
    }

    return (
        <AuthContext.Provider value={{token, jwtDecoded, setJwt}}>
            {children}
        </AuthContext.Provider>
    )
}