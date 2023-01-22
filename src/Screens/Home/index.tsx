import React, { useContext, useEffect } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStoreParams } from "../../Navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";
import { StoreContext } from "../../models/store";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStoreParams>>();
    const {getPhotos,photosCount,photos,getImageUrl} = useContext(StoreContext);

    useEffect(() => {
        getPhotos("camera");
    },[])

    return(
        <SafeAreaView>
            <View style={styles.rootView}>
                <Text>Home Page</Text>
                <Text>Photos Available {photosCount}</Text>
                {
                    photos.length > 0 ? <Image source={{uri: getImageUrl(photos[0].server,photos[0].id,photos[0].secret)}} style={{
                        width : 400,
                        height : 400
                    }} /> : <></>
                }
            </View>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    rootView: {
    }
})

export default Home;