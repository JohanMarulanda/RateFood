import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native"
import { Icon, Avatar, Image, Input, Button } from "react-native-elements"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library";

export default function AddRestaurantForm(props){
    const { toastRef, setIsLoading, navigation } = props
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")

    const addRestaurant = () => {
        console.log("Ok")
        console.log(restaurantName)
        console.log(restaurantAddress)
        console.log(restaurantDescription)
    }

    return (
        <ScrollView styles={styles.scrollView}>
            <FormAdd 
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
            />
            <UploadImage toastRef={toastRef} />
            <Button 
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    )
}

function FormAdd(props){
    const {
        setRestaurantName,
        setRestaurantAddress,
        setRestaurantDescription
    } = props
    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del Restaurante"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Descripción del Restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

function UploadImage(props) {
    const { toastRef } = props
    const imageSelect = async () => {
        //const resultPermissions = await Permissions.askAsync(
        //    Permissions.CAMERA_ROLL 
        //)
        const resultPermissions = await MediaLibrary.requestPermissionsAsync();
           
        
        if(resultPermissions === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galería, si los has rechazado tienes que ir a ajustes y activarlos manualmente.",
            3000)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            console.log(result)
            if(result.cancelled){
                toastRef.current.show("Has cerrado la galería sin seleccionar ninguna imagen.",
                2000)
            }
        }
    }
    return (
        <View style={styles.viewImages}>
            <Icon 
                tyle="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnAddRestaurant: {
        backgroundColor: 'rgb(240,6,42)',
        margin: 20
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    }
})