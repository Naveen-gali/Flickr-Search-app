import {Instance, types} from 'mobx-state-tree';

export type InfoType = Instance<typeof info>;
export type GiftType = Instance<typeof gift>;
export type OwnerType = Instance<typeof owner>;
export type TitleType = Instance<typeof title>;
export type DescriptionType = Instance<typeof description>;
export type DatesType = Instance<typeof dates>;
export type VisibilityType = Instance<typeof visibility>;
export type EditabilityType = Instance<typeof editability>;
export type PubliceditabilityType = Instance<typeof publiceditability>;
export type UsageType = Instance<typeof usage>;
export type CommentsType = Instance<typeof comments>;
export type PeopleType = Instance<typeof people>;
export type TagType = Instance<typeof tag>;
export type UrlType = Instance<typeof url>;
export type NoteType = Instance<typeof note>;

const gift = types.model({
  gift_eligible: types.string,
  eligible_durations: types.array(types.string),
  new_flow: types.string,
});

const owner = types.model({
  nsid: types.string,
  username: types.string,
  realname: types.string,
  location: types.string,
  iconserver: types.string,
  iconfarm: types.number,
  path_alias: types.string,
  gift: gift,
});

const title = types.model({
  _content: types.string,
});

const description = types.model({
  _content: types.string,
});

const dates = types.model({
  posted: types.string,
  taken: types.string,
  takengranularity: types.number,
  takenunknown: types.number,
  lastupdate: types.string,
});

const visibility = types.model({
  ispublic: types.number,
  isfriend: types.number,
  isfamily: types.number,
});

const editability = types.model({
  cancomment: types.number,
  canaddmeta: types.number,
});

const publiceditability = types.model({
  cancomment: types.number,
  canaddmeta: types.number,
});

const usage = types.model({
  candownload: types.number,
  canblog: types.number,
  canprint: types.number,
  canshare: types.number,
});

const comments = types.model({
  _content: types.number,
});

const people = types.model({
  haspeople: types.number,
});

const tag = types.model({
  id: types.string,
  author: types.string,
  authorname: types.string,
  raw: types.string,
  _content: types.string,
  machine_tag: types.number,
});

const url = types.model({
  type: types.string,
  _content: types.string,
});

const note = types.model({
  id: types.string,
  author: types.string,
  authorname: types.string,
  x: types.string,
  y: types.string,
  w: types.string,
  h: types.string,
  _content: types.string,
});

export const info = types.model({
  id: types.string,
  secret: types.string,
  server: types.string,
  farm: types.number,
  dateuploaded: types.string,
  isfavorite: types.number,
  license: types.number,
  safety_level: types.number,
  rotation: types.number,
  originalsecret: types.string,
  originalformat: types.string,
  owner: owner,
  title: title,
  description: description,
  visibility: visibility,
  dates: dates,
  views: types.string,
  editability: editability,
  publiceditability: publiceditability,
  usage: usage,
  comments: comments,
  notes: types.model({
    note: types.array(note),
  }),
  people: people,
  tags: types.model({
    tag: types.array(tag),
  }),
  urls: types.model({
    url: types.array(url),
  }),
  media: types.string,
});
