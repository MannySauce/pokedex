import {
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedBack,
  Text,
  StyleSheet,
} from 'react-native';
import {DEFAULT_SPRITE} from '../globals/base_urls';
const HeadInfo = props => {
  const DEFAULT = DEFAULT_SPRITE;
  const {pokemon} = props.data.pokemon;
  return (
    <View style={styles.headContainer}>
      <View style={styles.imgContainer}>
        <ImageBackground
          source={
            pokemon.sprites
              ? {uri: pokemon.sprites.front_default}
              : {uri: DEFAULT}
          }
          style={styles.spriteImg}></ImageBackground>
      </View>
      <View style={styles.generalInfoContainer}>
        <Text style={styles.infoTitle}>General</Text>
        <TouchableWithoutFeedback onPress={() => props.handleCatch()}>
          <Image
            source={require('../assets/imgs/pokeball_front.png')}
            style={styles.catchPokeballImg}></Image>
        </TouchableWithoutFeedback>
        <Text style={styles.singleTitle}>Nombre: {pokemon.name}</Text>
        <Text style={styles.singleTitle}>
          Tipo:
          {pokemon.types?.map((e, i) => {
            return (
              <Text key={i.toString()} style={{fontWeight: 'bold'}}>
                {' ' + e.type.name}
              </Text>
            );
          })}
        </Text>
        <Text style={styles.singleTitle}>Peso: {pokemon.weight} lbs</Text>
        <Text style={styles.singleTitle}>
          Mide: {pokemon.height != undefined ? pokemon.height * 10 : 0} cm
        </Text>
        <View style={styles.id_exp_Container}>
          <Text style={styles.singleTitle}>Exp: {pokemon.base_experience}</Text>
          <Text style={styles.singleTitle}>Id: {pokemon.id}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeadInfo;

const styles = StyleSheet.create({
  headContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 30,
  },
  imgContainer: {
    marginLeft: 20,
    flex: 0.8,
    height: 120,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#000',
  },
  spriteImg: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  generalInfoContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  catchPokeballImg: {
    position: 'absolute',
    right: 20,
    width: 25,
    height: 25,
  },
  infoTitle: {fontSize: 14, fontWeight: 'bold', color: '#000'},
  singleTitle: {fontSize: 12, fontWeight: 'bold'},

  id_exp_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
