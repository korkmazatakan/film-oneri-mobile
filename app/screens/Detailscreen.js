import React from 'react';
/* Components */
import {View, ScrollView, Text, StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import colors from '../config/colors';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

const Detailscreen = ({route, navigation}) => {
  /* get params */
  const {genre, language, director, movie} = route.params;

  function renderContent() {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: colors.detailScreenBackground,
            alignContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 800,
          }}>
          <View style={{flexDirection: 'column', paddingHorizontal: 2}}>
            <View style={{flexDirection: 'row', margin: 7}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.detailScreenBackground2,
                  borderRadius: 20,
                  paddingVertical: 13,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Antonio-SemiBold',
                    color: colors.detailScreenTitles,
                    fontSize: 28,
                  }}>
                  {movie.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 5,
                    paddingHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Antonio-Light',
                      color: colors.detailScreenTitles,
                      fontSize: 23,
                    }}>
                    {genre} | {movie.release_date.substring(0, 4)} | {language}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                color: colors.detailSceenText,
                flex: 1,
                fontSize: 17,
                paddingHorizontal: 5,
                fontFamily: 'Roboto-Regular',
              }}>
              {movie.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  function renderNavBar() {
    return (
      <View style={[styles.header]}>
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          style={styles.sidebarIcon}
          name="arrow-left"
          color={colors.primary}
          size={26}
        />
        <Text style={styles.headerText}>{director}</Text>
      </View>
    );
  }
  function renderToolBar() {
    return <View style={{backgroundColor: 'blue'}} />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CollapsibleToolbar
        renderContent={renderContent}
        renderNavBar={renderNavBar}
        imageSource={`${API_URL}api/movies/poster/${movie.id}`}
        collapsedNavBarBackgroundColor={colors.bottomBarBackground}
        toolBarHeight={300}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  poster: {
    borderRadius: 10,
    width: 450,
    height: 300,
    resizeMode: 'cover',
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,

    right: 0,
  },
  headerText: {
    fontWeight: 'bold',
    marginTop: 12,
    marginRight: 10,
    color: colors.primary,
    fontSize: 18,
  },
  sidebarIcon: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
  },
});
export default Detailscreen;
