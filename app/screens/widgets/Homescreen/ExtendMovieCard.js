import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';
const ExtendMovieCard = ({genre, movie, language, director, navigation}) => {
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
              uri: `${API_URL}api/movies/poster/${movie.id}`,
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 10,
            flex: 55,
            marginLeft: 205,
            flexDirection: 'column',
          }}>
          <View>
            <Text style={styles.movieName}>
              {movie.name.length > 12
                ? movie.name.substring(0, 10) + '...'
                : movie.name}
              {}
            </Text>
          </View>
          <View style={{flex: 1, paddingBottom: 5}}>
            <Text style={styles.gnd}>
              {genre} | {movie.release_date.substring(0, 4)}
            </Text>
          </View>
          <View style={{flex: 10}}>
            <Text style={styles.description}>
              {`${movie.description.substring(0, 160)}...`}
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
    fontSize: 23,
    color: colors.detailSceenText,
    textAlign: 'left',
    paddingBottom: 5,
  },
  gnd: {
    fontFamily: 'Roboto-Light',
    fontSize: 19,
    color: colors.white,
    textAlign: 'left',
  },
  description: {
    marginTop: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontWeight: '200',
    color: colors.detailSceenText,
    textAlign: 'left',
  },
});

export default ExtendMovieCard;
