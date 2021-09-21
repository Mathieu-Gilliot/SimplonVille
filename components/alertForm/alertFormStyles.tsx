import { StyleSheet } from "react-native";
import { Variables } from "../../assets/Variables";

export default StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom:120
    },
    input: {
        backgroundColor: Variables.lightGreyColor,
        color: Variables.lightBlueColor,
        borderColor: Variables.inputBorderColor,
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 10,
        width: 330
    },
    textArea: {
        maxHeight: 200
    },
    inputBloc: {
        marginTop: 15
    },
    text: {
        color: Variables.blueColor,
        fontSize: 14,
        textAlign: "left",
        marginBottom: 10
    },
    pictureText:{
        width:330
    },
    multipleTextsOneline: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pictureButton:{
        alignSelf :"center",
        borderRadius:50,
        width:100,
        height:100,
        backgroundColor: Variables.lightGreyColor,
        borderColor: Variables.inputBorderColor,
        borderWidth: 1
    },
    validateButton:{
        marginTop:Variables.buttonTopPadding,
        width:360,
        backgroundColor:Variables.inputBorderColor,
        borderRadius:15,
        height:125
    },
    validateText:{
        textAlign:"center",
        color:"white",
        fontSize:30,
        marginTop:37.5
    },
    map:{
        height:50
    },
    errorText:{
        color:"red"
    },
    cameraView:{
        marginTop:10,
        display:'flex',
        justifyContent:"center",
        alignItems:"center" 
    },
    cameraContainer:{
        width: "80%",
        height: 400,
        marginTop:15,
      

    }
})