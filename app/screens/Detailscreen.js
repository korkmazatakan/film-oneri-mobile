import React from 'react';
/* Components */
import {View, ScrollView, Text, StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import colors from '../config/colors';

const API_URL = 'https://filmoneriapi.otokon.tech/';

const Detailscreen = ({route, navigation}) => {
  /* get params */
  const {genre,language, movie} = route.params;

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
            <View style={{flexDirection: 'row', marginHorizontal: 2}}>
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
                    fontSize: 35,
                  }}>
                  {movie.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  paddingTop: 5,
                  paddingHorizontal: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Antonio-Light',
                    color: colors.detailScreenTitles,
                    fontSize: 30,
                  }}>
                  {genre}
                </Text>
                <Text
                  style={{
                    marginLeft: 45,
                    fontFamily: 'Antonio-Light',
                    color: colors.detailScreenTitles,
                    fontSize: 22,
                  }}>
                  {language}
                </Text>
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
        <Text style={styles.headerText}>{movie.name}</Text>
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
        imageSource={`${API_URL}uploads/moviecontent/posters/${movie.poster}`}
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
