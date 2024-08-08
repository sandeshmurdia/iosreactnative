/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button, // Import Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import zipy from 'zipyai-react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// Define the button handlers
const handleButton1Click = () => {
  zipy.logMessage({message: 'Your custom message', exceptionObj: {'custom key': 'Your custom message'}});
};

const handleButton2Click = () => {
  zipy.logException({message: 'Your custom message', exceptionObj: {'custome key': 'Your custom message'}});
  // Sentry.nativeCrash();
};

const handleButton3Click = async () => {
  const url = 'https://mobilecollector.zipy.ai/';
  try {
    const response = await fetch(url + 'post', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI2MDc1NDV9.gkx_shFwp_XW6XsqC5ZRXXfSlrN-FjS_Y2o1aciqFP4',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        battery_status: '100%',
        charging_status: 'false',
        date: '10:7:2024',
        device_orientation: 'portrait',
        eventType: 'Contextual_INFO',
        free_storage: '23GB',
        ipAddress: '106.51.85.238',
        location: 'Bengaluru, Karnataka, India',
        time: '17:30:23',
        total_memory: '3771MB',
        total_storage: '50GB',
        used_memory: '262MB',
      }),
    });
    const jsonResponse = await response.json();
    console.log('Response:', jsonResponse);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const handleButton4Click = () => {
  // Try to access an undefined variable (reference error)
  let d = e;
  // console.error(error);
};

const handleButton5Click = () => {
  console.log('ddd');
  const url = 'https://mobilecollector.zipy.ai/mobile-service/verify/e100d24c';
  const headers = {
    'X-Custom-Header': 'Custom-Header-Value',
    Authorization: 'Bearer YourAccessToken',
    'Content-Type': 'application/json', 
  };
  const options = {
    method: 'GET',
    headers,
  };
  fetch(url, options)
    .then(response => response.json())
    .then(json => console.log('Response:', json))
    .catch(error => console.error('An error occurred:', error));
  // throw new Error('My first Sentry error!');
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Button 1" onPress={handleButton1Click} />
          <Button title="Button 2" onPress={handleButton2Click} />
          <Button title="Button 3" onPress={handleButton3Click} />
          <Button title="Button 4" onPress={handleButton4Click} />
          <Button title="Button 5" onPress={handleButton5Click} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
