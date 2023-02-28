import {SnapshotOut, types} from 'mobx-state-tree';

export const PhotoModel = types
  .model('PhotoModel')
  .props({
    id: types.identifier,
    owner: types.string,
    secret: types.string,
    server: types.string,
    farm: types.number,
    title: types.string,
    ispublic: types.integer,
    isfriend: types.integer,
    isfamily: types.integer,
    imageurl: types.optional(types.string, ''),
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
  }));

export interface PhotoInterface extends SnapshotOut<typeof PhotoModel> {}
