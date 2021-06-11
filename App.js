import React, {useEffect, useState} from 'react';
/* Components */
import {useWindowDimensions} from 'react-native';
/* Screens */
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homescreen from './app/screens/Homescreen';
import Detailscreen from './app/screens/Detailscreen';
import Moviesscreen from './app/screens/Moviesscreen';
import Directorsscreen from './app/screens/Directorsscreen';
import Detailscreenfordirector from './app/screens/Detailscreenfordirector';
import Moviesscreenfordirector from './app/screens/Moviesscreenfordirector';
import Moviesscreenforgenre from './app/screens/Moviesscreenforgenre';
/* Sidebar */
import {DrawerContent} from './app/screens/widgets/ui/DrawerContent';
import OneSignal from 'react-native-onesignal';
/* Colors */

const Drawer = createDrawerNavigator();

const API_URL = 'https://filmoneriapi.otokon.tech/';

const App = () => {
  const [genres, setGenres] = useState([]);
  const [isSubscribed, setSubscribed] = useState(null);

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  useEffect(() => {
    fetch(`${API_URL}api/Genres/getall`)
      .then(res => res.json())
      .then(json => setGenres(json))
      .catch(err => alert(err));

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('a79591af-5cbf-424a-85a7-d7c713e5cb0d');

    const deviceState = OneSignal.getDeviceState();

    setSubscribed(deviceState.isSubscribed);
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Anasayfa"
        drawerContent={props => <DrawerContent {...props} genres={genres} />}
        drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={isLargeScreen ? null : {width: '80%'}}
        overlayColor="transparent">
        <Drawer.Screen name="Anasayfa" component={Homescreen} />
        <Drawer.Screen name="Detailscreen" component={Detailscreen} />
        <Drawer.Screen name="Moviesscreen" component={Moviesscreen} />
        <Drawer.Screen name="Directorsscreen" component={Directorsscreen} />
        <Drawer.Screen
          name="Moviesscreenfordirector"
          component={Moviesscreenfordirector}
        />
        <Drawer.Screen
          name="Moviesscreenforgenre"
          component={Moviesscreenforgenre}
        />
        <Drawer.Screen
          name="Detailscreenfordirector"
          component={Detailscreenfordirector}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
