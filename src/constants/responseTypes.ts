import {InfoInterface} from '../models/InfoModel';
import {PhotoInterface} from '../models/PhotoModel';

type GetPhotosResponse = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoInterface[];
  };
  stat: 'ok';
};

type ErrorResponse = {
  stat: 'fail';
  code: number;
  message: string;
};

type InfoApiResponse = {
  photo: InfoInterface;
};

export type {GetPhotosResponse, ErrorResponse, InfoApiResponse};
