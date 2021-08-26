import { StyleSheet } from "react-native";
import { Variables } from "../../assets/Variables";

export default StyleSheet.create({
    text:{
        color: Variables.blueColor,
        textAlign:"center"
    },
    titleText:{
        fontSize: 30
    },
    subTitleText:{
        fontSize: 15
    },
    titleContainer:{
        width:Variables.screenWidth,
        height:475 
    }
})