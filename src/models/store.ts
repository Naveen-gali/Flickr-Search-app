import {
  cast,
  flow,
  getSnapshot,
  Instance,
  toGenerator,
  types,
} from 'mobx-state-tree';
import {createContext} from 'react';
import {IMAGE_URL, SEARCH_METHOD, INFO_METHOD} from '../constants/urlConstants';
import {photo, PhotoType} from './photo';
import {info, InfoType} from './info';
import {GetApi} from '../api/api';

export type StoreType = Instance<typeof store>;

export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

type SearchApiResponse = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoType[];
  };
};

type InfoApiResponse = {
  photo: InfoType;
};

export const store = types
  .model('StoreModel')
  .props({
    page: types.number,
    pages: types.number,
    perpage: types.number,
    total: types.number,
    photosLoading: types.boolean,
    photos: types.optional(types.array(photo), []),
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
    getPhotos: flow(function* (
      text: string,
      perPage: number = 20,
      page: number = 1,
      newRequest: boolean = false,
    ) {
      self.photosLoading = true;
      try {
        const response = yield* toGenerator(
          GetApi<SearchApiResponse>(SEARCH_METHOD, {
            api_key: 'debb070988cf38ae1960392875f73796',
            text: text ? text : 'India',
            format: 'json',
            nojsoncallback: 1,
            per_page: perPage,
            page: !newRequest ? page : 1,
          }),
        );
        self.photos =
          self.photos && !newRequest
            ? cast(self.photos.concat(response.photos.photo))
            : cast(response.photos.photo);
        self.page = response.photos.page;
        self.pages = response.photos.pages;
        self.photosLoading = false;
      } catch (err) {
        self.error = 'Some Thing Unexpected Happened!';
      }
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
        const response = yield* toGenerator(
          GetApi<InfoApiResponse>(INFO_METHOD, {
            api_key: 'debb070988cf38ae1960392875f73796',
            photo_id,
            secret,
            format: 'json',
            nojsoncallback: 1,
          }),
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
