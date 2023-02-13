import {flow, getSnapshot, Instance, types} from 'mobx-state-tree';
import {createContext} from 'react';
import flickr from '../api/flickr';
import {IMAGE_URL, SEARCH_METHOD, INFO_METHOD} from '../constants/urlConstants';
import {photo} from './photo';
import {info} from './info';

export type StoreType = Instance<typeof store>;

export const store = types
  .model('StoreModel')
  .props({
    page: types.number,
    pages: types.number,
    perpage: types.number,
    total: types.number,
    photosLoading: types.boolean,
    photos: types.array(photo),
    info: types.frozen(
      getSnapshot(
        info.create({notes: {note: []}, tags: {tag: []}, urls: {url: []}}),
      ),
    ),
    infoLoading: types.boolean,
    error: types.string,
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
    changeLoading(type: 'photos' & 'info', value: boolean) {
      if (type === 'photos') {
        self.photosLoading = value;
      } else {
        self.infoLoading = value;
      }
    },
  }))
  .actions(self => ({
    getPhotos: flow(function* (text: string, perPage: number = 20) {
      self.photosLoading = true;
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
      self.photosLoading = false;
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
    getImageInfo: flow(function* (photo_id: string, secret: string) {
      self.infoLoading = true;
      try {
        const response = yield flickr.get(`/?method=${INFO_METHOD}`, {
          params: {
            api_key: 'debb070988cf38ae1960392875f73796',
            photo_id,
            secret,
            format: 'json',
            nojsoncallback: 1,
          },
        });
        self.info = response.data.photo;
        self.infoLoading = false;
      } catch (err) {
        self.infoLoading = false;
        self.error = 'SomeThing Unexpected Happened!';
      }
    }),
  }));

export const StoreContext = createContext<StoreType>({} as StoreType);
