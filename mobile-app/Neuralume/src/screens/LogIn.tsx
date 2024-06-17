import * as React from 'react';
import {useEffect} from 'react';

import {Alert, Image, ImageStyle, StatusBar, Text, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {css} from '@emotion/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import NeuralumeLogo from '../assets/neuralume-logo.png';
import Button from '../components/Button';
import {requestToken} from '../api';
import styled from '@emotion/native';
import styles from '../styles';

export type LogInScreenProps = {};

type Credentials = {
  email: string;
  password: string;
};

const inputStyles = css`
  font-size: 20px;
  border: 2px solid #4a4971;
  width: 100%;
  text-align: left;
  padding: 15px;
  margin: 10px 0;
  border-radius: 7px;
  color: #c5c4de;
`;

const containerStyles = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: #12112d;
`;

const logoStyles = css<ImageStyle>`
  resize-mode: contain;
  width: 70%;
`;

const ErrorText = styled.Text`
  color: #c94f4f;
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
`;

const LogInScreen: React.FC<LogInScreenProps> = () => {
  const [error, setError] = React.useState<string | null>(null);
  const {register, setValue, handleSubmit, errors} = useForm<Credentials>();

  useEffect(() => {
    register('password', {required: true, minLength: 3});
    register('email', {required: true, minLength: 3});
  }, [register]);

  const passwordRef = React.useRef<any>(null);

  const onSubmit = React.useCallback(({email, password}: Credentials) => {
    requestToken({email, password})
      .then((response) => {
        const errorMessage = response.data?.requestToken.errorMessage;
        if (errorMessage) setError(errorMessage);
      })
      .catch((reason) => {
        setError(JSON.stringify(reason));
      });
  }, []);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={containerStyles}
      keyboardShouldPersistTaps="handled">
      <StatusBar barStyle="light-content" />
      <Image source={NeuralumeLogo} style={logoStyles} />
      <TextInput
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
        blurOnSubmit={false}
        style={inputStyles}
        placeholderTextColor="#a4a3c2"
        onChangeText={(text) => setValue('email', text)}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        ref={passwordRef}
        style={inputStyles}
        placeholderTextColor="#a4a3c2"
        onChangeText={(text) => setValue('password', text)}
        secureTextEntry={true}
        onSubmitEditing={handleSubmit(onSubmit)}
        placeholder="Contraseña"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && (
        <ErrorText>
          {error === 'Invalid credentials'
            ? 'Usuario o contraseña incorrectos.'
            : error}
        </ErrorText>
      )}
      {(errors.password || errors.email) && (
        <ErrorText>
          Introduzca un nombre de usuario y contraseña válidos.
        </ErrorText>
      )}
      <Button onPress={handleSubmit(onSubmit)}>Iniciar sesión</Button>
    </KeyboardAwareScrollView>
  );
};

export default LogInScreen;
