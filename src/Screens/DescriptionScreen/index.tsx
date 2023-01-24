import React, { useEffect } from "react";
import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack"; 
import { RootStoreParams } from "../../Navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStoreParams,"DescriptionScreen">

const DescriptionScreen = ({navigation,route}: Props) => {

    useEffect(() => {
        navigation.setOptions({headerTitle: photoId})
    },[])

    const {photoId} = route.params;
    return(
        <View>
            <Text>DescriptionScreen Page</Text>
            <Text>Photo ID {photoId}</Text>
        </View>
    )
}

export default DescriptionScreen;