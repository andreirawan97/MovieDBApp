export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieTrailer = {
  name: string;
  site: string;
  type: 'Trailer' | 'Featurette' | 'Teaser' | 'Clip';
  key: string;
};

export type Movie = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  runtime?: number;
  budget?: number;
  genres?: Array<MovieGenre>;
  revenue?: number;
  popularity?: number;
};

export type MovieState = {
  nowPlayingMovies: Array<Movie>;
  movieDetail: Movie;
  movieDetailTrailer: {
    data: Array<MovieTrailer>;
    isLoading: boolean;
  };
  movieSearchResult: {
    data: Array<Movie>;
    isLoading: boolean;
  };
};

export type InputTextState = {
  inputTextSearchValue: string;
};

export type State = {
  movieState: MovieState;
  inputTextState: InputTextState;
};

//Actions
export type Action =
  | {
      type: 'FETCH_NOW_PLAYING_REQUEST';
    }
  | {
      type: 'FETCH_NOW_PLAYING_SUCCESS';
      payload: Array<Movie>;
    }
  | {
      type: 'FETCH_MOVIE_DETAIL_REQUEST';
      payload: number;
    }
  | {
      type: 'FETCH_MOVIE_DETAIL_SUCCESS';
      payload: Movie;
    }
  | {
      type: 'RESET_MOVIE_DETAIL';
    }
  | {
      type: 'FETCH_MOVIE_TRAILER_REQUEST';
      payload: number;
    }
  | {
      type: 'FETCH_MOVIE_TRAILER_SUCCESS';
      payload: Array<MovieTrailer>;
    }
  | {
      type: 'RESET_MOVIE_TRAILER';
    }
  | {
      type: 'FETCH_SEARCH_RESULT_REQUEST';
      payload: string;
    }
  | {
      type: 'FETCH_SEARCH_RESULT_SUCCESS';
      payload: Array<Movie>;
    }
  | {
      type: 'RESET_SEARCH_RESULT';
    }
  | {
      type: 'UPDATE_INPUT_TEXT_SEARCH';
      payload: string;
    }
  | {
      type: 'RESET_INPUT_TEXT_SEARCH';
    };
