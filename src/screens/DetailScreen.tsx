//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {NavigationScreenProps, NavigationParams} from 'react-navigation';

import {SECONDARY_COLOR} from '../constants/color';
import {DEVICE_WIDTH} from '../constants/deviceConfig';

type Props = NavigationScreenProps & {};

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

  render() {
    let {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/original/${navigation.getParam(
                'backdropPath',
              )}`,
            }}
            style={styles.headerImage}
          />

          <View style={styles.movieDetailContainer}>
            <Text style={styles.textHeader}>Movie Detail</Text>
            <Text style={styles.textTitle}>Captain Marvel</Text>
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
    marginTop: 10,
  },
});

//make this component available to the app
export default DetailScreen;
