import * as React from 'react';
import styled from '@emotion/native';
import Button from '../components/Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const AuthProviderErrorScreen: React.FC<{triggerReload: () => void}> = ({
  triggerReload,
}) => {
  return (
    <Container>
      <ErrorText>
        Ha ocurrido un error al tratar de conectarse al servidor. Por favor,
        espere unos instantes e inténtelo de nuevo.
      </ErrorText>
      <Button onPress={triggerReload}>Reintentar</Button>
    </Container>
  );
};

export default AuthProviderErrorScreen;
