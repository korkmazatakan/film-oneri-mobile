import React from 'react';
/* Components */
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import colors from '../config/colors';
import {API_URL} from '@env';

//const API_URL = 'https://filmoneriapi.otokon.tech/';

const Detailscreenfordirector = ({route, navigation}) => {
  /* get params */
  const {director} = route.params;

  function renderContent() {
    return (
      <View
        style={{
          flex: 1,
          minHeight: 600,
          backgroundColor: colors.detailScreenBackground,
        }}>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.detailScreenBackground,
            }}>
            <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 2}}>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  backgroundColor: colors.detailScreenBackground2,
                  borderRadius: 20,
                  paddingVertical: 13,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Antonio-SemiBold',
                    color: colors.detailScreenTitles,
                    fontSize: 35,
                  }}>
                  {director.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  paddingTop: 5,
                  marginHorizontal: 5,
                }}>
                <Text style={styles.bornIn}>{director.born_in}</Text>
                <Text
                  style={{
                    marginLeft: 45,
                    fontFamily: 'Antonio-Light',
                    color: colors.detailScreenTitles,
                    fontSize: 22,
                  }}>
                  {director.born_at.substring(0, 4)}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 15,
                  color: colors.detailSceenText,
                  fontSize: 17,
                  padding: 5,
                }}>
                {director.description}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Moviesscreenfordirector', {
                  directorId: director.id,
                  directorName: director.name,
                });
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  backgroundColor: colors.primary,
                  height: 65,
                  paddingVertical: 10,
                  marginVertical: 15,
                }}>
                <Text style={styles.button}>Yönetmenin Tüm Filmlerini Gör</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
        <Text style={styles.headerText}>{director.name}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CollapsibleToolbar
        renderContent={renderContent}
        renderNavBar={renderNavBar}
        imageSource={`${API_URL}api/directors/poster/${director.id}`}
        collapsedNavBarBackgroundColor={colors.bottomBarBackground}
        toolBarHeight={300}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    fontFamily: 'Antonio-SemiBold',
    color: colors.detailScreenBackground,
    fontSize: 30,
    paddingHorizontal: 17,
  },
  bornIn: {
    fontFamily: 'Antonio-SemiBold',
    color: colors.detailScreenTitles,
    fontSize: 30,
  },
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
export default Detailscreenfordirector;
