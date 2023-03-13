import {Pallete} from './pallete';

// const Colors = {
//   DEFAULT_AVATAR_COLOR: '#D3D3D3',
//   BLACK: '#000000',
//   GREY: '#D3D3D9',
//   LIGHT_GREY: '#DDDBDB',
//   LIGHT_WHITE: '#EBEBEB',
//   RED: '#FF0000',
//   BLUE: '#0000FF',
//   BTN_BLUE: '#3178c6',
// };

const LightTheme = {
  dark: false,
  colors: {
    primary: Pallete.primary1,
    onPrimary: Pallete.onPrimary1,
    secondary: Pallete.secondary1,
    onSecondary: Pallete.onSecondary,
    background: Pallete.background1,
    onBackground: Pallete.backgroundText1,
    tagBackground: Pallete.tag1,
    onTagBackground: Pallete.tagText1,
    card: Pallete.cardBackground1,
    heading: Pallete.heading1,
    notification: Pallete.notification1,
    border: Pallete.border1,
    text: Pallete.text1,
    searchBar: Pallete.searchBar1,
    placeholder: Pallete.onSearchBar1,
    disabledBtn: Pallete.disabledBtn,
    onDisabledBtn: Pallete.onDisabledBtn,
    input: Pallete.input,
    activeInputBottom: Pallete.activeInput,
    inactiveInputBottom: Pallete.inactiveInput,
    disabledInput: Pallete.disabledInput,
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: Pallete.primary2,
    onPrimary: Pallete.onPrimary2,
    secondary: Pallete.secondary2,
    onSecondary: Pallete.onSecondary,
    background: Pallete.background2,
    onBackground: Pallete.backgroundText2,
    tagBackground: Pallete.tag2,
    onTagBackground: Pallete.tagText2,
    card: Pallete.cardBackground2,
    heading: Pallete.heading2,
    notification: Pallete.notification2,
    border: Pallete.border2,
    text: Pallete.text2,
    searchBar: Pallete.searchBar2,
    placeholder: Pallete.onSearchBar2,
    disabledBtn: Pallete.disabledBtn,
    onDisabledBtn: Pallete.onDisabledBtn,
    input: Pallete.input,
    activeInputBottom: Pallete.activeInput,
    inactiveInputBottom: Pallete.inactiveInput,
    disabledInput: Pallete.disabledInput,
  },
};

export {LightTheme, DarkTheme};
