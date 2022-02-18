import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {
    STORAGE_KEY_TOKEN
} from "../../controller/DataService";
import {AuthContext} from "./AuthProvider";
import { getPing, postLogin} from "../../controller/Fetching";
import FrameSet from "../FrameSet";


export default function LoginRootFrame() {
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {setJwt, jwtDecoded} = useContext(AuthContext)

    const [validUser, setValidUser] = useState<boolean>(false)

    useEffect(() => {
        let tmpToken = localStorage.getItem(STORAGE_KEY_TOKEN) || "kein Token";
        if (tmpToken !== "kein Token") {
            setJwt(tmpToken);
            console.log("Token aus Speicher geholt", jwtDecoded);

            getPing().then((data: any) => {
                if (data.status === 403) {
                    console.info("rawResponse.status === 403 Miau");
                    setValidUser(false);
                }
            });
        }
    }, [])

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        postLogin({name, password}).then((data: any) => {
            console.log("Login" + data);
            setJwt(data)
            setValidUser(true);
            localStorage.setItem(STORAGE_KEY_TOKEN, data); // ? data = Token
        })
    }
    return (
        <div>
            {validUser && < FrameSet/>}
            {!validUser && <div>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="username" onChange={onUserNameChange} value={name}/>
                    <input type="password" placeholder="password" onChange={onPasswordChange} value={password}/>
                    <button type="submit">Login</button>
                </form>
            </div>}
        </div>
    );
}