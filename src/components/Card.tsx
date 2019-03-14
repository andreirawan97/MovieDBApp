import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Image} from 'react-native-elements';

import parseDate from '../helper/parseDate';

type Props = {
  onPress: (args: any) => any;
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: string;
  description: string;
};

class Card extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }
  animatedValue: any;
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: 0.95,
      friction: 90,
      tension: 100,
    }).start();
  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }

  render() {
    const animatedStyle = {
      transform: [{scale: this.animatedValue}],
    };
    let {id, title, posterPath, releaseDate, description, onPress} = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `http://image.tmdb.org/t/p/w500/${posterPath}`}}
              style={styles.poster}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.textDetailContainer}>
            <View style={styles.textTitleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </View>
            <View style={styles.textDescriptionContainer}>
              <Text numberOfLines={3}>{description}</Text>
            </View>
            <View style={styles.textReleaseDateContainer}>
              <FontAwesome name="calendar" size={20} style={{marginRight: 8}} />
              <Text numberOfLines={2}>{parseDate(releaseDate)}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginVertical: 5,
    paddingRight: 8,
    height: 150,
  },
  imageContainer: {
    flex: 1,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  textDetailContainer: {
    flex: 2,
    paddingVertical: 10,
    flexDirection: 'column',
  },
  textTitleContainer: {
    flex: 1,
  },
  textDescriptionContainer: {
    flex: 2,
  },
  textReleaseDateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Card;
