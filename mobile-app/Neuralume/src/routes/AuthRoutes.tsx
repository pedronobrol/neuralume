import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../screens/LogIn';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="LogIn">
      <AuthStack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
