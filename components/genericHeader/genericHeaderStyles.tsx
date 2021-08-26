import { StyleSheet } from "react-native";
import { Variables } from "../../assets/Variables";

export default StyleSheet.create({
    flex:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    container:{
        width:Variables.screenWidth,
        height:Variables.buttonContainerHeight,
        borderBottomWidth:10,
        borderBottomColor:Variables.lightGreyColor,
        padding:10
    },
    backArrow:{
        alignSelf:"flex-start"
    },
    header:{
        width:Variables.screenWidth/1.5,
    },
    icon:{
        width:Variables.butttonWidth/3,
        height:Variables.butttonWidth/3.5
    },
    text:{
        color:Variables.blueColor,
        fontSize:20,
        textAlign:"left",
        marginLeft:25
    } 
})