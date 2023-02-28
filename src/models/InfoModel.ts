import {Instance, SnapshotOut, types} from 'mobx-state-tree';

export type InfoModelType = Instance<typeof InfoModel>;
export type GiftModelType = Instance<typeof GiftModel>;
export type OwnerModelType = Instance<typeof OwnerModel>;
export type TitleModelType = Instance<typeof TitleModel>;
export type DescriptionModelType = Instance<typeof DescriptionModel>;
export type DatesModelType = Instance<typeof DatesModel>;
export type VisibilityModelType = Instance<typeof VisibilityModel>;
export type EditabilityModelType = Instance<typeof EditabilityModel>;
export type PubliceditabilityModelType = Instance<
  typeof PubliceditabilityModel
>;
export type UsageModelType = Instance<typeof UsageModel>;
export type CommentsModelType = Instance<typeof CommentsModel>;
export type PeopleModelType = Instance<typeof PeopleModel>;
export type TagModelType = Instance<typeof TagModel>;
export type UrlModelType = Instance<typeof UrlModel>;
export type NoteModelType = Instance<typeof NoteModel>;

const GiftModel = types.model({
  gift_eligible: '',
  eligible_durations: types.array(types.string),
  new_flow: '',
});

const OwnerModel = types.model({
  nsid: '',
  username: '',
  realname: '',
  location: '',
  iconserver: '',
  iconfarm: 0,
  path_alias: '',
  gift: types.optional(GiftModel, {}),
});

const TitleModel = types.model({
  _content: '',
});

const DescriptionModel = types.model({
  _content: '',
});

const DatesModel = types.model({
  posted: '',
  taken: '',
  takengranularity: 0,
  takenunknown: 0,
  lastupdate: '',
});

const VisibilityModel = types.model({
  ispublic: 0,
  isfriend: 0,
  isfamily: 0,
});

const EditabilityModel = types.model({
  cancomment: 0,
  canaddmeta: 0,
});

const PubliceditabilityModel = types.model({
  cancomment: 0,
  canaddmeta: 0,
});

const UsageModel = types.model({
  candownload: 0,
  canblog: 0,
  canprint: 0,
  canshare: 0,
});

const CommentsModel = types.model({
  _content: 0,
});

const PeopleModel = types.model({
  haspeople: 0,
});

const TagModel = types.model({
  id: '',
  author: '',
  authorname: '',
  raw: '',
  _content: '',
  machine_tag: 0,
});

const UrlModel = types.model({
  type: '',
  _content: '',
});

const NoteModel = types.model('NoteModel').props({
  id: '',
  author: '',
  authorname: '',
  x: '',
  y: '',
  w: '',
  h: '',
  _content: '',
});

export const InfoModel = types.model('InfoModel').props({
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
  owner: types.optional(OwnerModel, {}),
  title: types.optional(TitleModel, {}),
  description: types.optional(DescriptionModel, {}),
  visibility: types.optional(VisibilityModel, {}),
  dates: types.optional(DatesModel, {}),
  views: '',
  editability: types.optional(EditabilityModel, {}),
  publiceditability: types.optional(PubliceditabilityModel, {}),
  usage: types.optional(UsageModel, {}),
  comments: types.optional(CommentsModel, {}),
  notes: types.model({
    note: types.array(NoteModel),
  }),
  people: types.optional(PeopleModel, {}),
  tags: types.model({
    tag: types.array(TagModel),
  }),
  urls: types.model({
    url: types.array(UrlModel),
  }),
  media: '',
  imageurl: types.optional(
    types.string,
    'https://via.placeholder.com/600x400?text=Image+Loading',
  ),
});

export interface InfoInterface extends SnapshotOut<typeof InfoModel> {}
