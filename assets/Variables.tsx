

export class Variables {

    //Texts
    public static homeHeaderTitle = "SimplonVille, la ville 2.0.2.1";
    public static homeHeaderSubTitle = "Restez Connectés";


    //Css
        //Colors
          public static blueColor = "#768BA5";
          public static lightBlueColor = "#3682B0";
          public static inputBorderColor = "#A7BBC7";
          public static lightGreyColor = "#E1E5EA";
        //Values
          public static pictureLocalBaseUrl = "../../assets/Images/";
          public static screenWidth = 400;
          public static butttonWidth = 250;
          public static buttonPadding = (Variables.screenWidth - Variables.butttonWidth) / 2;
          public static buttonContainerHeight = 150;
          public static buttonHeight = 50;
          public static buttonTopPadding = (Variables.buttonContainerHeight - Variables.buttonHeight) / 2;
          public static pageMarginTop = 30;
    
    //Coords
    public static baseCoords = {
      latitude : 50.9581,
      longitude: 1.8521
    }

    //Mails

    public static cityMaintenanceTemplate= "template_6nb8p8i";
    public static lostPetAlert = "template_afo2r6r";
    public static carCrashAlert = ""
}