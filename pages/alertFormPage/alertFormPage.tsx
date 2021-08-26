import React from 'react';
import {View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AlertForm } from '../../components/alertForm/alertForm';
import { GenericHeader } from '../../components/genericHeader/genericHeader';
import styles from '../appStyles';

export function AlertFormPage({navigation}:any) {
        return <View style={styles.container}>
           <GenericHeader iconUri={require('../../assets/Images/warning.png')} text={"Alertez vos concitoyens"} onPress={() => navigation.navigate('home')}></GenericHeader>
           <ScrollView>
                   <AlertForm onEmailSend={(status:string)=> navigation.navigate('send',{status:status})}></AlertForm>
           </ScrollView>
        </View>
}