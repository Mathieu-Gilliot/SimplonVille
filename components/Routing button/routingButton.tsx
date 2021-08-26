import React from "react";
import { View, Text,Image,Pressable} from "react-native";
import { IRoutingButton } from "../../interfaces/IRoutingButton";
import styles from './routingButtonStyles';

export function RoutingButton(props:IRoutingButton) {
        const {onPress,text,iconUri} = props;
       return <Pressable  style={styles.container} onPress={props.onPress}>
                <View style={styles.button}>
                     <Image source={props.iconUri} style={styles.icon}/>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
              </Pressable>
 
}