//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type Props = {
  autoCorrect?: boolean;
  inputTextValue?: string;
  onChangeText?: (value: string) => void;
  onSubmitText?: () => void;
};

// create a component
class SearchBar extends Component<Props> {
  render() {
    let {onChangeText, onSubmitText, autoCorrect, inputTextValue} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.searchIconContainer}>
          <MaterialCommunityIcons
            style={styles.iconStyle}
            name="magnify"
            size={28}
          />
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="grey"
            placeholder="Search movies..."
            returnKeyType="search"
            value={inputTextValue}
            autoCorrect={autoCorrect}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitText}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  searchIconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInputContainer: {
    flex: 4,
  },
  iconStyle: {
    color: 'white',
    alignSelf: 'center',
  },
  textInputStyle: {
    color: 'white',
    fontSize: 20,
  },
});

//make this component available to the app
export default SearchBar;
