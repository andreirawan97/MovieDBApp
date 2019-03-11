import {MovieState, Action} from '../Type';

export default function newsReducer(movieState: MovieState, action: Action) {
  const initialState: MovieState = {
    nowPlayingMovies: [],
  };

  if (!movieState) {
    return initialState;
  }

  switch (action.type) {
    case 'FETCH_NOW_PLAYING_SUCCESS': {
      let nowPlayingMovies = action.payload;

      return {
        ...movieState,
        nowPlayingMovies: nowPlayingMovies,
      };
    }
    default: {
      return movieState;
    }
  }
}
