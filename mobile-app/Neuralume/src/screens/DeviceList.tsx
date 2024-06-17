import {gql, useQuery} from '@apollo/client';
import {css} from '@emotion/native';
import * as React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';

export type DeviceListScreenProps = {};

const itemContainerStyles = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const deviceNameStyles = css`
  font-size: 18px;
`;

const statsStyles = css`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const statsTextStyles = css`
  font-size: 16px;
  margin-left: 10px;
`;

const Item = ({label, currentAverage}) => (
  <ListItem onPress={() => console.log('hello')}>
    <View style={itemContainerStyles}>
      <Text style={deviceNameStyles}>{label}</Text>
      {currentAverage && (
        <View style={statsStyles}>
          <Text style={statsTextStyles}>{parseInt(currentAverage)} ppm</Text>
        </View>
      )}
    </View>
  </ListItem>
);

export const GET_BOARD_LIST = gql`
  query getProfile {
    myUser {
      profile {
        boards {
          id
          label
          currentAverage(magnitude: CO2)
          lastWeekAverage(magnitude: CO2)
        }
      }
    }
  }
`;

const renderItem = ({item, ...props}) => <Item {...item} {...props} />;

const listStyles = css`
  width: 100%;
  min-height: 100%;
  padding: 0 20px;
`;

const containerStyles = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const DeviceListScreen: React.FC<DeviceListScreenProps> = () => {
  const {error, loading, data} = useQuery<{
    myUser: {
      profile: {
        boards: {
          id: string;
          label: string;
          currentAverage: number;
          lastWeekAverage: number;
        }[];
      } | null;
    };
  }>(GET_BOARD_LIST);

  const parsedData = data?.myUser.profile?.boards;

  return (
    <View style={containerStyles}>
      <Text
        style={{
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}>
        Para ver gráficas detalladas de los dispositivos, acceda a la plataforma
        online Neuralume Cloud.
      </Text>
      <FlatList
        style={listStyles}
        data={parsedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DeviceListScreen;
