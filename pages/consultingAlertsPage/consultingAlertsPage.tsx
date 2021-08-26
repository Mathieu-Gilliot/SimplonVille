import React from 'react';
import { View,FlatList} from 'react-native';
import { Variables } from '../../assets/Variables';
import { AlertItem } from '../../components/alertItem/alertItem';
import { GenericHeader } from '../../components/genericHeader/genericHeader';
import { IAlertItem } from '../../interfaces/IAlertItem';
import styles from '../appStyles';


export function ConsultingAlertsPage({ navigation }: any) {
        const DATA: Array<IAlertItem> = require('../../assets/data.json');
        return <View style={styles.container}>
                <GenericHeader iconUri={require('../../assets/Images/eye.png')} text={"Consulter les alertes"} onPress={() => { navigation.navigate('home') }}></GenericHeader>
                <FlatList<IAlertItem>
                        data={DATA}
                        renderItem={({ item }) => (<AlertItem
                                id={item.id}
                                cause={item.cause}
                                description={item.description}
                                date={item.date}
                                hours={item.hours}
                                location={item.location}
                                picture={null}
                                name={item.name}
                                firstname={item.firstname}
                                adress={item.adress}
                                zipCode={item.zipCode}
                                city={item.city}
                                phoneNumber={item.phoneNumber}>
                        </AlertItem>
                        )}
                        keyExtractor={(item: IAlertItem) => (item.id - 1).toString()}
                        contentContainerStyle={{ paddingBottom: 100 }}
                />
        </View>

}