import MapView, { Region } from "react-native-maps";
import React from 'react';
import { View } from "react-native";
import { Variables } from "../../assets/Variables";
import IRegion from "../../interfaces/IRegion";
import styles from './mapStyles';

export function CustomMap() {

    //  const regionIsDefined: boolean = location.coords != null && location.coords !=undefined;

    return <View >
      
       
           <MapView
           initialRegion={
               {
                   latitude: Variables.baseCoords.latitude,
                   longitude: Variables.baseCoords.longitude,
                   latitudeDelta: 0.09,
                   longitudeDelta: 0.04
               }}
           style={styles.container}
       />

    </View>


}
