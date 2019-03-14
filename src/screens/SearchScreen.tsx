//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {connect} from 'react-redux';

import {PRIMARY_COLOR} from '../constants/color';
import SearchBar from '../components/SearchBar';
import {State, Action} from '../Type';
import TabLoading from './tabs/TabLoading';

type Props = NavigationScreenProps & {
  inputTextSearchValue: string;
  updateInputTextSearch: (value: string) => void;
  resetInputTextSearch: () => void;
};

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
    let {updateInputTextSearch, inputTextSearchValue} = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._hideKeyboard}>
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.text}>Search over 100,000 movies!</Text>
          <SearchBar
            autoCorrect={false}
            inputTextValue={inputTextSearchValue}
            onChangeText={updateInputTextSearch}
            onSubmitText={this._onSubmitText}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  _onSubmitText = () => {
    let {inputTextSearchValue, resetInputTextSearch, navigation} = this.props;

    if (inputTextSearchValue.trim() !== '') {
      navigation.navigate('SearchResult', {
        query: inputTextSearchValue.trim(),
      });

      resetInputTextSearch();
    }
  };

  _hideKeyboard = () => {
    Keyboard.dismiss();
  };
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

function mapStateToProps(state: State) {
  let {inputTextState} = state;
  let {inputTextSearchValue} = inputTextState;

  return {
    inputTextSearchValue: inputTextSearchValue,
  };
}

function mapDispatchToProps(dispatch: ({}: Action) => void) {
  return {
    updateInputTextSearch: (value: string) => {
      dispatch({type: 'UPDATE_INPUT_TEXT_SEARCH', payload: value});
    },
    resetInputTextSearch: () => {
      dispatch({type: 'RESET_INPUT_TEXT_SEARCH'});
    },
  };
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
