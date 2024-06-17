import * as React from 'react';
import {css} from '@emotion/native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {GestureResponderEvent} from 'react-native';

export type ListItemProps = {
  onPress: (event: GestureResponderEvent) => void;
};

const itemStyles = css`
  padding: 20px;
  margin: 10px 0;
  border-radius: 7px;
  border: 1px solid rgb(238, 229, 237);
  background-color: white;
  box-shadow: rgba(200, 200, 200, 0.5) 0px 3px 5px;
`;

const ListItem: React.FC<ListItemProps> = ({children, onPress}) => {
  return (
    <TouchableHighlight
      style={itemStyles}
      onPress={onPress}
      underlayColor="#f3f1f5">
      {children}
    </TouchableHighlight>
  );
};

export default ListItem;
