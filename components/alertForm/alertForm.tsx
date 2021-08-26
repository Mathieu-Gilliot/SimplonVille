import { Formik} from "formik";
import React from "react";
import { TextInput, View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import styles from './alertFormStyles';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { CustomMap } from "../map/map";
import { alertValidationSchema } from "../../services/yupValidationSchema";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import { useEffect } from "react";
import ImageEditor from "@react-native-community/image-editor";
import * as FileSystem from 'expo-file-system'
import  sendEmail from '../../services/mail';

export function AlertForm(props) {
    const [selectedAlertCause, setSelectedAlertCause] = useState<string>();

    const [isVisible, setIsVisible] = useState(false);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateTime, setDateTime] = useState(new Date());

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const [currentLocation, setcurrentLocation] = useState<string>();

    const [adress, setAdress] = useState<string>();
    const [city,setCity] = useState<string>();
    const [zipCode,setZipCode] = useState<string>();

    const [cameraStarted, setCameraStarted]= useState(false);
    const [camera, setCamera] = useState({
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        ref:null
    });
    const [photo,setPhoto] = useState()


    const getLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return "Error occured";
        } else {
            let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
            setLocation(location);
        }

    };

    const reverseGeoCode = async (isLocation: boolean) => {

        if (location != null) {
            await Location.reverseGeocodeAsync({ latitude: location != null ? location.coords.latitude : 0, longitude: location != null ? location.coords.longitude : 0 }, { useGoogleMaps: false }).then((adress) => {
                if (isLocation) {
                    setcurrentLocation(adress[0].name + ' ' + adress[0].street + ' ' + adress[0].postalCode + ' ' + adress[0].city);
                } else {
                    setAdress(adress[0].name + ' ' + adress[0].street);
                    setCity(adress[0].city);
                    setZipCode(adress[0].postalCode)
                }
            })
        }
    }

    //Date picker
    const showDateTimePicker = () => {
        setIsVisible(true);
    };

    const hideDateTimePicker = () => {
        setIsVisible(false);
    };

    const handleDatePicked = (event: Event, date?: Date | undefined) => {
        console.log("A date has been picked: ", date);
        hideDateTimePicker();
        if (date != undefined) {
            setDate(date);
        }
    };

    //Time picker
    const showTimePicker = () => {
        setIsTimeVisible(true);
    };

    const hideTimePicker = () => {
        setIsTimeVisible(false);
    };


    const handleTimePicked = (event: Event, date?: Date | undefined) => {
        console.log("A date has been picked: ", date?.getHours().toString() + ":" + (date?.getMinutes() != undefined && date?.getMinutes() < 10 ? '0' : '') + date?.getMinutes());
        hideTimePicker();
        if (date != undefined) {
            setDateTime(date);
        }
    };



    const getCameraPermission = async () =>{
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            setCamera({hasCameraPermission:true,type:CameraType.back,ref:null})
        } else {
            return 'Access denied'
        }
    }
    const __startCamera = async () => {
        
        if (camera.hasCameraPermission === false || camera.hasCameraPermission === null) {
            return 'Access denied'
        } else {
            // start the camera
            setCameraStarted(true);
            
        }
    }

    useEffect(()=>{
        getLocation();
        getCameraPermission();

    },[]);

    return <Formik
        initialValues={{
            alertType: "Accident de la route",
            alertDescription: '',
            alertDate: date.toLocaleDateString(),
            alertHour: `${(dateTime?.getHours() < 10 ? '0' : '') + dateTime.getHours().toString()} h ${(dateTime?.getMinutes() < 10 ? '0' : '') + dateTime?.getMinutes()}`,
            alertLocation: '',
            alertPicture: '',
            name: '',
            firstName: '',
            adress: '',
            zipCode: '',
            town: '',
            email: '',
            phoneNumber: ''
        }}
        enableReinitialize={true}
        validationSchema={alertValidationSchema}
        onSubmit={async(values)=> props.onEmailSend(await sendEmail(values))}
    >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched  }) => (
            <View style={styles.container}>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Choisissez le type d'alerte*</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedAlertCause}
                        onValueChange={(itemValue: string, itemIndex) => {
                            setFieldValue('alertType', itemValue)
                            setSelectedAlertCause(itemValue)
                        }
                        }
                    >
                        <Picker.Item style={styles.input} label="Accident de la route" value="Accident de la route" />
                        <Picker.Item style={styles.input} label="Travaux" value="Travaux" />
                        <Picker.Item style={styles.input} label="Problème de voirie" value="Problème de voirie" />
                        <Picker.Item style={styles.input} label="Animal perdu" value="Animal perdu" />

                    </Picker>
                    {errors.alertType && touched.alertType ? (
                        <Text style={styles.errorText}>{errors.alertType}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Décrivez l'alerte*</Text>
                    <TextInput style={[styles.input, styles.textArea]}
                        multiline={true}
                        numberOfLines={4}
                        value={values.alertDescription}
                        onChangeText={handleChange("alertDescription")}
                    >
                    </TextInput>
                    {errors.alertDescription && touched.alertDescription ? (
                        <Text style={styles.errorText}>{errors.alertDescription}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Date de l'incident*</Text>
                    <TextInput style={styles.input} value={date.toLocaleDateString()} onFocus={() => showDateTimePicker()} onChangeText={() => values.alertDate = date.toLocaleDateString()}></TextInput>
                    {isVisible && (
                        <DateTimePicker
                            mode='date'
                            value={date}
                            onChange={handleDatePicked}
                        />
                    )}
                    {errors.alertDate && touched.alertDate ? (
                        <Text style={styles.errorText}>{errors.alertDate}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Heure de l'incident*</Text>
                    <TextInput style={styles.input} onFocus={() => showTimePicker()} value={`${(dateTime?.getHours() < 10 ? '0' : '') + dateTime.getHours().toString()} h ${(dateTime?.getMinutes() < 10 ? '0' : '') + dateTime?.getMinutes()}`} onChangeText={() => values.alertHour = `${(dateTime?.getHours() < 10 ? '0' : '') + dateTime.getHours().toString()} h ${(dateTime?.getMinutes() < 10 ? '0' : '') + dateTime?.getMinutes()}`}></TextInput>
                    {isTimeVisible && (
                        <DateTimePicker
                            mode='time'
                            value={dateTime}
                            onChange={handleTimePicked}
                        />
                    )}
                    {errors.alertHour && touched.alertHour ? (
                        <Text style={styles.errorText}>{errors.alertHour}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <View style={styles.multipleTextsOneline}>
                        <Text style={styles.text}>Où se trouve l'incident?*</Text>
                        <Pressable onPress={() => { reverseGeoCode(true)}}>
                            <Text style={styles.text}>Sur ma position</Text>
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} value={currentLocation} ></TextInput>
                    {errors.alertLocation && touched.alertLocation ? (
                        <Text style={styles.errorText}>{errors.alertLocation}</Text>
                    ) : null}
                    <View>
                        <CustomMap ></CustomMap>
                    </View>

                </View>
                < View style={styles.inputBloc}>
                    <Text style={[styles.text, styles.pictureText]}>Ajouter une photo (optionnel)</Text>
                    {camera.hasCameraPermission == null || camera.hasCameraPermission == false ? (
                        <Text style={styles.errorText}>Vous devez autoriser l'accès à la caméra</Text>
                    ) : ( <Pressable style={styles.pictureButton} onPress={async () =>{ if(!cameraStarted) {
                        await __startCamera()
                    }else if(camera.ref){
                         camera.ref.takePictureAsync().then(async(photo)=>{
                                
                            // FileSystem.moveAsync({from:photo.uri,to:})
                            // let cropData = {
                            //     offset:{x:0,y:0},
                            //     size:{width:75,height:100}
                            //  }
                            // await ImageEditor.cropImage(photo.uri,cropData).then(url=>{
                            //     console.log("Cropped image uri", url)
                            // })
                            console.log(photo);
                         });
                        
                    }}}>
                        <Image source={require('../../assets/Images/camera.png')} style={{ margin: "25%" }}></Image>
                    </Pressable>
                    )}
                    {cameraStarted == true ?(
                        <View style={styles.inputBloc}>
                        <Camera style={styles.cameraContainer} type={camera.type} ref={ref=>camera.ref = ref}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: 'transparent',
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                              }}
                              onPress={() => {
                               setCamera({hasCameraPermission:camera.hasCameraPermission,type:camera.type === Camera.Constants.Type.back?Camera.Constants.Type.front:Camera.Constants.Type.back,ref:camera.ref});
                              }}>
                              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                {' '}
                                Flip{' '}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Camera>
                      </View>
                    ):null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Votre nom*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("name")} value={values.name}></TextInput>
                    {errors.name && touched.name ? (
                        <Text style={styles.errorText}>{errors.name}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Votre prénom*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("firstName")} value={values.firstName}></TextInput>
                    {errors.firstName && touched.firstName ? (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <View style={styles.multipleTextsOneline}>
                        <Text style={styles.text}>Votre adresse*</Text>
                        <Pressable onPress={() => {reverseGeoCode(false)}}><Text style={styles.text}>Sur ma position</Text></Pressable>
                    </View>
                    <TextInput style={styles.input} value={adress != '' ? adress : null} onTextInput={() => console.log("test")}></TextInput>
                    {errors.adress && touched.adress ? (
                        <Text style={styles.errorText}>{errors.adress}</Text>
                    ) : null}
                    <CustomMap></CustomMap>
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Code postal*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("zipCode")} value={zipCode}></TextInput>
                    {errors.zipCode && touched.zipCode ? (
                        <Text style={styles.errorText}>{errors.zipCode}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Ville*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("town")} value={city}></TextInput>
                    {errors.town && touched.town ? (
                        <Text style={styles.errorText}>{errors.town}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Votre email*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("email")} value={values.email}></TextInput>
                    {errors.email && touched.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Votre numéro de téléphone (optionnel)</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("phoneNumber")} value={values.phoneNumber}></TextInput>
                    {errors.phoneNumber && touched.phoneNumber ? (
                        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    ) : null}
                </View>
                <Pressable style={styles.validateButton} onPress={() =>{setFieldValue('adress',adress);setFieldValue('alertLocation',currentLocation);setFieldValue('town',city);setFieldValue('zipCode',zipCode);handleSubmit()} }>
                    <Text style={styles.validateText}>Valider votre alerte</Text>
                </Pressable>
            </View>
        )}
    </Formik>
}