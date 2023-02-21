import {ImageType} from '../constants';
import {IMAGE_URL} from '../constants';
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

function getPhotos<T>(
  text: string,
  perPage: number,
  page: number,
  newRequest: boolean,
): Promise<T> {
  return GetApi<T>(ApiMethods.SEARCH_METHOD, {
    text: text ? text : 'India',
    per_page: perPage,
    page: !newRequest ? page : 1,
  });
}

export {getImageUrl, getPhotos};
