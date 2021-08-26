import { Formik, useFormik, validateYupSchema } from "formik";
import React from "react";
import { TextInput, View, Text, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import styles from './alertFormStyles';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { Variables } from "../../assets/Variables";
import { CustomMap } from "../map/map";
import { alertValidationSchema } from "../../services/yupValidationSchema";
import emailjs from 'emailjs-com';


export function AlertForm() {
    const [selectedAlertCause, setSelectedAlertCause] = useState<string>();
    const [isVisible, setIsVisible] = useState(false);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateTime, setDateTime] = useState(new Date());
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [currentLocation, setcurrentLocation] = useState<string>();
    const [adress, setAdress] = useState<string>();


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

    getLocation();


    const reverseGeoCode = async (isLocation: boolean) => {


        if (location != null) {
            await Location.reverseGeocodeAsync({ latitude: location != null ? location.coords.latitude : 0, longitude: location != null ? location.coords.longitude : 0 }, { useGoogleMaps: false }).then((adress) => {
                if (isLocation) {
                    setcurrentLocation(adress[0].name + ' ' + adress[0].street)
                } else {
                    setAdress(adress[0].name + ' ' + adress[0].street)
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

    function sendEmail(values) {
        const templateParams = {
            name: values.name + ' ' + values.firstName,
            notes: values
        };
        emailjs.send('service_7k02pyu', 'template_afo2r6r', templateParams, 'user_rmkjPQeQcwQ3PBlW2bRTR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

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
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
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
                        <Pressable onPress={async () => await reverseGeoCode(true)}>
                            <Text style={styles.text}>Sur ma position</Text>
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} value={currentLocation} onChangeText={() => currentLocation != undefined ? values.alertLocation = currentLocation : values.alertLocation = ""} ></TextInput>
                    {errors.alertLocation && touched.alertLocation ? (
                        <Text style={styles.errorText}>{errors.alertLocation}</Text>
                    ) : null}
                    <View>
                        <CustomMap ></CustomMap>
                    </View>

                </View>
                < View style={styles.inputBloc}>
                    <Text style={[styles.text, styles.pictureText]}>Ajouter une photo (optionnel)</Text>
                    <Pressable style={styles.pictureButton} onPress={() => console.log("photo")}>
                        <Image source={require('../../assets/Images/camera.png')} style={{ margin: "25%" }}></Image>
                    </Pressable>
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
                        <Pressable onPress={() => reverseGeoCode(false)}><Text style={styles.text}>Sur ma position</Text></Pressable>
                    </View>
                    <TextInput style={styles.input} value={adress != '' ? adress : null} onChange={(e) => console.log(e)}></TextInput>
                    {errors.adress && touched.adress ? (
                        <Text style={styles.errorText}>{errors.adress}</Text>
                    ) : null}
                    <CustomMap></CustomMap>
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Code postal*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("zipCode")} value={values.zipCode}></TextInput>
                    {errors.zipCode && touched.zipCode ? (
                        <Text style={styles.errorText}>{errors.zipCode}</Text>
                    ) : null}
                </View>
                <View style={styles.inputBloc}>
                    <Text style={styles.text}>Ville*</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("town")} value={values.town}></TextInput>
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
                <Pressable style={styles.validateButton} onPress={() => handleSubmit()}>
                    <Text style={styles.validateText}>Valider votre alerte</Text>
                </Pressable>
            </View>
        )}
    </Formik>
}