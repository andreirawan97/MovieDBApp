import {Saga} from 'redux-saga';
import {fork} from 'redux-saga/effects';

import movieSagaWatcher from '../sagas/movieSaga';

const rootSaga: Saga = function*() {
  yield fork(movieSagaWatcher);
};

export default rootSaga;
