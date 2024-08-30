/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import zipy from 'zipy-react-native';
zipy.init('6d2b9556');

import { withGestureCapture } from 'zipy-react-native';


AppRegistry.registerComponent(appName, () => withGestureCapture(App));
