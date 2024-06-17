import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import store from '../../store';
import {validateSession} from './actions';

type AuthProviderState = {
  loading: boolean;
  error?: string;
};

type TAuthProvider = AuthProviderState & {
  hasValidSession?: boolean;
  triggerReload: () => void;
  reloadRequests: number;
};

export function useValidateSession() {
  const [state, setState] = useState<AuthProviderState>({loading: true});
  const [reloadRequestCounter, setReloadRequestCounter] = useState<number>(0);

  useEffect(() => {
    setState({loading: true});
    validateSession()
      .then(() => setState({loading: false}))
      .catch((reason) =>
        setState({
          loading: false,
          error: reason.message,
        }),
      );
  }, [reloadRequestCounter]);

  function triggerReload() {
    setReloadRequestCounter(1 + reloadRequestCounter);
  }

  return {
    ...state,
    triggerReload,
  };
}

export function useHasValidSession(): boolean {
  return useSelector<RootState, boolean>(
    (state): boolean => state.session.authToken !== null,
  );
}
