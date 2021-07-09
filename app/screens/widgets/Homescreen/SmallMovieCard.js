import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

const SmallMovieCard = ({movie, genre, language, director, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detailscreen', {
          movie: movie,
          genre: genre,
          language: language,
          director: director,
        })
      }>
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Image
            style={styles.poster}
            source={{
              uri: `${API_URL}api/movies/poster/${movie.id}`,
            }}
          />
        </View>
        <View style={{paddingTop: 5}}>
          <Text style={styles.movieName}>
            {movie.name.length > 20
              ? movie.name.substring(0, 17) + '..'
              : movie.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 250,
    width: 150,
    marginLeft: 20,
  },
  movieName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.movieTitle,
    textAlign: 'center',
  },
  poster: {
    borderRadius: 15,
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
export default SmallMovieCard;
