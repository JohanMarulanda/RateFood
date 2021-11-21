import React, { useState } from "react";
import { View, StyleSheet } from "react-native"
import { Input, Icon, Button } from "react-native-elements"
import { validateEmail } from "../../utils/validations"
import Loading from "../Loading"
import { size, isEmpty } from "lodash"
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)

    const onSbmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
            toastRef.current.show("Todos los campos son obligatorios!!!")
        } else if(!validateEmail(formData.email)){
            toastRef.current.show("Favor ingrese un email válido!")
        } else if(formData.password !== formData.repeatPassword){
            toastRef.current.show("Las contraseñas deben coincidir")
        } else if(size(formData.password) < 6){
            toastRef.current.show("La contraseña tiene que tener almenos 6 caracteres")
        } else{
            setLoading(true)
            firebase
                .auth().
                createUserWithEmailAndPassword(formData.email, formData.password)
                .then(response => {
                    setLoading(false)
                    navigation.navigate("account");
                })
                .catch((err => {
                    setLoading(false)
                    toastRef.current.show("El email ingresado ya se encuentra en uso.")
                }))
        }
    }

    const onChange = (e, type) => {
        //console.log(type)
        //setFormData({ [type]: e.nativeEvent.text })
        //ponemos el ...formData para que nos traiga el valor como tal que tiene y no el objeto
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />

            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Input
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "repeatPassword")}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />

            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSbmit}
            />
            <Loading 
                isVisible={loading}
                text="Creando cuenta"
            />
        </View>
    )
}

function defaultFormValue(){
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: 'rgb(240,6,42)',
    },
    iconRight: {
        color: "#c1c1c1"
    }
})