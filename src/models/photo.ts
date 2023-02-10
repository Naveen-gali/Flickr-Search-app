import axios from 'axios';
import {flow, Instance, types} from 'mobx-state-tree';

export type PhotoType = Instance<typeof photo>;

export const photo = types
  .model({
    id: types.identifier,
    owner: types.string,
    secret: types.string,
    server: types.string,
    farm: types.number,
    title: types.string,
    ispublic: types.integer,
    isfriend: types.integer,
    isfamily: types.integer,
  })
  .views(self => ({
    isPublic(): boolean {
      return self.ispublic === 1 ? true : false;
    },
    isFriend(): boolean {
      return self.isfriend === 1 ? true : false;
    },
    isFamily(): boolean {
      return self.isfamily === 1 ? true : false;
    },
  }))
  //   .actions(self => ({
  .actions(() => ({
    getImageInfo: flow(function* (photo_id: string, secret: string) {
      const response = yield axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=debb070988cf38ae1960392875f73796&photo_id=${photo_id}&secret=${secret}&format=json&nojsoncallback=1`,
        )
        .then(
          res => {
            return res.data.photo.owner.username;
          },
          err => {
            console.log('ERR :_ ', err);
          },
        );

      return response;
    }),
  }));
