import {GetApi} from '../api/api';
import {ApiMethods} from '../api/apiMethods';

function getImageInfo<T>(photo_id: string, secret: string): Promise<T> {
  return GetApi<T>(ApiMethods.INFO_METHOD, {
    photo_id,
    secret,
  });
}

export {getImageInfo};
