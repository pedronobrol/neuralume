import * as React from 'react';
import styled from '@emotion/native';
import {RectButtonProperties, RectButton} from 'react-native-gesture-handler';
import styles from '../styles';
import {StyleProp, TextStyle} from 'react-native';

export const Container = styled(RectButton)`
  width: 100%;
  height: 55px;
  background: ${styles.colors.luckyPoint};
  border-radius: 7px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

interface ButtonProps extends Omit<RectButtonProperties, 'onPress'> {
  children: string;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  textStyle,
  ...restOfProps
}) => (
  <Container style={{borderRadius: 7, ...(style || {})}} {...restOfProps}>
    <ButtonText style={textStyle}>{children}</ButtonText>
  </Container>
);

export default Button;
