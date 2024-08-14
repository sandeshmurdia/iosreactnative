/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import zipy from 'zipy-react-native';
zipy.init('your_api_key');

import { withGestureCapture } from 'zipy-react-native';

AppRegistry.registerComponent(appName, () => withGestureCapture(App));
