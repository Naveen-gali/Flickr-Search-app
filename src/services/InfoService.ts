import {GetApi} from '../api/api';
import {ApiMethods} from '../api/apiMethods';
import {InfoApiResponse} from '../constants';
import {getImageUrl} from './PhotoServices';

function getImageInfo(photo_id: string, secret: string) {
  return GetApi<InfoApiResponse>(ApiMethods.INFO_METHOD, {
    photo_id,
    secret,
  }).then(res => {
    res.photo.imageurl = getImageUrl(
      res.photo.server,
      res.photo.id,
      res.photo.secret,
    );

    return res;
  });
}

export {getImageInfo};
