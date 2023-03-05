import LocalizedStrings from 'react-native-localization';
import * as en from './en.json';
import * as it from './it.json';

export const Strings = new LocalizedStrings<typeof en | typeof it>({
  'en-US': en,
  it: it,
});
