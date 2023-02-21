import {ImageType} from '../constants/enums';
import {IMAGE_URL} from '../constants/urlConstants';

export function getImageUrl(
  serverId: string,
  id: string,
  secret: string,
  type: ImageType = ImageType.MEDIUM_500_px,
): string {
  return `${IMAGE_URL}${serverId}/${id}_${secret}${type}.jpg`;
}
