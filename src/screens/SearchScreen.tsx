//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

import {PRIMARY_COLOR} from '../constants/color';

type Props = NavigationScreenProps & {};

// create a component
class SearchScreen extends Component<Props> {
  static navigationOptions = {
    title: '',
    headerTitleStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
      elevation: 0,
      borderBottomWidth: 0,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 38}}>Masih belum</Text>
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
    backgroundColor: PRIMARY_COLOR,
  },
});

//make this component available to the app
export default SearchScreen;
