import axios from 'axios';

const ApiInstance = axios.create({
  baseURL: 'https://www.flickr.com/services/rest/',
});

export function GetApi<T>(method: string, params: {}): Promise<T> {
  return ApiInstance.get(`?method=${method}`, {
    params,
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}
