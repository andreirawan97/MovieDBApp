//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationScreenProps, NavigationParams} from 'react-navigation';
import {connect} from 'react-redux';

import {PRIMARY_COLOR} from '../constants/color';
import {State, Action, Movie} from '../Type';
import Card from '../components/Card';
import TabLoading from './tabs/TabLoading';

type Props = NavigationScreenProps & {
  movieSearchResult: {
    data: Array<Movie>;
    isLoading: boolean;
  };
  fetchSearchResult: (query: string) => void;
  resetSearchResult: () => void;
};

// create a component
class SearchResultScreen extends Component<Props> {
  static navigationOptions = ({navigation}: NavigationParams) => {
    return {
      title: `"${navigation.getParam('query')}"`,
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
    };
  };

  componentDidMount() {
    let {fetchSearchResult, navigation} = this.props;
    let query = navigation.getParam('query');

    fetchSearchResult(query);
  }

  componentWillUnmount() {
    let {resetSearchResult} = this.props;

    resetSearchResult();
  }

  render() {
    let {movieSearchResult, navigation} = this.props;
    let mapMovieSearchResult = movieSearchResult.data.map(
      (movie: Movie, i: number) => (
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
      ),
    );

    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.searchResultText}>Search Result</Text>
          {movieSearchResult.isLoading ? (
            <TabLoading />
          ) : movieSearchResult.data.length !== 0 ? (
            mapMovieSearchResult
          ) : (
            <Text style={styles.notFoundText}>No movie found!</Text>
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
    backgroundColor: 'whitesmoke',
  },
  searchResultText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  notFoundText: {
    marginTop: 20,
    fontSize: 21,
    color: 'grey',
  },
});

function mapStateToProps(state: State) {
  let {movieState} = state;
  let {movieSearchResult} = movieState;

  return {
    movieSearchResult: movieSearchResult,
  };
}

function mapDispatchToProps(dispatch: ({}: Action) => void) {
  return {
    fetchSearchResult: (query: string) => {
      dispatch({type: 'FETCH_SEARCH_RESULT_REQUEST', payload: query});
    },
    resetSearchResult: () => {
      dispatch({type: 'RESET_SEARCH_RESULT'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultScreen);
