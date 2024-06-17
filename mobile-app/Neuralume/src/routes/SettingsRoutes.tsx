import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddDeviceScreen from '../screens/AddDevice';
import AddDeviceCredentialsFormScreen from '../screens/AddDeviceCredentialsForm';
import SettingsIndexScreen from '../screens/SettingsIndex';

const Stack = createStackNavigator();

const SettingsRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SettingsIndexScreen}
        name="SettingsIndex"
        options={{headerTitle: 'Ajustes'}}
      />
      <Stack.Screen
        component={AddDeviceScreen}
        name="AddDevice"
        options={{headerTitle: 'Añadir dispositivo'}}
      />
      <Stack.Screen
        component={AddDeviceCredentialsFormScreen}
        name="AddDeviceCredentialsForm"
        options={{headerTitle: 'Añadir dispositivo'}}
      />
    </Stack.Navigator>
  );
};

export default SettingsRoutes;
