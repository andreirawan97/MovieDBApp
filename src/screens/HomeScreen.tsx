//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {PRIMARY_COLOR} from '../constants/color';

type Props = NavigationScreenProps & {};

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

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
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
});

//make this component available to the app
export default HomeScreen;
