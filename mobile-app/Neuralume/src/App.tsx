/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Routes from './routes';
import store from './store';
import {ApolloProvider} from '@apollo/client';
import client from './api/client';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// FeatherIcon.loadFont();
IonIcon.loadFont();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
