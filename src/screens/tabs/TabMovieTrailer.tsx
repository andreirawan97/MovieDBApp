//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, WebView, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {Action, State, MovieTrailer} from '../../Type';
import {DEVICE_WIDTH} from '../../constants/deviceConfig';
import TabLoading from './TabLoading';

type Props = {
  movieID: number;
  movieDetailTrailer: {
    data: Array<MovieTrailer>;
    isLoading: boolean;
  };
  fetchMovieTrailer: (movieID: number) => void;
  resetMovieTrailer: () => void;
};

// create a component
class TabTrailerMovie extends Component<Props> {
  componentDidMount() {
    let {fetchMovieTrailer, movieID} = this.props;

    fetchMovieTrailer(movieID);
  }

  render() {
    let {movieDetailTrailer} = this.props;

    let mapMovieTrailer = movieDetailTrailer.data.map(
      (trailer: MovieTrailer, i: number) => (
        <View
          key={i}
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_WIDTH / 1.778,
            marginBottom: 25,
          }}
        >
          <WebView
            style={{
              width: DEVICE_WIDTH,
              height: DEVICE_WIDTH / 1.778,
            }}
            source={{
              uri: `https://www.youtube.com/embed/${trailer.key}`,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />

          <Text style={{fontSize: 16, paddingTop: 10, paddingLeft: 10}}>
            {trailer.name}
          </Text>
        </View>
      ),
    );

    return (
      <View style={styles.container}>
        <ScrollView>
          {movieDetailTrailer.isLoading ? <TabLoading /> : null}

          {movieDetailTrailer.data.length !== 0 ? (
            mapMovieTrailer
          ) : (
            <Text style={styles.notFoundText}>No trailer found!</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  notFoundText: {
    marginTop: 20,
    fontSize: 21,
    color: 'grey',
  },
});

function mapStateToProps(state: State) {
  let {movieState} = state;
  let {movieDetailTrailer} = movieState;

  return {
    movieDetailTrailer: movieDetailTrailer,
  };
}

function mapDispatchToProps(dispatch: ({}: Action) => void) {
  return {
    fetchMovieTrailer: (movieID: number) => {
      dispatch({type: 'FETCH_MOVIE_TRAILER_REQUEST', payload: movieID});
    },
    resetMovieTrailer: () => {
      dispatch({type: 'RESET_MOVIE_TRAILER'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabTrailerMovie);
