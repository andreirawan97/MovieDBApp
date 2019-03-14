import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

import createDataStore from './configs/createDataStore';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import NowPlayingScreen from './screens/NowPlayingScreen';

const store = createDataStore();

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  SearchResult: SearchResultScreen,
  Detail: DetailScreen,
});

const NowPlayingStack = createStackNavigator({
  NowPlaying: NowPlayingScreen,
  Detail: DetailScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    NowPlaying: NowPlayingStack,
    Search: SearchStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // @ts-ignore
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = MaterialIcons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'NowPlaying') {
          iconName = `movie`;
        } else if (routeName === 'Search') {
          iconName = `search`;
        }

        // You can return any component that you like here!
        // @ts-ignore
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2CC7C7',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <StatusBar barStyle="light-content" />
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
