//import liraries
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationScreenProps, NavigationParams} from 'react-navigation';
import {connect} from 'react-redux';
//@ts-ignore
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {SECONDARY_COLOR} from '../constants/color';
import {DEVICE_WIDTH} from '../constants/deviceConfig';
import {State, Action, Movie} from '../Type';
import TabDetailMovie from './tabs/TabMovieDetail';
import TabTrailerMovie from './tabs/TabMovieTrailer';
import TabLoading from './tabs/TabLoading';
import {requestMovieTrailer} from '../API';

type Props = NavigationScreenProps & {
  movieDetail: Movie;
  fetchMovieDetail: (movieID: number) => void;
  resetMovieDetail: () => void;
  resetMovieTrailer: () => void;
};

// create a component
class DetailScreen extends Component<Props> {
  static navigationOptions = ({navigation}: NavigationParams) => {
    return {
      title: navigation.getParam('title'),
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
    let {resetMovieDetail, resetMovieTrailer} = this.props;

    resetMovieDetail();
    resetMovieTrailer();
  }

  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Detail'},
      {key: 'second', title: 'Trailer'},
    ],
  };

  render() {
    let {movieDetail} = this.props;

    let firstScene = () =>
      movieDetail.id !== 0 ? (
        <TabDetailMovie movieDetail={movieDetail} />
      ) : (
        <TabLoading />
      );
    let secondScene = () =>
      movieDetail.id !== 0 ? (
        <TabTrailerMovie movieID={movieDetail.id} />
      ) : (
        <TabLoading />
      );

    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: firstScene,
            second: secondScene,
          })}
          onIndexChange={(index: number) => this.setState({index})}
          initialLayout={{width: DEVICE_WIDTH}}
          renderTabBar={(props: any) => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'white'}}
              style={{backgroundColor: SECONDARY_COLOR}}
            />
          )}
        />
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
    resetMovieTrailer: () => {
      dispatch({type: 'RESET_MOVIE_TRAILER'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailScreen);
