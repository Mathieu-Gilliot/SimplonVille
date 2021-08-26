import { StyleSheet } from "react-native";
import { Variables } from "../../assets/Variables";

export default StyleSheet.create({
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        borderBottomWidth: 10,
        borderBottomColor: Variables.lightGreyColor,
        height: 100,
        width: 400,
        padding:17.5
    },
    itemIcon: {
        borderRadius: 50,
        height: 75,
        width: 75,
        backgroundColor: Variables.lightGreyColor,
        borderColor: Variables.inputBorderColor,
        borderWidth: 1
    },
    icon:{
        margin:15
    },
    descriptionContainer:{
        width:275,
        height: 75,
        backgroundColor: Variables.lightGreyColor,
        borderColor: Variables.inputBorderColor,
        borderWidth: 1,
        padding:5
    },
    descText:{
        color: Variables.blueColor,
        fontSize: 12,
        margin:2
    }
})