/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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

  const searchPokemon = () => {
    console.log('entered');
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(function (response) {
        console.log(response);
      });
  };
  console.log(name);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput
        placeholder="Introduce nombre del pokemón"
        style={{borderWidth: 1, color: '#000'}}
        onChangeText={txt => setName(txt)}
        onSubmitEditing={() => {
          searchPokemon();
        }}
        defaultValue={name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
