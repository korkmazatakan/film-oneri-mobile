import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';
import {Avatar} from 'react-native-paper';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

const Directorcard = ({director, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detailscreenfordirector', {
          key: director.id,
          director: director,
        })
      }>
      <View
        style={{
          flexDirection: 'column',
          height: 180,
          marginLeft: 15,
        }}>
        <View style={{flex: 1}}>
          <Avatar.Image
            source={{
              uri: `${API_URL}api/directors/poster/${director.id}`,
            }}
            size={150}
          />
        </View>
        <View
          style={{
            flex: 6,
            marginLeft: 180,
            flexDirection: 'column',
          }}>
          <View>
            <Text style={styles.movieName}>
              {director.name.length < 20
                ? director.name
                : `${director.name.substring(0, 19)}..`}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.gnd}>
              {director.born_at.substring(0, 4)} | {director.born_in}
            </Text>
          </View>
          <View style={{flex: 7}}>
            <Text style={styles.description}>
              {director.description.substring(0, 75)}
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
    height: 200,
    resizeMode: 'cover',
  },
  movieName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: colors.detailSceenText,
    textAlign: 'left',
    paddingBottom: 2,
  },
  gnd: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.white,
    textAlign: 'left',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.detailSceenText,
    textAlign: 'left',
  },
});

export default Directorcard;
