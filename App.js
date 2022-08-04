/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';

const App: () => Node = () => {
  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  // const [showAlert, setShowAlert] = useState(false);
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        if (err.response) {
          if (err.response.status == 404) {
            showAlert();
          }
        }
      });
    // .finally(() =>
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000),
    // );
  };

  const showAlert = () =>
    Alert.alert(
      'Pokemón No Encontrado!',
      'Porfavor intente con otro nombre',
      [
        {
          text: 'Cancel',
          onPress: () => setTimeout(() => inputRef.current.focus(), 50),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setTimeout(() => inputRef.current.focus(), 0),
      },
    );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!loading ? (
        <TextInput
          placeholder="Introduce nombre del pokemón"
          style={{borderWidth: 1, color: '#000'}}
          onChangeText={txt => setName(txt)}
          ref={inputRef}
          onSubmitEditing={() => {
            setLoading(true);
            searchPokemon();
          }}
          defaultValue={name}
        />
      ) : (
        <ActivityIndicator size="large" color="#ff0000" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
