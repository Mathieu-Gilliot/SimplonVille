import React from 'react';
import {View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AlertForm } from '../../components/alertForm/alertForm';
import { GenericHeader } from '../../components/genericHeader/genericHeader';
import styles from '../appStyles';

export function alertFormPage({navigation}:any) {
        return <View style={styles.container}>
           <GenericHeader iconUri={require('../../assets/Images/warning.png')} text={"Alertez vos concitoyens"} onPress={() => navigation.navigate('home')}></GenericHeader>
           <ScrollView>
                   <AlertForm></AlertForm>
           </ScrollView>
        </View>
}