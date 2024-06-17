import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeviceListScreen from '../screens/DeviceList';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import styles from '../styles';
import DevicesRoutes from './DevicesRoutes';
import SettingsRoutes from './SettingsRoutes';

const Tab = createBottomTabNavigator();

const label = (text) => ({focused, color, position}) => {
  return <Text style={{color, fontSize: 13}}>{text}</Text>;
};

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Devices') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: styles.colors.luckyPoint,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Devices"
        component={DevicesRoutes}
        options={{tabBarLabel: label('Dispositivos')}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsRoutes}
        options={{tabBarLabel: label('Ajustes')}}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
