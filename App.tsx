
import 'react-native-gesture-handler';
import React from 'react';
import { HomePage } from './pages/homePage/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConsultingAlertsPage } from './pages/consultingAlertsPage/consultingAlertsPage';
import { alertFormPage } from './pages/alertFormPage/alertFormPage';


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
            component={alertFormPage}
            options={{ title: "", header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  
}


