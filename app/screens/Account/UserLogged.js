import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast"
import * as firebase from "firebase";
import Loading from "../../components/Loading"
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from "../../components/Account/AccountOptions"

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [reLoadUserInfo, setReLoadUserInfo] = useState(false)
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user)
        })()
        setReLoadUserInfo(false)
    }, [reLoadUserInfo])

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && (
            <InfoUser 
                userInfo={userInfo} 
                toastRef={toastRef}
                setLoading={setLoading}
                setLoadingText={setLoadingText}
             />
            )}
            
            <AccountOptions userInfo={userInfo} toastRef={toastRef} setReLoadUserInfo={setReLoadUserInfo} />

            <Button 
                title="Cerrar sesión" 
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}    
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text={loadingText} isVisible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: 'rgb(240,6,42)'
    }
})