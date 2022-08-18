import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationStrings from './NavigationStrings';
import HomeIcon from 'react-native-vector-icons/Entypo';
import SpeakerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RentalIcon from 'react-native-vector-icons/FontAwesome';
import ProfileLogo from 'react-native-vector-icons/FontAwesome5';

import {
  Cards,
  Cart,
  Checkout,
  FullMapView,
  OrderHistory,
  ProductDetails,
  Products,
  Profile,
  Receipt,
  Rental,
  RestPassword,
  Signup,
  Splash,
} from '../src/Screens';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  DARK_THEME,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Regular,
} from '../src/helper/commonStyle';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Rental}>
      <HomeStack.Screen name={NavigationStrings.Rental} component={Rental} />
    </HomeStack.Navigator>
  );
};

const SpeakerStack = createNativeStackNavigator();

const SpeakerStackNavigator = () => {
  return (
    <SpeakerStack.Navigator screenOptions={{headerShown: false}}>
      {/* <SpeakerStack.Screen name={NavigationStrings.Rental} component={Rental} /> */}
    </SpeakerStack.Navigator>
  );
};

const RentalStack = createNativeStackNavigator();

const RentalStackNavigator = () => {
  return (
    <RentalStack.Navigator
      initialRouteName={NavigationStrings.Products}
      screenOptions={{headerShown: false}}>
      <RentalStack.Screen
        name={NavigationStrings.Products}
        component={Products}
      />
      <RentalStack.Screen
        name={NavigationStrings.ProductDetails}
        component={ProductDetails}
      />
      <RentalStack.Screen name={NavigationStrings.Cart} component={Cart} />
      <RentalStack.Screen
        name={NavigationStrings.Checkout}
        component={Checkout}
      />

      <RentalStack.Screen name={NavigationStrings.Cards} component={Cards} />
      <RentalStack.Screen
        name={NavigationStrings.Receipt}
        component={Receipt}
      />
      <RentalStack.Screen
        name={NavigationStrings.FullMapView}
        component={FullMapView}
      />
      <RentalStack.Screen
        name={NavigationStrings.RestPassword}
        component={RestPassword}
      />
      <RentalStack.Screen
        name={NavigationStrings.OrderHistory}
        component={OrderHistory}
      />
      <RentalStack.Screen name={NavigationStrings.Signup} component={Signup} />
    </RentalStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name={NavigationStrings.Profile}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const tabsNavigator = () => {
  const NullComp = () => {
    return null;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 80,
            alignItems: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
          },
          tabBarHideOnKeyboard: true,
          tabBarButton: props => (
            <TouchableOpacity {...props} activeOpacity={0.3} />
          ),
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <>
                <HomeIcon name="home" color={DARK_THEME} size={22} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: Helvetica_Neue_BoldCondensed,
                    fontSize: 11,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Home
                </Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Speaker"
          component={NullComp}
          options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <>
                <SpeakerIcon name="speaker" color={DARK_THEME} size={25} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: Helvetica_Neue_BoldCondensed,
                    fontSize: 11,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Speaker
                </Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Rental"
          component={RentalStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <>
                <RentalIcon name="credit-card" color={DARK_THEME} size={22} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: Helvetica_Neue_BoldCondensed,
                    fontSize: 11,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Rental
                </Text>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <>
                <ProfileLogo name="user-circle" color={DARK_THEME} size={22} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: Helvetica_Neue_BoldCondensed,
                    fontSize: 11,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Profile
                </Text>
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default tabsNavigator;
