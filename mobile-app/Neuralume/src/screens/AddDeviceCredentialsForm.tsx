import {css} from '@emotion/native';
import * as React from 'react';
import {ActivityIndicator, Image, ImageStyle, Text, View} from 'react-native';
import NebulaImage from '../assets/nebula.png';
import Button from '../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import styles from '../styles';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';

type AddDeviceCredentialsFormScreenNavigationProp = StackNavigationProp<{}>;

export type AddDeviceCredentialsFormScreenProps = {
  navigation: AddDeviceCredentialsFormScreenNavigationProp;
};

const containerStyles = css`
  padding: 20px 20px;
`;

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

const AddDeviceCredentialsFormScreen: React.FC<AddDeviceCredentialsFormScreenProps> = ({
  navigation,
}) => {
  const [status, setStatus] = React.useState<{
    error: string | undefined;
    loading: boolean;
  }>({error: undefined, loading: false});

  const {register, setValue, handleSubmit, errors} = useForm<{
    ssid: string;
    password: string;
  }>();

  React.useEffect(() => {
    register('ssid', {required: true, minLength: 3});
    register('password', {required: true, minLength: 3});
  }, [register]);

  const passwordRef = React.useRef<any>(null);

  const onSubmit = React.useCallback(
    ({ssid, password}: {ssid: string; password: string}) => {
      console.log('submitted');
      setStatus({error: undefined, loading: true});
      axios
        .get(`http://192.168.4.1/?ssid=${ssid}&password=${password}`, {
          timeout: 2000,
        })
        .then((response) => {
          setStatus({
            error: JSON.stringify(response),
            loading: false,
          });
        })
        .catch((reason) =>
          setStatus({
            error:
              'No hemos podido conectarnos al dispositivo Nébula. Inténtelo de nuevo.',
            loading: false,
          }),
        );
    },
    [],
  );

  return (
    <ScrollView style={containerStyles}>
      <TextInput
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
        blurOnSubmit={false}
        style={inputStyles}
        placeholderTextColor="#a4a3c2"
        onChangeText={(text) => setValue('ssid', text)}
        placeholder="SSID"
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
      <Button onPress={handleSubmit(onSubmit)}>Continuar</Button>

      {status.loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      )}
      {!status.loading && status.error && (
        <>
          <View
            style={{
              marginTop: 20,
              backgroundColor: styles.colors.salmon,
              borderColor: styles.colors.salmon,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{color: styles.colors.luckyPoint, fontSize: 16}}>
              {status.error}
            </Text>
          </View>
          <Text style={{marginTop: 20, fontSize: 14}}>
            Asegúrese de que su dispositivo está enchufado y que su smartphone
            esta conectado a la red Nébula. Si tiene problemas en la
            instalación, puede contactar con nuestro servicio de atención al
            cliente en contact@neuralume.com
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default AddDeviceCredentialsFormScreen;
