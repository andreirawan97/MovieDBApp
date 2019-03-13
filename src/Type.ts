type MovieGenre = {
  id: number;
  name: string;
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
  nowPlayingMovies: Array<Movie> | [];
  movieDetail: Movie;
};

export type State = {
  movieState: MovieState;
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
    };
