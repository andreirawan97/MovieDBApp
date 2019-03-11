import {call, put, takeLatest} from 'redux-saga/effects';

import {requestNowPlaying} from '../API';
import {Action, Movie} from '../Type';

export default function* movieSagaWatcher(): any {
  yield takeLatest('FETCH_NOW_PLAYING_REQUEST', fetchNowPlaying);
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
