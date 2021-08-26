import { StyleSheet } from "react-native";
import { Variables } from "../../assets/Variables";

export default StyleSheet.create({

    container:{
        width:Variables.screenWidth,
        height:Variables.buttonContainerHeight,
        paddingTop:Variables.buttonTopPadding,
        paddingLeft:Variables.buttonPadding,
        borderTopWidth:10,
        borderTopColor:Variables.lightGreyColor,
    },
    button:{
        width:Variables.butttonWidth,
        height:Variables.buttonHeight,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    icon:{
        width:Variables.butttonWidth/5,
        height:Variables.butttonWidth/5.5
    },
    text:{
        color:Variables.blueColor,
        fontSize:17,
        textAlign:"left",
        marginLeft:25
    } 
})