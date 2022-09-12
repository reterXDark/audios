import React, {useState, useRef, Fragment, useEffect, useCallback} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Button,
  StyleSheet,
  Appearance,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';
import Customamrk from '../../Images/markerImg.png';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import styles from './styles';
import {
  DARK_THEME,
  DISABLED,
  LIGHT_THEME,
  PRIMARY_PURPLE,
} from '../../helper/commonStyle';
import CustomHeader from '../../Components/CustomHeader';
import {useSelector} from 'react-redux';
import {StackRouter} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import PickupCityBottomSheet from 'reanimated-bottom-sheet';
import DropOffCityBottomSheet from 'reanimated-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import {TotalCart} from '../../../features/cart/cartSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];
const mapLightStyle = [];

const colorScheme = Appearance.getColorScheme();

const Rental = props => {
  /*Date Function and states*/
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPickupDTP, setShowPickupDTP] = useState(false);
  const [text, settext] = useState('');
  const [DeleviveryLocationName, setDeleviveryLocationName] = useState('');

  const showMode = currentMode => {
    setShowPickupDTP(true);
    setMode(currentMode);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickupDTP(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let fDate = `${tempDate.getDate()}/${tempDate.getMonth() + 1}`;
    let fTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`;

    settext(`${fDate}, ${fTime}`);
    console.log(fDate);
  };

  /*Date Function and states 2*/
  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [showPickupDTP1, setShowPickupDTP1] = useState(false);
  const [text1, settext1] = useState('');

  const showMode1 = currentMode1 => {
    setShowPickupDTP1(true);
    setMode1(currentMode1);
  };

  const onDateChange1 = (event, selectedDate1) => {
    const currentDate1 = selectedDate1 || date;
    setShowPickupDTP1(Platform.OS === 'ios');
    setDate1(currentDate1);

    let tempDate1 = new Date(currentDate1);

    let fDate1 = `${tempDate1.getDate()}/${tempDate1.getMonth() + 1}`;
    let fTime1 = `${tempDate1.getHours()}:${tempDate1.getMinutes()}`;

    settext1(`${fDate1}, ${fTime1}`);
    console.log(fDate1);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const [DbbColor, setDbbColor] = useState(true);

  const sheetRef = useRef();
  const fall = new Animated.Value(1);

  const [Pickupregion, setPickupregion] = useState({
    latitude: 37.137615,
    longitude: -95.74037,
    latitudeDelta: 0.105,
    longitudeDelta: 0.105,
  });

  const [PickupregionPin, setPickupregionPin] = useState({
    latitude: 37.137615,
    longitude: -95.74037,
  });

  const storeLocationData = async value => {
    console.log('hust run');
    try {
      await AsyncStorage.setItem('dev_location', value);
    } catch (e) {
      // console.error('Error on Storing Location ', e);
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderPickupContent = () => (
    <View style={styles.PickupCityBottomSheetContinaer}>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        debounce={500}
        textInputProps={{
          placeholderTextColor: DISABLED,
          focusable: true,
          style: {
            color: '#000',
            width: '75%',
            backgroundColor: '#fff',
            alignSelf: 'center',
          },
        }}
        predefinedPlacesAlwaysVisible={true}
        placeholder="Enter an address"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: '',
          type: 'hospital',
          radius: 2.1134410777,
        }}
        onPress={(data, details) => {
          setPickupregionPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
          setDeleviveryLocationName(
            `${details.name},${details.formatted_address}`,
          );
          setDeleviveryLocationName(details.name);
          console.log('Region after Select the Place: ', PickupregionPin);
          console.log(details);
        }}
        query={{
          language: 'en',
          key: 'AIzaSyCgTXTy8JDUtqsYi9KHoA4rE7jBmaD0MSA',
          location: `${Pickupregion.latitude}, ${Pickupregion.longitude}`,
          components: 'country:us',
          rankby: 'distance',
          radius: 30000,
          type: 'address',
        }}
        styles={{
          container: styles.placesSuperContainer,
          listView: styles.listViewStyles,
          description: styles.descriptionStyles,
          textInputContainer: styles.textInputContainerStyles,
        }}
        renderRightButton={() => {
          return (
            <View style={styles.renderRightButtonStyles}>
              <Search name="search" size={20} color={DISABLED} />
            </View>
          );
        }}
      />
      {false && (
        <View style={styles.selectedLocationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressNameText}>AAA Audios</Text>
            <Text style={styles.addressText}>375 East Ave, SF, CA 94111</Text>
            <Text style={styles.addressDistance}>1.2 miles away</Text>
            <Text style={styles.addressContact}>Phone Numer: 415 000 0000</Text>
            <Text style={styles.addressBHours}>Business Hours: 11am - 7pm</Text>
          </View>
          <TouchableOpacity
            style={styles.selecteAddressButton}
            activeOpacity={0.7}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      )}
      <MapView
        style={styles.map}
        customMapStyle={colorScheme === 'dark' ? mapDarkStyle : mapLightStyle}
        showsCompass={true}
        mapType={'standard'}
        showsBuildings={true}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={Pickupregion}>
        <Marker
          key={'PICKUP_MAP_MARKER'}
          title="Dropoff Location"
          description="This is a Description"
          coordinate={PickupregionPin}
          identifier={'mark1'}
          image={Customamrk}
          draggable={true}
          // centerOffset={{x: 0, y: 0}}
          // onDragStart={e => {
          // }}
          onDragEnd={e => {
            setPickupregionPin(e.nativeEvent.coordinate);
            console.log('Drag start', PickupregionPin);
          }}
        />
      </MapView>
    </View>
  );

  const renderPickupHeader = () => (
    <View
      style={{
        backgroundColor: DARK_THEME,
        width: '100%',
        height: 50,
        // position: 'absolute',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={styles.bottomSheetHeaderText}>Pickup at</Text>
    </View>
  );

  const renderPickupShadow = () => {
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Animated.View style={styles.container}>
        <CustomHeader headerText={`Rental`} />
        {/* Header */}
        <View style={styles.rentalOptionsContainer}>
          <View style={styles.pickupOptionContainer}>
            <Text
              style={[
                styles.pickupOptionText,
                {borderBottomColor: DbbColor ? PRIMARY_PURPLE : LIGHT_THEME},
              ]}
              onPress={() => {
                setDbbColor(true);
                setPbbColor(false);
              }}>
              Delivery
            </Text>
          </View>
        </View>
        {/* switch */}
        {/* <View style={styles.pickupswitchContainer}>
          <Switch
            trackColor={{false: '#DADADA', true: '#DADADA'}}
            thumbColor={isEnabled ? PRIMARY_PURPLE : DARK_THEME}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.pickupswitchText}>Different return location</Text>
        </View> */}

        <ScrollView contentContainerStyle={styles.scrollViewInfo} scrollEnabled>
          <View style={styles.rentalInformationContainer}>
            <View style={styles.labelAndInputContainer}>
              <View style={styles.inputLabelTextContainer}>
                <Text style={styles.labelText}>Delivery Date</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="i.e: Oct 10, 09:00 am"
                  placeholderTextColor={'#737373'}
                  style={styles.inputStyle}
                  value={text}
                  onChangeText={text => {
                    settext(text);
                  }}
                />
                <View style={styles.inputIconContainer}>
                  <TimeIcon
                    name="calendar-month-outline"
                    size={20}
                    color="#000"
                    onPress={() => {
                      showMode('date');
                    }}
                  />
                  <TimeIcon
                    name="clock-time-four-outline"
                    size={20}
                    color="#000"
                    onPress={() => {
                      showMode('time');
                    }}
                  />
                </View>
              </View>
            </View>
            {showPickupDTP && (
              <DateTimePicker
                key={'PickupData'}
                testID="DateTimePicker"
                value={date}
                mode={mode}
                display={'default'}
                onChange={onDateChange}
                is24Hour={false}
              />
            )}
            {/*  */}
            <View style={styles.labelAndInputContainer}>
              <View style={styles.inputLabelTextContainer}>
                <Text style={styles.labelText}>Return Date</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="i.e: Oct 10, 09:00 am"
                  placeholderTextColor={'#737373'}
                  style={styles.inputStyle}
                  value={text1}
                  onChangeText={text => {
                    settext1(text);
                  }}
                />
                <View style={styles.inputIconContainer}>
                  <TimeIcon
                    name="calendar-month-outline"
                    size={20}
                    color="#000"
                    onPress={() => {
                      showMode1('date');
                    }}
                  />
                  <TimeIcon
                    name="clock-time-four-outline"
                    size={20}
                    color="#000"
                    onPress={() => {
                      showMode1('time');
                    }}
                  />
                </View>
              </View>
            </View>
            {showPickupDTP1 && (
              <DateTimePicker
                key={'ReturnData'}
                testID="DateTimePicker"
                value={date1}
                mode={mode1}
                display={'default'}
                onChange={onDateChange1}
                is24Hour={false}
              />
            )}

            {/*  */}
            <View style={styles.labelAndInputContainer}>
              <View style={styles.inputLabelTextContainer}>
                <Text style={styles.labelText}>Delivery Location</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Locate nearby stores"
                  placeholderTextColor={'#737373'}
                  style={styles.inputStyle}
                  value={DeleviveryLocationName}
                />
                <TouchableOpacity
                  style={styles.inputIconContainer1}
                  onPress={() => sheetRef.current.snapTo(0)}>
                  <TimeIcon name="map" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
            {/*  */}
          </View>
          <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.5}
            onPress={() => {
              storeLocationData(DeleviveryLocationName);
            }}>
            <Text style={styles.customButtonText}>Select Equipment</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
      {renderPickupShadow()}
      <PickupCityBottomSheet
        ref={sheetRef}
        snapPoints={[500, 400, 0]}
        initialSnap={2}
        // borderRadius={20}
        callbackNode={fall}
        enabledContentGestureInteraction={false}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
        renderContent={renderPickupContent}
        renderHeader={renderPickupHeader}
      />
    </GestureHandlerRootView>
  );
};

export default Rental;
