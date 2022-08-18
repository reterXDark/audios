import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Navigation from './Navigation/Navigation';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LIGHT_THEME} from './src/helper/commonStyle';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from './Store';
import {calculateTotals} from './features/cart/cartSlice';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  // let {cartItems, isLoading} = useSelector(store => store.cart);
  useEffect(() => {
    calculateTotals();
  }, []);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyA3RmGuYArJwHk2uZCeybL1hDOQf4K-5Vk',
      authDomain: 'audio-74b54.firebaseapp.com',
      // databaseURL:
      //   'https://gsapp-74111-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'audio-74b54',
      storageBucket: 'audio-74b54.appspot.com',
      messagingSenderId: '1092425348778',
      appId: '1:1092425348778:web:f194c6d8c878c09c0342d3',
      measurementId: 'G-WNJK3J5ZGK',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  });

  return (
    <StripeProvider
      publishableKey="pk_test_51L16rICwcmjjhlmkIZfR6lfghbYv68BqjMVsMJs42jiG1NYBMFLPd1uuuSxnoww2R7wdKgo5v2KyrBFs0EGKy2D000CojFt0si"
      merchantIdentifier="merchant.indentifier">
      <Provider store={Store}>
        <SafeAreaView style={{flex: 1, backgroundColor: LIGHT_THEME}}>
          <StatusBar backgroundColor={LIGHT_THEME} barStyle="dark-content" />
          <Navigation />
          <Toast position="top" bottomOffset={20} visibilityTime={3000} />
        </SafeAreaView>
      </Provider>
    </StripeProvider>
  );
};

export default App;
