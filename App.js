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
        // const data = {...res.data};
        // let tempPokemon = {
        //   nombre: data.name,
        //   peso: data.weight,
        //   altura: data.height * 10,
        //   imgs: [
        //     data.sprites.front_default || DEFAULT_SPRITE,
        //     data.sprites.back_default || DEFAULT_SPRITE,
        //   ],
        //   id: data.id,
        // };
        setPokemon(res.data);
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
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Introduce nombre del pokemón"
              style={{height: 60, borderWidth: 1, color: '#000'}}
              onChangeText={txt => setName(txt)}
              ref={inputRef}
              onSubmitEditing={() => {
                setLoading(true);
                searchPokemon();
              }}
              defaultValue={name}
            />

            <View
              style={{
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
                    pokemon.sprites
                      ? {uri: pokemon.sprites.front_default}
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
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>GENERAL</Text>
                <Text style={{fontWeight: 'bold'}}>Nombre: {pokemon.name}</Text>
                <Text style={{fontWeight: 'bold'}}>
                  Tipo:
                  {pokemon.types?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {' ' + e.type.name}
                      </Text>
                    );
                  })}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Peso: {pokemon.weight} lbs
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Mide: {pokemon.height} cm
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    Exp: {pokemon.base_experience}
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>Id: {pokemon.id}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Stats</Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.stats?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {`${e.stat.name} : ${e.base_stat}`}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ataques</Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.moves?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {e.move.name}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Habilidades
                </Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.abilities?.map((e, i) => {
                    return (
                      <Text
                        key={i.toString()}
                        style={{fontWeight: 'bold', textAlign: 'center'}}>
                        {e.ability.name}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Formas</Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.forms?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {e.name}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Items</Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.held_items?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {e.item.name}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Juegos</Text>
                <ScrollView style={{width: '100%', height: '25%'}}>
                  {pokemon.game_indices?.map((e, i) => {
                    return (
                      <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                        {e.version.name}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <ActivityIndicator size="large" color="#ff0000" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
