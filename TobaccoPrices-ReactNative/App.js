import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TobaccoItems from "./components/TobaccoItems";
import ErrorReporting from './components/ErrorReporting';


function NotificationsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Főoldalra" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
          drawerStyle: {
          backgroundColor: '#b5b09e',
          width: 240,
        },
      }} initialRouteName="Dohánytermékek">
        <Drawer.Screen name="Dohánytermékek" component={TobaccoItems} />
        <Drawer.Screen name="Kedvencek" component={NotificationsScreen} />
        <Drawer.Screen name="Hibabejelentés" component={ErrorReporting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}