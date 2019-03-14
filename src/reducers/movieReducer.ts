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
    movieDetailTrailer: {
      data: [],
      isLoading: true,
    },
    movieSearchResult: {
      data: [],
      isLoading: true,
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
    case 'FETCH_MOVIE_TRAILER_SUCCESS': {
      let movieDetailTrailer = action.payload;

      return {
        ...movieState,
        movieDetailTrailer: {
          data: movieDetailTrailer,
          isLoading: false,
        },
      };
    }
    case 'RESET_MOVIE_TRAILER': {
      return {
        ...movieState,
        movieDetailTrailer: {
          data: [],
          isLoading: true,
        },
      };
    }
    case 'FETCH_SEARCH_RESULT_SUCCESS': {
      let searchResult = action.payload;

      return {
        ...movieState,
        movieSearchResult: {
          data: searchResult,
          isLoading: false,
        },
      };
    }
    case 'RESET_SEARCH_RESULT': {
      return {
        ...movieState,
        movieSearchResult: {
          data: [],
          isLoading: true,
        },
      };
    }
    default: {
      return movieState;
    }
  }
}
