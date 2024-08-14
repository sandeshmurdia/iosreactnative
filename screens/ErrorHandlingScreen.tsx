import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const ErrorHandlingScreen: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const triggerUnhandledError = () => {
    const obj = undefined;
    console.log(obj.name); // Attempting to access a property of an undefined object
  };

  const triggerHandledError = () => {
    try {
      const userInput = JSON.parse('Invalid JSON String'); // Trying to parse invalid JSON
    } catch (error) {
      console.error('Handled Error:', error);
      alert('Handled error logged');
    }
  };

  const triggerSyntaxError = () => {
    try {
      eval('const test = { name: "Test", };'); // Extra comma can cause a syntax error in older JS engines
    } catch (error) {
      console.error('Syntax Error:', error);
      alert('Syntax error logged');
    }
  };  

  const triggerTypeError = () => {
    try {
      const num = 42;
      num(); // Trying to call a number as if it were a function
    } catch (error) {
      console.error('Type Error:', error);
      alert('Type error logged');
    }
  };
  

  const triggerRangeError = () => {
    try {
      const arr = new Array(-1); // Invalid array length
    } catch (error) {
      console.error('Range Error:', error);
      alert('Range error logged');
    }
  };
  
  const triggerUnhandledPromiseRejection = () => {
    fetch('https://nonexistenturl.com/api') // Simulate a failed network request
      .then(response => response.json());
  };
  

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>Error Handling</Text>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={triggerHandledError}>
        <Text style={styles.buttonText}>Handled Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5722' }]} onPress={triggerUnhandledError}>
        <Text style={styles.buttonText}>Unhandled Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={triggerSyntaxError}>
        <Text style={styles.buttonText}>Syntax Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0' }]} onPress={triggerTypeError}>
        <Text style={styles.buttonText}>Type Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC107' }]} onPress={triggerRangeError}>
        <Text style={styles.buttonText}>Range Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4081' }]} onPress={triggerUnhandledPromiseRejection}>
        <Text style={styles.buttonText}>Unhandled Promise Rejection</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#607D8B',
    marginTop: 20,
  },
});

export default ErrorHandlingScreen;
