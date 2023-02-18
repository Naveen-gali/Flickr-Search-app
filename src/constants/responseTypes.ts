import {InfoType} from '../models/Info';
import {PhotoType} from '../models/Photo';

export type SearchApiResponse = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoType[];
  };
  stat: 'ok';
};

export type ErrorResponse = {
  stat: 'fail';
  code: number;
  message: string;
};

export type InfoApiResponse = {
  photo: InfoType;
};
