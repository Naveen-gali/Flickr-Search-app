import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View,ActivityIndicator, TouchableOpacity } from "react-native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStoreParams } from "../../Navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";
import { StoreContext } from "../../models/store";
import { observer } from "mobx-react-lite";
import PhotoComponent from "../Components/PhotoComponent";
import { cast } from "mobx-state-tree";
import { Searchbar } from "react-native-paper";

const Home = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStoreParams>>();
    const {getPhotos,photosCount,photos,getImageUrl,isLoading} = useContext(StoreContext);
    const [query, setQuery] = useState("");

    useEffect(() => {
        getPhotos("india");
    },[])

    return(
        <SafeAreaView>
            <View style={styles.rootView}>
                <Searchbar placeholder="Search Photos" onChangeText={(e) => console.log(e)} value={query} style={styles.searchContainer} />
                {/* {
                    isLoading ? <ActivityIndicator color="red"  size={"small"} /> : (
                        <>
                            <Text>Results Found ({photosCount})</Text>
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={photos}
                                    renderItem={({item}) => {
                                        return <PhotoComponent photo={cast(item)} />
                                    }}
                                    alwaysBounceVertical={true}
                                    ListFooterComponent={() => (
                                        <Text>End..</Text>
                                    )}
                                    refreshing={isLoading}
                                    onRefresh={() => getPhotos("India")}
                                />
                            </View>
                        </>
                    )
                } */}
                <Text>Results Found ({photosCount})</Text>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={photos}
                        renderItem={({item}) => {
                            return <PhotoComponent photo={cast(item)} navigation={navigation} />
                        }}
                        alwaysBounceVertical={true}
                        ListFooterComponent={() => (
                            <Text>End..</Text>
                        )}
                        refreshing={isLoading}
                        onRefresh={() => getPhotos("India")}
                        
                    />
                </View>
            </View>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    rootView: {
        marginHorizontal : 10,
    },
    searchContainer: {
        marginBottom : 15
    },
    flatListContainer: {
        marginBottom : 30,
        paddingBottom : 100
    }
})

export default Home;