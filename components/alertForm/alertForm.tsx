import { Formik } from "formik";
import React, { useCallback } from "react";
import { TextInput, View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import styles from './alertFormStyles';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { CustomMap } from "../map/map";
import { alertValidationSchema } from "../../services/yupValidationSchema";
import { Camera } from "expo-camera";
import { CameraCapturedPicture, CameraType } from "expo-camera/build/Camera.types";
import { useEffect } from "react";
import ImageEditor from "@react-native-community/image-editor";
import * as FileSystem from 'expo-file-system'
import sendEmail from '../../services/mail';
import MessageQueue from "react-native/Libraries/BatchedBridge/MessageQueue";
import { onChange } from "react-native-reanimated";
import { ICoord } from "../../interfaces/ICoord";
import { Variables } from "../../assets/Variables";
import IRegion from "../../interfaces/IRegion";

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
    const [city, setCity] = useState<string>();
    const [zipCode, setZipCode] = useState<string>();

    const [cameraStarted, setCameraStarted] = useState(false);
    const [camera, setCamera] = useState({
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        ref: null
    });
    const [photo, setPhoto] = useState({
        width: null,
        height: null,
        uri: "",
        base64: null,
        exif: null,
    })

    const [coord, setCoord] = useState<ICoord>()


    const getLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return "Error occured";
        } else if (location == null) {
            await Location.watchPositionAsync({ accuracy: 6, timeInterval: 10000 }, (location) => {
                setLocation(location);
                setCoord({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.4, longitudeDelta: 0.4 })
            })
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
        if (!unmounted) {
            console.log("A date has been picked: ", date);
            hideDateTimePicker();
            if (date != undefined) {
                setDate(date);
            }
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
        if (!unmounted) {
            console.log("A date has been picked: ", date?.getHours().toString() + ":" + (date?.getMinutes() != undefined && date?.getMinutes() < 10 ? '0' : '') + date?.getMinutes());
            hideTimePicker();
            if (date != undefined) {
                setDateTime(date);
            }
        }
    };



    const getCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            setCamera({ hasCameraPermission: true, type: CameraType.back, ref: null })
        } else {
            return 'Access denied'
        }
    }
    const __startCamera = async () => {
        if (!unmounted) {
            if (camera.hasCameraPermission === false || camera.hasCameraPermission === null) {
                return 'Access denied'
            } else {
                // start the camera
                setCameraStarted(true);

            }
        }
    }

    const getLocationFromMarker = async (coords: IRegion,isLocation:Boolean) => {
        await Location.reverseGeocodeAsync({latitude:coords.latitude,longitude:coords.longitude}).then((adress) => {
            console.log(isLocation)
            if (isLocation) {
                setcurrentLocation(adress[0].name + ' ' + adress[0].street + ' ' + adress[0].postalCode + ' ' + adress[0].city);
            } else {
                setAdress(adress[0].name + ' ' + adress[0].street);
                setCity(adress[0].city);
                setZipCode(adress[0].postalCode)
            }
        }) 
    }

    let unmounted = false;
    useEffect(() => {
        if (!unmounted) {
            getLocation();
            getCameraPermission();
        }
        return () => {
            unmounted = true;

        }
    }, [unmounted])



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
        onSubmit={async (values) => { if (!unmounted) { props.onEmailSend(await sendEmail(values)) } }}
    >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View style={styles.container}>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Choisissez le type d'alerte*</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedAlertCause}
                        onValueChange={(itemValue: string, itemIndex) => {
                            if (!unmounted) {
                                setFieldValue('alertType', itemValue)
                                setSelectedAlertCause(itemValue)
                            }
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
                    <TextInput style={styles.input} value={date.toLocaleDateString()} onFocus={() => { if (!unmounted) { showDateTimePicker() } }} onChangeText={() => values.alertDate = date.toLocaleDateString()}></TextInput>
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
                    <TextInput style={styles.input} onFocus={() => { if (!unmounted) { showTimePicker() } }} value={`${(dateTime?.getHours() < 10 ? '0' : '') + dateTime.getHours().toString()} h ${(dateTime?.getMinutes() < 10 ? '0' : '') + dateTime?.getMinutes()}`} onChangeText={() => values.alertHour = `${(dateTime?.getHours() < 10 ? '0' : '') + dateTime.getHours().toString()} h ${(dateTime?.getMinutes() < 10 ? '0' : '') + dateTime?.getMinutes()}`}></TextInput>
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
                        <Pressable onPress={() => { reverseGeoCode(true) }}>
                            <Text style={styles.text}>Sur ma position</Text>
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} value={currentLocation} ></TextInput>
                    {errors.alertLocation && touched.alertLocation ? (
                        <Text style={styles.errorText}>{errors.alertLocation}</Text>
                    ) : null}
                    <View>
                        <CustomMap latitude={coord != null ? coord.latitude : Variables.baseCoords.latitude} longitude={coord != null ? coord.longitude : Variables.baseCoords.longitude} latitudeDelta={0.4} longitudeDelta={0.4} onMarkerDrag={(coords: IRegion) => { getLocationFromMarker(coords,true) }} ></CustomMap>
                    </View>

                </View>
                < View style={styles.inputBloc}>
                    <Text style={[styles.text, styles.pictureText]}>Ajouter une photo (optionnel)</Text>
                    {camera.hasCameraPermission == null || camera.hasCameraPermission == false ? (
                        <Text style={styles.errorText}>Vous devez autoriser l'accès à la caméra</Text>
                    ) : (<Pressable style={styles.pictureButton} onPress={async () => {
                        if (!unmounted) {
                            getCameraPermission();
                            if (!cameraStarted && !unmounted) {
                                await __startCamera()
                            } else if (camera.ref) {
                                camera.ref.takePictureAsync({ base64: true }).then(async (photo: CameraCapturedPicture) => {
                                    setCameraStarted(false);
                                    

                                    let base64Img = `data:image/jpg;base64,${photo.base64}`;
                                    let data ={
                                        "file":base64Img,
                                        "upload_preset":"ml_default",
                                        "cloud_name":process.env.CLOUD_NAME
                                    }
                                    fetch(`https://api.cloudinary.com/v1_1/devqqlz1p/image/upload`,{
                                        body: JSON.stringify(data),
                                        headers:{
                                            'content-type': 'application/json'
                                        },
                                        method: 'POST'
                                    }).then(async(response)=>{
                                        const res = await response.json();
                                        setPhoto({ base64: true, exif: photo.exif, height: 100, width: 100, uri: res.url });
                                    })

                                });

                            }
                        }

                    }}>{photo.uri != null && photo.uri.length>0?(
                        <Image source={{uri:photo.uri}} ></Image>
                    ):(
                        <Image source={require('../../assets/Images/camera.png')} style={{ margin: "25%" }}></Image>
                    )

                    }
                        
                    </Pressable>
                    )}
                    {cameraStarted == true ? (
                        <View style={styles.cameraView}>
                            <Camera style={styles.cameraContainer} type={camera.type} ref={ref => camera.ref = ref}>
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
                                            if (!unmounted) {
                                                setCamera({ hasCameraPermission: camera.hasCameraPermission, type: camera.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back, ref: camera.ref });
                                            }
                                        }}>
                                        <Image source={require('../../assets/Images/switch.png')} style={{ marginBottom: 10, marginLeft: 40 }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        </View>
                    ) : null}
                  
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
                        <Pressable onPress={() => { if (!unmounted) { reverseGeoCode(false) } }}><Text style={styles.text}>Sur ma position</Text></Pressable>
                    </View>
                    <TextInput style={styles.input} value={adress != '' ? adress : null} onTextInput={() => console.log("test")}></TextInput>
                    {errors.adress && touched.adress ? (
                        <Text style={styles.errorText}>{errors.adress}</Text>
                    ) : null}
                    <CustomMap latitude={location != null ? location.coords.latitude : Variables.baseCoords.latitude} longitude={location != null ? location.coords.longitude : Variables.baseCoords.longitude} latitudeDelta={0.4} longitudeDelta={0.4} onMarkerDrag={(coords: IRegion) => { getLocationFromMarker(coords,false) }}></CustomMap>
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
                <Pressable style={styles.validateButton} onPress={() => { if (!unmounted) { setFieldValue('adress', adress); setFieldValue('alertLocation', currentLocation); setFieldValue('town', city); setFieldValue('zipCode', zipCode);setFieldValue('alertPicture',photo.uri); setTimeout(() => { handleSubmit() }, 1000) } }}>
                    <Text style={styles.validateText}>Valider votre alerte</Text>
                </Pressable>
            </View>
        )}
    </Formik>
}