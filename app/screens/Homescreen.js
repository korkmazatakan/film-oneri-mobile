import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import colors from '../config/colors';
import ExtendMovieCard from './widgets/Homescreen/ExtendMovieCard';
import SmallMovieCard from './widgets/Homescreen/SmallMovieCard';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';

const API_URL = 'https://filmoneriapi.otokon.tech/';

const Homescreen = ({navigation}) => {
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [randomMovies, setRandomMovies] = useState([]);
  const [lastMovies, setLastMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/Languages/getall`)
      .then(response => response.json())
      .then(json => setLanguages(json))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}api/Genres/getall`)
      .then(response => response.json())
      .then(json => setGenres(json))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}api/Directors/getall`)
      .then(response => response.json())
      .then(json => setDirectors(json.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}api/Movies/getrandom?number=5`)
      .then(response => response.json())
      .then(json => setRandomMovies(json))
      .catch(error => console.log(error))
      .then(setLoading2(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}api/Movies/getlastmovies?count=5`)
      .then(response => response.json())
      .then(json => setLastMovies(json))
      .catch(error => console.log(error))
      .then(() => setLoading1(false));
  }, []);

  useEffect(() => {
    if (isLoading1 === false && isLoading2 === false) {
      SplashScreen.hide();
    }
  });

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
          onPress={() => navigation.openDrawer()}
          style={styles.sidebarIcon}
          name="format-list-bulleted"
          color={colors.secondary}
          size={30}
        />
        <Text style={styles.headerText}>Anasayfa</Text>
      </View>
      {/* Last Released Movies */}
      <View>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.lastReleasedBanner}>
            <Text style={styles.lastReleasedText}>Son Eklediğimiz Filmler</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {isLoading1 ? (
                <ActivityIndicator />
              ) : (
                lastMovies.map(mv => {
                  let genreName, languageName, directorName;

                  languages.map(language => {
                    if (language.id === mv.languageId) {
                      languageName = language.name;
                    }
                  });

                  directors.map(director => {
                    if (director.id === mv.directorId) {
                      directorName = director.name;
                    }
                  });

                  genres.map(genre => {
                    if (genre.id === mv.genreId) {
                      genreName = genre.genreName;
                    }
                  });
                  return (
                    <SmallMovieCard
                      key={mv.id}
                      movie={mv}
                      genre={genreName}
                      language={languageName}
                      director={directorName}
                      navigation={navigation}
                    />
                  );
                })
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      {/* Top Review Movies */}
      <View style={styles.mostReviewed}>
        <Text style={styles.mostReviewedText}>Günün Filmleri</Text>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.mostReviewed}>
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}>
              {isLoading2 ? (
                <ActivityIndicator />
              ) : (
                randomMovies.map(mv => {
                  let genreName, languageName, directorName;

                  languages.map(language => {
                    if (language.id === mv.languageId) {
                      languageName = language.name;
                    }
                  });

                  directors.map(director => {
                    if (director.id === mv.directorId) {
                      directorName = director.name;
                    }
                  });

                  genres.map(genre => {
                    if (mv.genreId === genre.id) {
                      genreName = genre.genreName;
                    }
                  });
                  return (
                    <ExtendMovieCard
                      key={mv.id}
                      genre={genreName}
                      language={languageName}
                      director={directorName}
                      movie={mv}
                      navigation={navigation}
                    />
                  );
                })
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bacground,
    flex: 1,
  },
  lastReleasedText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    paddingHorizontal: 5,
    paddingBottom: 5,
    color: colors.primary,
    textAlign: 'center',
  },
  lastReleasedBanner: {
    flex: 1,
  },
  mostReviewed: {
    flex: 1,
  },
  mostReviewedText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    marginVertical: 10,
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
    fontFamily: 'Roboto-Regular',
    color: colors.secondary,
    fontSize: 18,
    textAlign: 'center',
    paddingRight: 20,
  },
  sidebarIcon: {
    marginLeft: 10,
  },
});

export default Homescreen;
