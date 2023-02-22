import {InfoModelType} from '../models/InfoModel';
import {PhotoModelType} from '../models/PhotoModel';

type GetPhotosResponse = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoModelType[];
  };
  stat: 'ok';
};

type ErrorResponse = {
  stat: 'fail';
  code: number;
  message: string;
};

type InfoApiResponse = {
  photo: InfoModelType;
};

export type {GetPhotosResponse, ErrorResponse, InfoApiResponse};
