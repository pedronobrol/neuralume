import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import AuthProviderErrorScreen from '../screens/AuthProviderError';
import {useHasValidSession, useValidateSession} from '../api/auth/hooks';

export interface LoadingAuthStatus {
  completed: boolean;
  error: string | null;
}

const RootRoutes: React.FC = () => {
  const {loading, error, triggerReload} = useValidateSession();
  const hasValidSession = useHasValidSession();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (error !== undefined) {
    return <AuthProviderErrorScreen triggerReload={triggerReload} />;
  }

  return hasValidSession ? <AppRoutes /> : <AuthRoutes />;
};

export default RootRoutes;
