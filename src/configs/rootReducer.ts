import {combineReducers} from 'redux';

import movieReducer from '../reducers/movieReducer';

export default combineReducers({
  //@ts-ignore
  movieState: movieReducer,
});
