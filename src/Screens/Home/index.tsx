import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStoreParams } from "../../Navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStoreParams>>();

    return(
        <SafeAreaView>
            <View style={styles.rootView}>
                <Text>Home Page</Text>
                <Button onPress={() => navigation.navigate("DescriptionScreen")} title="Click" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootView: {
    }
})

export default Home;