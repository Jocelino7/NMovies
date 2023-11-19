import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';


import { color } from './src/types/ui/color';
import { Home } from './src/types/ui/screens/Home';
import MovieDetail from './src/types/ui/screens/MovieDetailt';
import Search from './src/types/ui/screens/Search';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenProps } from './src/types/types';
import { NavigationContainer } from '@react-navigation/native';
import { netWorkStore } from './src/stores/NetworkStore';
import { useNetInfo } from "@react-native-community/netinfo";
import { NetWorkModal } from './src/types/ui/components/NetWorkModal';
import SplashScreen from 'react-native-splash-screen';
function App(): JSX.Element {
  const { isConnected, isInternetReachable } = useNetInfo();
  const Stack = createStackNavigator<ScreenProps>()
  const setRetry = netWorkStore((state) => state.setRetry)
  const showModal = netWorkStore((state) => state.showModal)
  const setShowModal = netWorkStore((state) => state.setShowModal)
  function handleSetRetry(){
    if(!isConnected||!isInternetReachable){
      return
    }
    setShowModal(false)
    setRetry(true)
  }
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  useEffect(() => {
    if(isConnected==false || isInternetReachable==false){
      setShowModal(true)
    } 
  }, [isConnected])
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        backgroundColor={color.primary}
      />
      <NetWorkModal show={showModal} onButtonPress={() => handleSetRetry()} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={
          {
            headerStyle: {
              backgroundColor: color.redColor,
            },
            headerTintColor: color.secondary
          }
        }>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Detail' component={MovieDetail} />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: color.primary,
  },

});

export default App;
