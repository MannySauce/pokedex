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
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL, DEFAULT_SPRITE} from './globals/base_urls';
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
  const [pokemon, setPokemon] = useState({});
  const inputRef = useRef(null);

  const searchPokemon = () => {
    axios
      .get(BASE_URL + name)
      .then(res => {
        const data = {...res.data};
        let tempPokemon = {
          nombre: data.name,
          peso: data.weight,
          altura: data.height * 10,
          imgs: [
            data.sprites.front_default || DEFAULT_SPRITE,
            data.sprites.back_default || DEFAULT_SPRITE,
          ],
          id: data.id,
        };
        setPokemon(tempPokemon);
      })
      .catch(err => {
        setLoading(false);
        if (err.response) {
          if (err.response.status == 404) {
            showAlert();
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!loading ? (
        <View>
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View
                style={{
                  height: 600,
                  backgroundColor: '#ff0000',
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  paddingTop: 60,
                }}>
                <View
                  style={{
                    marginLeft: 20,
                    flex: 0.8,
                    height: 120,
                    backgroundColor: '#fff',
                    borderWidth: 6,
                    borderColor: '#000',
                  }}>
                  <Image
                    source={
                      pokemon.imgs
                        ? {uri: pokemon.imgs[0]}
                        : {uri: DEFAULT_SPRITE}
                    }
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Nombre: {pokemon.nombre}
                  </Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Peso: {pokemon.peso} lbs
                  </Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Mide: {pokemon.altura} cm
                  </Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Id: {pokemon.id}
                  </Text>
                </View>
                <View>
                  <Text></Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#ff0000" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
