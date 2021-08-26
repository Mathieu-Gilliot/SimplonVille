import React from "react";
import { View,Image,Text, Pressable} from "react-native";
import { IGenericHeader } from "../../interfaces/IGenericHeader";
import styles from './genericHeaderStyles';

export class GenericHeader extends React.Component<IGenericHeader>{
    render(){
        return <View style={[styles.flex,styles.container]}>
            <Pressable style={styles.backArrow} onPress={this.props.onPress} >
                <Image source={require('../../assets/Images/backArrow.png')}></Image>
            </Pressable>
            <View style={[styles.flex,styles.header]}>
            <Image source={this.props.iconUri} style={styles.icon}></Image>
            <Text style={styles.text}>{this.props.text}</Text>
            </View>
        </View>
    }
}