//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {connect} from 'react-redux';

import {PRIMARY_COLOR} from '../constants/color';
import {Movie, State, Action} from '../Type';
import Card from '../components/Card';

type Props = NavigationScreenProps & {
  nowPlayingMovies: Array<Movie>;
  fetchNowPlaying: () => void;
};

// create a component
class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
  };

  componentDidMount() {
    let {fetchNowPlaying} = this.props;
    fetchNowPlaying();
  }

  render() {
    let {nowPlayingMovies, navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.nowPlayingText}>Now Playing</Text>
          {nowPlayingMovies.length > 0
            ? nowPlayingMovies.map((movie: Movie, i: number) => (
                <Card
                  key={i}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.posterPath}
                  overview={movie.overview}
                  releaseDate={movie.releaseDate}
                  description={movie.overview}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      id: movie.id,
                      title: movie.title,
                    })
                  }
                />
              ))
            : null}
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  nowPlayingText: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
});

function mapStateToProps(state: State) {
  let {movieState} = state;
  let {nowPlayingMovies} = movieState;

  return {
    nowPlayingMovies: nowPlayingMovies,
  };
}

function mapDispatchToProps(dispatch: ({}: Action) => void) {
  return {
    fetchNowPlaying: () => {
      dispatch({type: 'FETCH_NOW_PLAYING_REQUEST'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
