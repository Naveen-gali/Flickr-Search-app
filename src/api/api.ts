import axios from 'axios';
import Config from 'react-native-config';

const ApiInstance = axios.create({
  baseURL: Config.BASE_URL,
});

ApiInstance.interceptors.request.use(
  function (config) {
    config.params = {
      api_key: Config.API_KEY,
      format: 'json',
      nojsoncallback: 1,
      ...config.params,
    };
    return config;
  },
  function (error) {
    throw error;
  },
);

export function GetApi<T>(method: string, params: {}): Promise<T> {
  return ApiInstance.get(`?method=${method}`, {
    params,
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      if (err.response) {
        throw (err.message = 'Some Weird Happened!');
      } else if (err.request) {
        throw (err.message = 'Bad Network Error!');
      } else {
        throw (err.message = 'Some Thing Happened!');
      }
    });
}
