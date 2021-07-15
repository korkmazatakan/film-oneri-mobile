import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Directorcard from './widgets/Directorsscreen/Directorcard';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

const Directorsscreen = props => {
  const [isLoading, setLoading] = useState(true);
  const [directors, setDirectors] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${API_URL}api/directors/getall?format=json`)
      .then(response => response.json())
      .then(json => setDirectors(json))
      .catch(error => alert(error))
      .then(setLoading(false));
  }, []);

  const onPressSearchButton = e => {
    fetch(`${API_URL}api/directors/search/?format=json&q=${text}`)
      .then(response => response.json())
      .then(json => setDirectors(json))
      .catch(error => alert(error))
      .then(setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          {
            height: 50,
            backgroundColor: colors.bacground,
          },
        ]}>
        <MaterialCommunityIcons
          onPress={() => props.navigation.openDrawer()}
          style={styles.sidebarIcon}
          name="format-list-bulleted"
          color={colors.primary}
          size={30}
        />
        <Text style={styles.headerText}>Yönetmenler</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={text}
          onChangeText={setText}
          placeholder="Aradığınız yönetmeni giriniz"
          placeholderTextColor={colors.secondary}
          selectionColor={colors.primary}
          underlineColorAndroid={colors.secondary}
        />
        <Button
          color={colors.secondary}
          title="ARA"
          onPress={() => onPressSearchButton()}
        />
      </View>
      <View style={styles.mostReviewed}>
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            directors.map(director => {
              return (
                <Directorcard
                  key={director.id}
                  director={director}
                  navigation={props.navigation}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mostReviewed: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: colors.bacground,
    height: 800,
    width: null,
    backgroundColor: colors.bacground,
  },
  mostReviewedText: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 5,
    color: colors.primary,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 20,
  },
  sidebarIcon: {
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: colors.bacground,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
  },
});

export default Directorsscreen;
