import React, { useState, useContext } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../App';

const ApiScreen: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isDarkTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const fetchApi = async (url: string, fail = false) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(url);
      if (fail || !response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const postApi = async (url: string, body: any, fail = false) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (fail || !response.ok) throw new Error('Failed to post data');
      const result = await response.json();
      setData([result]);
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
      <Text style={[styles.header, { color: isDarkTheme ? '#FF4081' : '#3F51B5' }]}>API Calls</Text>
      
      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id?.toString() || item.title || item.body}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: isDarkTheme ? '#333' : '#f0f0f0' }]}>
              <Text style={[styles.itemTitle, { color: isDarkTheme ? '#FFC107' : '#FF4081' }]}>{item.title || 'Untitled'}</Text>
              <Text style={[styles.itemBody, { color: isDarkTheme ? '#FFEB3B' : '#3F51B5' }]}>{item.body}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={() => fetchApi('https://jsonplaceholder.typicode.com/posts')}>
          <Text style={styles.buttonText}>GET Success</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5722' }]} onPress={() => fetchApi('https://jsonplaceholder.typicode.com/invalid-endpoint', true)}>
          <Text style={styles.buttonText}>GET Fail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => postApi('https://jsonplaceholder.typicode.com/posts', { title: 'foo', body: 'bar', userId: 1 })}>
          <Text style={styles.buttonText}>POST Success</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#9C27B0' }]} onPress={() => postApi('https://jsonplaceholder.typicode.com/invalid-endpoint', { title: 'foo', body: 'bar', userId: 1 }, true)}>
          <Text style={styles.buttonText}>POST Fail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemBody: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  goBackButton: {
    backgroundColor: '#FF4081',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApiScreen;
