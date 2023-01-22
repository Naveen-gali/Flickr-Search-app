import axios from "axios";
import { flow, Instance, types } from "mobx-state-tree";
import { createContext } from "react";
import { photo } from "./photo";

export type StoreType = Instance<typeof store>

export const store = types.model({
    page: types.number,
    pages: types.number,
    perpage: types.number,
    total: types.number,
    photos: types.array(photo)
}).views(self => ({
    get PageNumber(): number {
        return self.page;
    },
    get Pages():number {
        return self.pages;
    },
    get Total(): number {
        return self.total
    },
    get photosCount(): number {
        return self.photos.length;
    }
})).actions((self) => ({
    getPhotos: flow(function*(text: string) {
        const response = yield axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=debb070988cf38ae1960392875f73796&text=${text}&format=json&nojsoncallback=1`);
        console.log(response.data.photos);
        self.photos = response.data.photos.photo
    }),
    getImageUrl: (serverId: string,id: string, secret: string): string => {
        return `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`
    }
}));

export const StoreContext = createContext<StoreType>({} as StoreType)