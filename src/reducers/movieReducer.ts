import {MovieState, Action} from '../Type';

export default function newsReducer(movieState: MovieState, action: Action) {
  const initialState: MovieState = {
    nowPlayingMovies: [],
    movieDetail: {
      id: 0,
      title: '',
      posterPath: '',
      backdropPath: '',
      overview: '',
      releaseDate: '',
    },
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
    case 'FETCH_MOVIE_DETAIL_SUCCESS': {
      let movieDetail = action.payload;

      return {
        ...movieState,
        movieDetail: movieDetail,
      };
    }
    case 'RESET_MOVIE_DETAIL': {
      let movieDetail = {
        id: 0,
        title: '',
        posterPath: '',
        backdropPath: '',
        overview: '',
        releaseDate: '',
      };

      return {
        ...movieState,
        movieDetail: movieDetail,
      };
    }
    default: {
      return movieState;
    }
  }
}
