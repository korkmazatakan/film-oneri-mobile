import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';

const API_URL = 'https://moviesuggestionwebapi.azurewebsites.net/';

const SmallMovieCard = ({movie, genre, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detailscreen', {movie: movie, genre: genre})
      }>
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Image
            style={styles.poster}
            source={{
              uri: `${API_URL}uploads/moviecontent/posters/${movie.poster}`,
            }}
          />
        </View>
        <View style={{paddingTop: 5}}>
          <Text style={styles.movieName}>{movie.name}</Text>
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
