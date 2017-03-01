// ACTION TYPES.
const SET_SITE_STATE = 'Glob/site/SET_SITE_STATE';

// ACTIONS.
export function setSiteState(state) {
  return {
    type: SET_SITE_STATE,
    payload: {
      state,
    },
  };
}
// REDUCER
export default function reducer(state = {
  isOpen: false,
}, action) {
  switch (action.type) {
    case SET_SITE_STATE: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    default:
      return state;
  }
}
