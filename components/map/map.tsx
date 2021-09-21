import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { Variables } from "../../assets/Variables";
import styles from './mapStyles';
import { ICoord } from "../../interfaces/ICoord";

export function CustomMap(props) {

    //  const regionIsDefined: boolean = location.coords != null && location.coords !=undefined;
    const [position,setPosition]= useState<ICoord>();
    useEffect(() => {
       setPosition(props);
    }, [])
    return <View >


        <MapView
            initialRegion={position != null?position:props}
            style={styles.container}
            
        >
            <Marker
                coordinate={{
                    latitude: position !=null?position.latitude:props.latitude,
                    longitude: position !=null?position.longitude:props.longitude
                }}
                draggable
               onDragEnd={(e)=>{props.onMarkerDrag(e.nativeEvent.coordinate)}}
            />
        </MapView>

    </View>


}
