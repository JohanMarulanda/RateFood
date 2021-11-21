import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import UserGuess from "./UserGuess";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";


export default function Account(){
    const [login, setLogin] = useState(null);

    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            !user ? setLogin(false) : setLogin(true);
        });

    }, []);
    

    if(login === null) return <Loading isVisible={true} text="Cargando..."/>;

    return login ? <UserLogged /> : <UserGuess />;
}