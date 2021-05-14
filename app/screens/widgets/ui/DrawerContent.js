import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {Text, Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../config/colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export const DrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.appInfo}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../../../assets/imgs/AtoLogo.png')}
                size={100}
              />
              <View style={styles.header}>
                <Title style={{fontFamily: 'Roboto-Medium', fontSize: 25}}>
                  Film Önerileri
                </Title>
                <Caption style={styles.caption}>Lezzetli filmler...</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
            icon={({color, size}) => (
              <MaterialCommunityIcons
                style={styles.sidebarIcon}
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Anasayfa"
            onPress={() => {
              props.navigation.navigate('Anasayfa');
            }}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <MaterialCommunityIcons
                style={styles.sidebarIcon}
                name="movie-open-outline"
                color={color}
                size={size}
              />
            )}
            label="Tüm Filmler"
            onPress={() => {
              props.navigation.navigate('Moviesscreen');
            }}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <MaterialCommunityIcons
                style={styles.sidebarIcon}
                name="movie-roll"
                color={color}
                size={size}
              />
            )}
            label="Yönetmenler"
            onPress={() => {
              props.navigation.navigate('Directorsscreen');
            }}
          />
          <Item genres={props.genres} navigation={props.navigation} />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={({color, size}) => (
            <MaterialCommunityIcons
              style={styles.sidebarIcon}
              name="account-circle"
              color={color}
              size={size}
            />
          )}
          label="İletişim"
          onPress={() =>
            Alert.alert(
              'İletişim Bilgileri',
              'Şikayet ve dileklerinizi bildirmek veya\neditör olmak için bu kaynaklardan bize ulaşabilirsiniz.\n\nE-mail: filmoneri@otokon.tech\n',
              [
                {
                  text: 'Bize Katıl!',
                  onPress: () =>
                    Linking.openURL(
                      'mailto:filmoneri@otokon.tech?subject=From_App_Contact',
                    ),
                  style: 'default',
                },
                {cancelable: true},
              ],
            )
          }
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarIcon: {
    paddingVertical: 5,
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerContent: {
    flex: 1,
  },
  appInfo: {
    paddingLeft: 25,
  },
  header: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20,
  },
  cation: {
    lineHeight: 14,
  },
  bottomDrawerSection: {
    marginBottom: 1,
    borderTopColor: colors.detailSceenText,
    borderTopWidth: 1,
  },
  item: {
    width: '100%',
    paddingHorizontal: 17,
    overflow: 'hidden',
    paddingVertical: 10,
  },
});

const Item = props => {
  const [open, setopen] = useState(false);
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };
  return (
    <TouchableOpacity
      style={[styles.item, !open && {height: 50}]}
      onPress={onPress}
      activeOpacity={1}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <MaterialCommunityIcons
          name="account-circle"
          color={open ? colors.bacground : colors.detailSceenTitle}
          size={25}
          style={{marginRight: 35}}
        />
        <Text
          style={{
            color: open ? colors.bacground : colors.detailSceenTitle,
            flex: 1,
          }}>
          Film Türleri
        </Text>
        <MaterialCommunityIcons
          name={open ? 'chevron-up' : 'chevron-down'}
          color={open ? colors.bacground : colors.detailSceenTitle}
          size={25}
        />
      </View>
      {open && (
        <View style={{paddingTop: 15}}>
          {props.genres.map(genre => (
            <TouchableOpacity
              key={genre.id}
              onPress={() =>
                props.navigation.navigate('Moviesscreenforgenre', {
                  genreId: genre.id,
                  genreName: genre.genreName,
                })
              }>
              <View
                style={{
                  marginBottom: 3,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: colors.secondary,
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Text>{genre.genreName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};
