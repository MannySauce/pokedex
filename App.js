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
  ImageBackground,
  Button,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL, DEFAULT_SPRITE} from './globals/base_urls';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {catchPokemon, releasePokemon} from './state/actions/index';
import axios from 'axios';

const AppWrapper = () => {
  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [visible, setVisible] = useState(false);
  const capturados = useSelector(state => state.catch.pokemon);
  const inputRef = useRef(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(capturados);
  const searchPokemon = () => {
    axios
      .get(BASE_URL + name)
      .then(res => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.response) {
          if (err.response.status == 404) {
            showAlert();
          }
        }
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

  const handleCatch = () => {
    if (pokemon != null || pokemon != {}) {
    }
    dispatch({type: 'catchPokemon', payload: pokemon});
  };

  const _renderItem = item => {
    console.log('Item', item);
    return (
      <View>
        <Text>name:{item.name}</Text>
      </View>
    );
  };

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
                <ImageBackground
                  source={
                    pokemon.sprites
                      ? {uri: pokemon.sprites.front_default}
                      : {uri: DEFAULT_SPRITE}
                  }
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}></ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>GENERAL</Text>
                <TouchableWithoutFeedback onPress={() => handleCatch()}>
                  <Image
                    source={require('./assets/imgs/pokeball_front.png')}
                    style={{
                      position: 'absolute',
                      right: 20,
                      width: 25,
                      height: 25,
                    }}></Image>
                </TouchableWithoutFeedback>
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
                  Mide: {pokemon.height != undefined ? pokemon.height * 10 : 0}{' '}
                  cm
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
            <Button
              title="Ver mis pokemones"
              color="#ff0000"
              style={{position: 'absolute', bottom: 0}}
              onPress={() => setVisible(true)}></Button>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onBackPress={() => setVisible(!visible)}
              onRequestClose={() => {
                setVisible(!visible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {capturados ? (
                    <FlatList
                      data={capturados}
                      renderItem={item => _renderItem(item.item)}
                      keyExtractor={item => item.id}
                    />
                  ) : (
                    <View style={{flex: 1}}>
                      <Text>Aun No Hay</Text>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <ActivityIndicator size="large" color="#ff0000" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: '80%',
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppWrapper;
