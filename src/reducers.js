import {CREATE_PROJECT} from "./actions";

const initialState = {
  projects: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return Object.assign({}, state, {
        projects: [
          ...state.projects,
          {
            key: action.name,
            name: action.name,
          }
        ]
      });
    default:
      return state;
  }
}

export default appReducer;
