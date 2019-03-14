//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  text: string;
  defaultText: string;
};

// create a component
class BlockQuotes extends Component<Props> {
  render() {
    let {text, defaultText} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{text ? text : defaultText}</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftColor: '#EE6E73',
    borderLeftWidth: 5,
    paddingVertical: 5,
    marginVertical: 15,
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 10,
    textAlign: 'justify',
  },
});

//make this component available to the app
export default BlockQuotes;
