import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TopRestarants from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestaurantsStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="top-restaurants"
                component={TopRestarants}
                options={{title: "Los Mejores Restaurantes"}}
            />
        </Stack.Navigator>
    )
}