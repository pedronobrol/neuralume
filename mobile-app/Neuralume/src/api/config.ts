export const API_URL: string = (function (): string {
  if (__DEV__) {
    return 'http://192.168.8.109:8000/api/v1/gql';
  } else {
    return 'https://api.neuralume.com/api/v1/gql';
  }
})();
