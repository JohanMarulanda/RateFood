import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Restaurants from "../screens/Restaurants/Restaurants"
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import Restaurant from "../screens/Restaurants/Restaurant";

const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="restarants"
                component={Restaurants}
                options={{title: "Restarantes"}}
            />
            <Stack.Screen 
                name="add-restaurant"
                component={AddRestaurant}
                options={{title: "Añadir Restaurante"}}
            />
            <Stack.Screen 
                name="restaurant"
                component={Restaurant}
                
            />
        </Stack.Navigator>
    )
}