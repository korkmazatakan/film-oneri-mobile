import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';

const API_URL = 'https://moviesuggestionwebapi.azurewebsites.net/';

const ExtendMovieCard = ({genre, movie, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detailscreen', {movie: movie, genre: genre})
      }>
      <View
        style={{
          flexDirection: 'column',
          height: 320,
          width: 380,
          marginLeft: 20,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={styles.poster}
            source={{
              uri: `${API_URL}uploads/moviecontent/posters/${movie.poster}`,
            }}
          />
        </View>
        <View
          style={{
            flex: 20,
            marginLeft: 205,
            flexDirection: 'column',
          }}>
          <View>
            <Text style={styles.movieName}>{movie.name}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.gnd}>
              {genre} | {movie.releaseDate.substring(0, 4)}
            </Text>
          </View>
          <View style={{flex: 5}}>
            <Text style={styles.description}>
              {`${movie.description.substring(0, 210)}...`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  poster: {
    borderRadius: 10,
    width: 195,
    height: 300,
    resizeMode: 'cover',
  },
  movieName: {
    fontFamily: 'Roboto-Light',
    fontSize: 25,
    color: colors.detailSceenText,
    textAlign: 'left',
    paddingBottom: 2,
  },
  gnd: {
    fontFamily: 'Roboto-Light',
    fontSize: 17,
    color: colors.white,
    textAlign: 'left',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontWeight: '200',
    color: colors.detailSceenText,
    textAlign: 'left',
  },
});

export default ExtendMovieCard;
