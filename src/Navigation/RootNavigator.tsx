import { Text, View } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import DescriptionScreen from "../Screens/DescriptionScreen";
import type {NavigationContainerProps} from "@react-navigation/native";

export type RootStoreParams = {
    Home: undefined,
    DescriptionScreen: {photoId: string}
}

const Stack = createNativeStackNavigator<RootStoreParams>();

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
        </Stack.Navigator>
    )
}