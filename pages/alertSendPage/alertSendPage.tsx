import React from 'react';
import { View, Text, Image } from "react-native";
import styles from '../appStyles';
import { AppHeader } from '../../components/appHeader/appHeader';
import { Variables } from '../../assets/Variables';
import { RoutingButton } from '../../components/Routing button/routingButton';

export function AlertSendPage({ navigation, route }: any) {
    
    return <View style={styles.container}>
        <AppHeader title={Variables.homeHeaderTitle} subtitle={Variables.homeHeaderSubTitle}></AppHeader>
        {route.params.status == "OK" ? (
            <View style={styles.middleContainer}>
                <Text style={styles.confirmText}> Votre alerte a bien été reçue par nos services!</Text>
                <Text style={styles.confirmText}> Merci de rendre la vie à SimplonVille meilleure pour tous !</Text>
                <Image source={require("../../assets/Images/check.png")} style={styles.confirmPicture}></Image>
            </View>
        ) : (
            <View style={styles.middleContainer}>
            <Text style={styles.confirmText} > Une erreur est survenue lors de l'envoie de votre alerte.</Text>
            <Text style={styles.confirmText}> L'équipe technique de SimplonVille s'excuse pour la gêne occasionnée</Text>
            <Image source={require("../../assets/Images/bug.png")} style={styles.confirmPicture}></Image>
        </View>
        )}
        <RoutingButton iconUri={require('../../assets/Images/eye.png')} text={"Consulter les alertes"} onPress={() => navigation.navigate('consult')}></RoutingButton>
        <RoutingButton iconUri={require('../../assets/Images/home.png')} text={"Revenir à l'accueil"} onPress={() => navigation.navigate('home')}></RoutingButton>
    </View>

}