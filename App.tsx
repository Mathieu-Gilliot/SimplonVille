
import 'react-native-gesture-handler';
import React from 'react';
import { HomePage } from './pages/homePage/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConsultingAlertsPage } from './pages/consultingAlertsPage/consultingAlertsPage';
import { AlertFormPage } from './pages/alertFormPage/alertFormPage';
import { AlertSendPage } from './pages/alertSendPage/alertSendPage';
import { AlertForm } from './components/alertForm/alertForm';



const Stack = createStackNavigator()

export default function App(){

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={HomePage}
            options={{ title: "", header: () => null }}
          />
          <Stack.Screen
            name="consult"
            component={ConsultingAlertsPage}
            options={{ title: "", header: () => null }}
          />
          <Stack.Screen
            name="create"
            component={AlertFormPage}
            options={{ title: "", header: () => null }}
          />
          <Stack.Screen
            name="send"
            component={AlertSendPage}
            options={{ title: "", header: () => null }}
          />
          <Stack.Screen
            name="alertForm"
            component={AlertForm}
            options={{ title: "", header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  
}


