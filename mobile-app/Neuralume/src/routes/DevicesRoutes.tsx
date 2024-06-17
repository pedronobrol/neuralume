import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DeviceListScreen from '../screens/DeviceList';

const Stack = createStackNavigator();

const DevicesRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={DeviceListScreen}
        name="DeviceList"
        options={{headerTitle: 'Dispositivos'}}
      />
    </Stack.Navigator>
  );
};

export default DevicesRoutes;
