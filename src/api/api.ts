import axios from 'axios';
import {BASE_URL} from '../constants/urlConstants';

const ApiInstance = axios.create({
  baseURL: BASE_URL,
});

ApiInstance.interceptors.request.use(
  function (config) {
    config.params = {
      api_key: 'debb070988cf38ae1960392875f73796',
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

// ApiInstance.interceptors.response.use(
//   function (response) {
//     // Logging REsponse and going further
//     console.log('INTERCEPTOR RES :_ ', response);

//     return response.data.photos;
//   },
//   function (error) {
//     return error;
//   },
// );

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
