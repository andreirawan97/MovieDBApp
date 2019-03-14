import {call, put, takeLatest} from 'redux-saga/effects';

import {
  requestNowPlaying,
  requestMovieDetail,
  requestMovieTrailer,
  requestSearchResult,
} from '../API';
import {Action, Movie} from '../Type';

export default function* movieSagaWatcher(): any {
  yield takeLatest('FETCH_NOW_PLAYING_REQUEST', fetchNowPlaying);
  yield takeLatest('FETCH_MOVIE_DETAIL_REQUEST', fetchMovieDetail);
  yield takeLatest('FETCH_MOVIE_TRAILER_REQUEST', fetchMovieTrailer);
  yield takeLatest('FETCH_SEARCH_RESULT_REQUEST', fetchSearchResult);
}

function* fetchSearchResult(action: Action) {
  if (action.type === 'FETCH_SEARCH_RESULT_REQUEST') {
    let response = yield call(() => requestSearchResult(action.payload));

    let arrayOfMovie: Array<Movie> = response.results.map((movie: any) => {
      let {
        id,
        title,
        release_date,
        overview,
        poster_path,
        backdrop_path,
      } = movie;

      return {
        id: id,
        title: title,
        releaseDate: release_date,
        overview: overview,
        posterPath: poster_path,
        backdropPath: backdrop_path,
      };
    });

    if (arrayOfMovie) {
      yield put({
        type: 'FETCH_SEARCH_RESULT_SUCCESS',
        payload: arrayOfMovie,
      });
    }
  }
}

function* fetchMovieDetail(action: Action) {
  if (action.type === 'FETCH_MOVIE_DETAIL_REQUEST') {
    let response = yield call(() => requestMovieDetail(action.payload));

    /*
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
     */

    let {
      id,
      title,
      poster_path,
      backdrop_path,
      overview,
      release_date,
      runtime,
      budget,
      genres,
      revenue,
      popularity,
    } = response;

    let movieDetail: Movie = {
      id: id,
      title: title,
      posterPath: poster_path,
      backdropPath: backdrop_path,
      overview: overview,
      releaseDate: release_date,
      runtime: runtime,
      budget: budget,
      genres: genres,
      revenue: revenue,
      popularity: popularity,
    };

    yield put({type: 'FETCH_MOVIE_DETAIL_SUCCESS', payload: movieDetail});
  }
}

function* fetchMovieTrailer(action: Action) {
  if (action.type === 'FETCH_MOVIE_TRAILER_REQUEST') {
    let response = yield call(() => requestMovieTrailer(action.payload));
    let arrayOfTrailer = response.results.filter(
      (trailer: any) =>
        trailer.type === 'Trailer' && trailer.site === 'YouTube',
    );

    yield put({type: 'FETCH_MOVIE_TRAILER_SUCCESS', payload: arrayOfTrailer});
  }
}

function* fetchNowPlaying(action: Action) {
  if (action.type === 'FETCH_NOW_PLAYING_REQUEST') {
    let response = yield call(requestNowPlaying);
    let arrayOfMovie: Array<Movie> = response.results.map((movie: any) => {
      let {
        id,
        title,
        release_date,
        overview,
        poster_path,
        backdrop_path,
      } = movie;

      return {
        id: id,
        title: title,
        releaseDate: release_date,
        overview: overview,
        posterPath: poster_path,
        backdropPath: backdrop_path,
      };
    });

    if (arrayOfMovie) {
      yield put({
        type: 'FETCH_NOW_PLAYING_SUCCESS',
        payload: arrayOfMovie,
      });
    }
  }
}
