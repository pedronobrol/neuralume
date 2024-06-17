import {css} from '@emotion/native';
import * as React from 'react';
import {Image, ImageStyle, Text, View} from 'react-native';
import {logOut} from '../api';
import Button from '../components/Button';
import NeuralumeLogo from '../assets/neuralume-logo-w.png';
import {StackNavigationProp} from '@react-navigation/stack';

type SettingsIndexScreenNavigationProp = StackNavigationProp<{
  AddDevice: undefined;
}>;

export type SettingsIndexScreenProps = {
  navigation: SettingsIndexScreenNavigationProp;
};

const containerStyles = css`
  padding: 20px 20px;
`;

const logoStyles = css<ImageStyle>`
  resize-mode: contain;
  width: 80%;
  height: 50px;
`;

const SettingsIndexScreen: React.FC<SettingsIndexScreenProps> = ({
  navigation,
}) => {
  const addDevice = () => {
    navigation.navigate('AddDevice');
  };

  return (
    <View style={containerStyles}>
      <View style={{alignItems: 'center'}}>
        <Image source={NeuralumeLogo} style={logoStyles} />
      </View>
      <Button
        style={{
          backgroundColor: '#ffffff',
          alignItems: 'flex-start',
          paddingLeft: 20,
        }}
        onPress={addDevice}
        textStyle={{fontWeight: '400', fontSize: 18, color: 'black'}}>
        Añadir dispositivo
      </Button>
      <Button
        style={{
          backgroundColor: '#ffffff',
          alignItems: 'flex-start',
          paddingLeft: 20,
        }}
        textStyle={{fontWeight: '400', fontSize: 18, color: 'black'}}
        onPress={logOut}>
        Cerrar sesión
      </Button>
      <Text style={{marginTop: 20}}>&copy; 2021 Neuralume Labs Ltd.</Text>
    </View>
  );
};

export default SettingsIndexScreen;
