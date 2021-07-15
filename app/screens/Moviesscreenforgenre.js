import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import ExtendMovieCard from '../screens/widgets/Homescreen/ExtendMovieCard';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

class Moviesscreenforgenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      movies: [],
      genres: [],
      languages: [],
      isLoading: true,
      genreId: props.route.params.genreId,
    };
  }

  handleUptadeMovie = () => {
    fetch(
      `${API_URL}api/movies/genre/${this.props.route.params.genreId}?format=json`,
    )
      .then(response => response.json())
      .then(json =>
        this.setState({
          movies: json,
          genreId: this.props.route.params.genreId,
        }),
      );
  };

  componentDidMount = () => {
    fetch(`${API_URL}api/languages/getall?format=json`)
      .then(response => response.json())
      .then(json => this.setState({languages: json}))
      .catch(error => console.log(error));

    fetch(`${API_URL}api/genres/getall?format=json`)
      .then(response => response.json())
      .then(json => this.setState({genres: json}))
      .catch(error => console.log(error));

    fetch(
      `${API_URL}api/movies/genre/${this.props.route.params.genreId}?format=json`,
    )
      .then(response => response.json())
      .then(json => this.setState({movies: json}))
      .catch(error => alert(error))
      .then(this.setState({isLoading: false}));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.genreId !== this.props.route.params.genreId) {
      this.handleUptadeMovie();
    }
  }

  onChangeText = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onPressSearchButton = async e => {
    this.setState({isLoading: true});

    await fetch(`${API_URL}api/movies/search/?q=${this.state.text}?format=json`)
      .then(response => response.json())
      .then(json => this.setState({movies: json}))
      .catch(error => alert(error))
      .then(this.setState({isLoading: false}));
  };

  render() {
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
            onPress={() => this.props.navigation.openDrawer()}
            style={styles.sidebarIcon}
            name="format-list-bulleted"
            color={colors.primary}
            size={30}
          />
          <Text style={styles.headerText}>
            {this.props.route.params.genreName}
          </Text>
        </View>
        <View key={this.state.genreId} style={styles.mostReviewed}>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            {this.state.isLoading ? (
              <ActivityIndicator />
            ) : (
              this.state.movies.map(mv => {
                let genreName, languageName;

                this.state.languages.map(language => {
                  if (language.id === mv.language_id) {
                    languageName = language.name;
                  }
                });

                this.state.genres.map(genre => {
                  if (mv.genre_id === genre.id) {
                    genreName = genre.name;
                  }
                });
                return (
                  <ExtendMovieCard
                    key={mv.id}
                    genre={genreName}
                    language={languageName}
                    movie={mv}
                    navigation={this.props.navigation}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default Moviesscreenforgenre;

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
    color: colors.primary,
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 20,
    fontWeight: 'bold',
  },
  sidebarIcon: {
    marginLeft: 10,
  },
});
