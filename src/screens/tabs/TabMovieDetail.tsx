//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Image, Divider} from 'react-native-elements';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
//@ts-ignore
import {RNChipView} from 'react-native-chip-view';

import {DEVICE_WIDTH} from '../../constants/deviceConfig';
import {Movie, MovieGenre} from '../../Type';
import BlockQuotes from '../../components/BlockQuotes';
import parseDate from '../../helper/parseDate';

type Props = {
  movieDetail: Movie;
};

// create a component
class TabDetailMovie extends Component<Props> {
  render() {
    let {movieDetail} = this.props;
    let {
      title,
      overview,
      releaseDate,
      runtime,
      genres,
      revenue,
      popularity,
    } = movieDetail;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/original/${
                movieDetail.backdropPath
              }`,
            }}
            style={styles.headerImage}
            PlaceholderContent={<ActivityIndicator />}
          />

          <View style={styles.movieDetailContainer}>
            {/* <Text style={styles.textHeader}>Movie Detail</Text> */}
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textNormal}>
              <AntDesign name="clockcircleo" size={17} />
              {runtime ? ` ${runtime} minutes` : ' No runtime found!'}
            </Text>
            <Text style={styles.textNormal}>
              <FontAwesome name="calendar" size={20} style={{marginRight: 8}} />
              {releaseDate
                ? ` ${parseDate(releaseDate)}`
                : ' No release date found!'}
            </Text>
            <Text style={styles.textNormal}>
              Revenue:
              {revenue ? ` $${revenue}` : ' No revenue found!'}
            </Text>
            <Text style={styles.textNormal}>
              Popularity:
              {popularity ? ` ${popularity}` : ' No popularity found!'}
            </Text>

            <BlockQuotes text={overview} defaultText="No description found!" />
          </View>

          <Divider />

          <View>
            <Text
              style={[styles.textNormal, {marginLeft: 15, marginBottom: 10}]}
            >
              Genre(s):
            </Text>
            <View style={styles.chipsContainer}>
              {genres ? (
                genres.map((genre: MovieGenre, i: number) => (
                  <View key={i} style={{marginRight: 8, marginBottom: 10}}>
                    <RNChipView
                      title={genre.name}
                      titleStyle={{fontWeight: 'normal', fontSize: 15}}
                      avatar={false}
                    />
                  </View>
                ))
              ) : (
                <Text>No genres found!</Text>
              )}
            </View>
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  textNormal: {
    fontSize: 18,
    marginTop: 10,
  },
  genresContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
  },
});

//make this component available to the app
export default TabDetailMovie;
