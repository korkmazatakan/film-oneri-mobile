import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import ExtendMovieCard from '../screens/widgets/Homescreen/ExtendMovieCard';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Button,
} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URL = 'https://moviesuggestionwebapi.azurewebsites.net/';

const Moviesscreen = props => {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${API_URL}api/Genres/getall`)
      .then(response => response.json())
      .then(json => setGenres(json))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}api/Movies/getall`)
      .then(response => response.json())
      .then(json => setMovies(json))
      .catch(error => alert(error))
      .then(setLoading(false));
  }, []);

  const onPressSearchButton = e => {
    fetch(`${API_URL}api/Movies/search?searchQuery=${text}`)
      .then(response => response.json())
      .then(json => setMovies(json))
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
        <Text style={styles.headerText}>Tüm Filmler</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={text}
          onChangeText={setText}
          placeholder="Aradığınız filmi giriniz"
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
            movies.map(mv => {
              let genreName;
              genres.map(genre => {
                if (mv.genreId === genre.id) {
                  genreName = genre.genreName;
                }
              });
              return (
                <ExtendMovieCard
                  key={mv.id}
                  genre={genreName}
                  movie={mv}
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

export default Moviesscreen;
