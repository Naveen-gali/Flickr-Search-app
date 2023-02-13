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
  gift_eligible: '',
  eligible_durations: types.array(types.string),
  new_flow: '',
});

const owner = types.model({
  nsid: '',
  username: '',
  realname: '',
  location: '',
  iconserver: '',
  iconfarm: 0,
  path_alias: '',
  gift: types.optional(gift, {}),
});

const title = types.model({
  _content: '',
});

const description = types.model({
  _content: '',
});

const dates = types.model({
  posted: '',
  taken: '',
  takengranularity: 0,
  takenunknown: 0,
  lastupdate: '',
});

const visibility = types.model({
  ispublic: 0,
  isfriend: 0,
  isfamily: 0,
});

const editability = types.model({
  cancomment: 0,
  canaddmeta: 0,
});

const publiceditability = types.model({
  cancomment: 0,
  canaddmeta: 0,
});

const usage = types.model({
  candownload: 0,
  canblog: 0,
  canprint: 0,
  canshare: 0,
});

const comments = types.model({
  _content: 0,
});

const people = types.model({
  haspeople: 0,
});

const tag = types.model({
  id: '',
  author: '',
  authorname: '',
  raw: '',
  _content: '',
  machine_tag: 0,
});

const url = types.model({
  type: '',
  _content: '',
});

const note = types.model('NoteModel').props({
  id: '',
  author: '',
  authorname: '',
  x: '',
  y: '',
  w: '',
  h: '',
  _content: '',
});

export const info = types.model('InfoModel').props({
  id: '',
  secret: '',
  server: '',
  farm: 0,
  dateuploaded: '',
  isfavorite: '',
  license: '',
  safety_level: '',
  rotation: 0,
  originalsecret: '',
  originalformat: '',
  owner: types.optional(owner, {}),
  title: types.optional(title, {}),
  description: types.optional(description, {}),
  visibility: types.optional(visibility, {}),
  dates: types.optional(dates, {}),
  views: '',
  editability: types.optional(editability, {}),
  publiceditability: types.optional(publiceditability, {}),
  usage: types.optional(usage, {}),
  comments: types.optional(comments, {}),
  notes: types.model({
    note: types.array(note),
  }),
  people: types.optional(people, {}),
  tags: types.model({
    tag: types.array(tag),
  }),
  urls: types.model({
    url: types.array(url),
  }),
  media: '',
});
