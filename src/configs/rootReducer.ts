import {combineReducers} from 'redux';

import movieReducer from '../reducers/movieReducer';
import inputTextReducer from '../reducers/inputTextReducer';

export default combineReducers({
  // @ts-ignore
  movieState: movieReducer,
  // @ts-ignore
  inputTextState: inputTextReducer,
});
