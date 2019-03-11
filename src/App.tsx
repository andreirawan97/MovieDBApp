import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

import createDataStore from './configs/createDataStore';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';

const store = createDataStore();

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // @ts-ignore
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else if (routeName === 'About') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        // @ts-ignore
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF9800',
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
