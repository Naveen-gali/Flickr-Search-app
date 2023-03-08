import {ImageType} from '../constants';
import {IMAGE_URL, GetPhotosResponse, ErrorResponse} from '../constants';
import {ApiMethods} from '../api/apiMethods';
import {GetApi} from '../api/api';

function getImageUrl(
  serverId: string,
  id: string,
  secret: string,
  type: ImageType = ImageType.MEDIUM_500_px,
): string {
  return `${IMAGE_URL}${serverId}/${id}_${secret}${type}.jpg`;
}

function getPhotos(text: string, perPage: number, page: number) {
  return GetApi<GetPhotosResponse | ErrorResponse>(ApiMethods.SEARCH_METHOD, {
    text: text,
    per_page: perPage,
    page: page !== 1 ? page : 1,
  }).then(res => {
    if (res.stat === 'ok') {
      res.photos.photo.map(
        a =>
          (a.imageurl = getImageUrl(
            a.server,
            a.id,
            a.secret,
            ImageType.MEDIUM_500_px,
          )),
      );
    }
    return res;
  });
}

export {getImageUrl, getPhotos};
