/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import zipy from 'zipyai-react-native';
zipy.init('e100d24c');

import { withGestureCapture } from 'zipyai-react-native';

AppRegistry.registerComponent(appName, () => withGestureCapture(App));
