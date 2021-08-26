import React from "react";
import { View, Image, Text } from "react-native";
import { Variables } from "../../assets/Variables";
import { IAlertItem } from "../../interfaces/IAlertItem";
import styles from "./alertItemStyles";

export function AlertItem(props: IAlertItem) {
  let noItemPicture;
  const noPicture = props.picture != null;

  switch (props.cause) {
    case 'Animal Perdu':
      noItemPicture = require('../../assets/Images/paw.png');
      break;
    case 'Travaux':
      noItemPicture = require('../../assets/Images/travaux.png');
      break;
    case 'Problème de voirie':
      noItemPicture = require('../../assets/Images/road.png');
      break;
    case 'Accident de la route':
      noItemPicture = require('../../assets/Images/car-crash.png');
      break;
    default:
      noItemPicture = require('../../assets/Images/question.png');
      break;
  }

  return <View style={styles.itemContainer}>
    {noPicture && (
      <Image source={props.picture} style={{ width: 75, height: 75, borderRadius: 50 }}></Image>
    )}
    {!noPicture && (
      <View style={styles.itemIcon}>
        <Image source={noItemPicture} style={styles.icon}></Image>
      </View>
    )}
    <View style={styles.descriptionContainer}>
      <Text style={styles.descText}>{props.cause}</Text>
      <Text style={styles.descText}>{props.location}</Text>
      <Text style={styles.descText}>{props.date} à {props.hours}</Text>
    </View>
  </View>
}