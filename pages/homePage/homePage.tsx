import React from 'react';
import { View, Image } from 'react-native';
import { AppHeader } from '../../components/appHeader/appHeader';
import { Variables } from '../../assets/Variables';
import { RoutingButton } from '../../components/Routing button/routingButton';
import styles from '../appStyles';


export function HomePage({navigation}:any) {
    return <View style={styles.container}>
        <AppHeader title={Variables.homeHeaderTitle} subtitle={Variables.homeHeaderSubTitle}></AppHeader>
        <Image source={require('../../assets/Images/city.png')} style={{ width: 400, height: 475, position: "absolute", margin: "auto"}} />
        <RoutingButton iconUri={require('../../assets/Images/eye.png')} text={"Consulter les alertes"} onPress={() => navigation.navigate('consult')}></RoutingButton>
        <RoutingButton iconUri={require('../../assets/Images/warning.png')} text={"Créer une alerte"} onPress={() => navigation.navigate('create')}></RoutingButton>
    </View>


}