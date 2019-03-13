//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {NavigationScreenProps, NavigationParams} from 'react-navigation';
import {connect} from 'react-redux';
import {AntDesign} from '@expo/vector-icons';

import {SECONDARY_COLOR} from '../constants/color';
import {DEVICE_WIDTH} from '../constants/deviceConfig';
import {State, Action, Movie} from '../Type';
import BlockQuotes from '../components/BlockQuotes';

type Props = NavigationScreenProps & {
  movieDetail: Movie;
  fetchMovieDetail: (movieID: number) => void;
  resetMovieDetail: () => void;
};

// create a component
class DetailScreen extends Component<Props> {
  static navigationOptions = (navigation: NavigationParams) => {
    return {
      title: 'Detail',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: SECONDARY_COLOR,
      },
      headerTintColor: 'white',
    };
  };

  componentDidMount() {
    let {navigation, fetchMovieDetail} = this.props;
    let movieID = navigation.getParam('id');

    fetchMovieDetail(movieID);
  }

  componentWillUnmount() {
    let {resetMovieDetail} = this.props;

    resetMovieDetail();
  }

  render() {
    let {navigation, movieDetail} = this.props;
    let {
      id,
      title,
      posterPath,
      backdropPath,
      overview,
      releaseDate,
      runtime,
      budget,
      genres,
      revenue,
      popularity,
    } = movieDetail;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/original/${
                movieDetail.backdropPath
              }`,
            }}
            style={styles.headerImage}
          />

          <View style={styles.movieDetailContainer}>
            <Text style={styles.textHeader}>Movie Detail</Text>
            <Text style={styles.textTitle}>
              {title ? title : 'No title found!'}
            </Text>
            <Text style={styles.textNormal}>
              <AntDesign name="clockcircleo" size={17} />
              {runtime ? ` ${runtime} minutes` : ' No runtime found!'}
            </Text>

            <BlockQuotes text={overview} defaultText="Description not found" />
          </View>
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
  headerImage: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH / 1.776, //233
    resizeMode: 'contain',
  },
  movieDetailContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  textHeader: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 21,
    marginTop: 15,
    fontWeight: 'bold',
  },
  textNormal: {
    fontSize: 18,
    marginTop: 10,
  },
});

function mapStateToProps(state: State) {
  let {movieState} = state;
  let {movieDetail} = movieState;

  return {
    movieDetail: movieDetail,
  };
}

function mapDispatchToProps(dispatch: ({}: Action) => void) {
  return {
    fetchMovieDetail: (movieID: number) => {
      dispatch({type: 'FETCH_MOVIE_DETAIL_REQUEST', payload: movieID});
    },
    resetMovieDetail: () => {
      dispatch({type: 'RESET_MOVIE_DETAIL'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailScreen);
