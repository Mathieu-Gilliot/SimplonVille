import React from "react";
import { View, Text} from "react-native";
import IAppHeader from "../../interfaces/IAppHeader";
import styles from "./appHeaderStyles";


export class AppHeader extends React.Component<IAppHeader> {
    render(){
        return <View style={[styles.titleContainer]} >
                <Text style={[styles.text,styles.titleText]}>
                     {this.props.title}
                </Text>
                <Text style={[styles.text,styles.subTitleText]}>
                    {this.props.subtitle}
                </Text>
              </View>
    }
}