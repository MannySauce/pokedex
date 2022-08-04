export const catchPokemon = pokemon => {
  return dispatch => {
    dispatch({
      type: 'catchPokemon',
      payload: pokemon,
    });
  };
};

export const releasePokemon = id => {
  return dispatch => {
    dispatch({
      type: 'releasePokemon',
      payload: pokemon,
    });
  };
};
