import {css} from '@emotion/native';
import * as React from 'react';
import {ActivityIndicator, Image, ImageStyle, Text, View} from 'react-native';
import NebulaImage from '../assets/nebula.png';
import Button from '../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import styles from '../styles';
import {ScrollView} from 'react-native-gesture-handler';

type AddDeviceScreenNavigationProp = StackNavigationProp<{
  AddDeviceCredentialsForm: undefined;
}>;

export type AddDeviceScreenProps = {
  navigation: AddDeviceScreenNavigationProp;
};

const containerStyles = css`
  padding: 20px 20px;
`;

const AddDeviceScreen: React.FC<AddDeviceScreenProps> = ({navigation}) => {
  const [status, setStatus] = React.useState<{
    error: string | undefined;
    loading: boolean;
  }>({error: undefined, loading: false});
  const continueAddDevice = () => {
    setStatus({error: undefined, loading: true});
    axios
      .get('http://192.168.4.1/verify', {timeout: 2000})
      .then((response) => {
        setStatus({loading: false, error: undefined});
        navigation.navigate('AddDeviceCredentialsForm');
      })
      .catch((reason) =>
        setStatus({
          error:
            'No hemos podido conectarnos al dispositivo Nébula. Inténtelo de nuevo.',
          loading: false,
        }),
      );
  };

  return (
    <ScrollView style={containerStyles}>
      <View style={{alignItems: 'center', marginBottom: 30}}>
        <Image
          source={NebulaImage}
          style={{resizeMode: 'contain', height: 100}}
        />
      </View>
      <Text style={{fontSize: 16, marginBottom: 25}}>
        1. Enchufe su dispositivo Nébula a la corriente y espere a que la luz se
        ponga azul.
      </Text>
      <Text style={{fontSize: 16, marginBottom: 10}}>
        2. Conéctese con su teléfono móvil a la red Wi-Fi del dispositivo
        ('Nébula') yendo a los ajustes de su smartphone.
      </Text>
      <Text style={{fontSize: 16, marginBottom: 25}}>
        La contraseña de la red se encuentra en la caja del dispositivo.
      </Text>
      <Text style={{fontSize: 16, marginBottom: 25}}>
        3. Una vez esté conectado, pulse el botón de continuar
      </Text>
      <Button onPress={continueAddDevice}>Continuar</Button>

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

export default AddDeviceScreen;
