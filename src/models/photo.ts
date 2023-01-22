import { Instance, types } from "mobx-state-tree";

export type PhotoType = Instance<typeof photo>

export const photo = types.model({
    id: types.identifier,
    owner: types.string,
    secret: types.string,
    server: types.string,
    farm: types.number,
    title: types.string,
    ispublic: types.integer,
    isfriend: types.integer,
    isfamily: types.integer
}).views(self => ({
    isPublic(): boolean {
        return self.ispublic === 1 ? true : false;
    },
    isFriend(): boolean {
        return self.isfriend === 1 ? true : false;
    },
    isFamily(): boolean {
        return self.isfamily === 1 ? true : false;
    }
}))