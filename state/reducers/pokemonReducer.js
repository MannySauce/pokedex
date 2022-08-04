const initialState = {
  pokemon: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'catchPokemon':
      let newPoke = {
        name: action.payload.name,
        img: action.payload.sprites.front_default,
        id: action.payload.id,
      };
      return {
        ...state,
        pokemon: [...state.pokemon, newPoke],
      }; //agregar el pokemon al array
    case 'releasePokemon':
      console.log('liberaste');
      return state; //splice el pokemon del state array
    default:
      return state;
  }
};
export default reducer;
