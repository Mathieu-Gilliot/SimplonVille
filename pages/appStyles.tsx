import { StyleSheet } from "react-native";
import { Variables } from "../assets/Variables";


export default StyleSheet.create({

  container: {
    marginTop: Variables.pageMarginTop,
    marginBottom: Variables.pageMarginTop + 10
  },
  middleContainer: {
    width: 400, 
    position: 'absolute', 
    display: "flex", 
    flexDirection: "column", 
    paddingTop: 80,
    alignItems:'center'
  },
  confirmText:{
    fontSize:23,
    color:Variables.blueColor,
    textAlign:'center',
    marginTop:20,
    padding:10,
    paddingRight:20
  },
  confirmPicture:{
    marginTop:20
  }
})