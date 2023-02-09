import {flow, Instance, types} from 'mobx-state-tree';
import {createContext} from 'react';
import flickr from '../api/flickr';
import {IMAGE_URL, SEARCH_METHOD} from '../constants/urlConstants';
import {photo} from './photo';

export type StoreType = Instance<typeof store>;

export const store = types
  .model({
    page: types.number,
    pages: types.number,
    perpage: types.number,
    total: types.number,
    isLoading: types.boolean,
    photos: types.array(photo),
  })
  .views(self => ({
    get PageNumber(): number {
      return self.page;
    },
    get Pages(): number {
      return self.pages;
    },
    get Total(): number {
      return self.total;
    },
    get photosCount(): number {
      return self.photos.length;
    },
    get loading(): boolean {
      return self.isLoading;
    },
    setIsLoading(state: boolean) {
      self.isLoading = state;
    },
  }))
  .actions(self => ({
    getPhotos: flow(function* (text: string, perPage: number = 20) {
      self.setIsLoading(true);
      // const response = yield axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=debb070988cf38ae1960392875f73796&text=${text}&format=json&nojsoncallback=1`);
      const response = yield flickr.get(`?method=${SEARCH_METHOD}`, {
        params: {
          api_key: 'debb070988cf38ae1960392875f73796',
          text: text,
          format: 'json',
          nojsoncallback: 1,
          per_page: perPage,
        },
      });
      self.setIsLoading(false);
      console.log('PHOTOS : ', response.data.photos);
      self.photos = response.data.photos.photo;
    }),
    getImageUrl: (
      serverId: string,
      id: string,
      secret: string,
      thumbnail?: boolean,
    ): string => {
      return `${IMAGE_URL}${serverId}/${id}_${secret}${
        thumbnail ? '_w' : ''
      }.jpg`;
    },
  }));

export const StoreContext = createContext<StoreType>({} as StoreType);
