import {
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedBack,
  Text
} from 
const HeadInfo = () => {
  return (
    <View style={styles.headContainer}>
      <View style={styles.imgContainer}>
        <ImageBackground
          source={
            pokemon.sprites
              ? {uri: pokemon.sprites.front_default}
              : {uri: DEFAULT_SPRITE}
          }
          style={styles.spriteImg}></ImageBackground>
      </View>
      <View style={styles.generalInfoContainer}>
        <Text style={styles.infoTitle}>General</Text>
        <TouchableWithoutFeedback onPress={() => handleCatch()}>
          <Image
            source={require('./assets/imgs/pokeball_front.png')}
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

export default HeadInfo