import {
  cast,
  flow,
  getSnapshot,
  Instance,
  toGenerator,
  types,
} from 'mobx-state-tree';
import {createContext} from 'react';
import {PhotoModel} from './PhotoModel';
import {InfoModel} from './InfoModel';
import {InfoServices, PhotoServices} from '../services';

export type StoreType = Instance<typeof store>;

export const store = types
  .model('StoreModel')
  .props({
    page: types.number,
    pages: types.number,
    perpage: types.number,
    total: types.number,
    photosLoading: types.boolean,
    photos: types.optional(types.array(PhotoModel), []),
    info: types.frozen(
      getSnapshot(
        InfoModel.create({notes: {note: []}, tags: {tag: []}, urls: {url: []}}),
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
    getPhotos: flow(function* (
      text: string,
      perPage: number = 30,
      page: number = 1,
    ) {
      self.photosLoading = true;
      try {
        const response = yield* toGenerator(
          PhotoServices.getPhotos(text, perPage, page),
        );
        if (response.stat === 'ok') {
          self.photos =
            self.photos && page !== 1
              ? cast(self.photos.concat(response.photos.photo))
              : cast(response.photos.photo);
          self.page = response.photos.page;
          self.pages = response.photos.pages;
          console.log('RES :_ ', response.photos.photo);
        } else {
          self.error = response.message;
          console.log('ERR :_ ', response.message);
          self.photosLoading = false;
        }
      } catch (err) {
        console.log('ERRR :_ ', err);

        self.error = 'Some Thing Unexpected Happened!';
      } finally {
        self.photosLoading = false;
      }
    }),
    getImageInfo: flow(function* (photo_id: string, secret: string) {
      self.infoLoading = true;
      try {
        const response = yield* toGenerator(
          InfoServices.getImageInfo(photo_id, secret),
        );
        self.info = response.photo;

        self.infoLoading = false;
      } catch (err) {
        self.infoLoading = false;
        self.error = 'SomeThing Unexpected Happened!';
      }
    }),
  }));

export const StoreContext = createContext<StoreType>({} as StoreType);
