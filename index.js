/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNBootSplash from "react-native-bootsplash";

RNBootSplash.hide({fade: true,duration: 500})

AppRegistry.registerComponent(appName, () => App);
