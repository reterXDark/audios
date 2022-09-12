import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DARK_THEME,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Medium,
  LIGHT_THEME,
} from '../helper/commonStyle';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PickupDetailsHeadline = () => {
  const [DevlocationDATA, setDevlocationDATA] = useState(
    'AAA Audios, Street 15',
  );

  /*Date Function and states*/
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPickupDTP, setShowPickupDTP] = useState(false);
  const [text, settext] = useState('');

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

    settext(`${fDate}    ${fTime}`);
    console.log(fDate);
  };

  const getLocationData = async () => {
    try {
      const value = await AsyncStorage.getItem('dev_location');
      if (value !== null) {
        setDevlocationDATA(value);
        // console.warn('Success Getting Location Data', value);
      }
    } catch (e) {
      // console.error('Error getting Location Data', e);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <View style={styles.pickupDetails}>
      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>Pickup</Text>
      </View>
      <View style={styles.lowerTextContainer}>
        <Text style={styles.lowerText}>{DevlocationDATA}</Text>
        <Text style={styles.lowerText}>{`${text}`}</Text>
        <View
          style={{marginRight: 20}}
          onPress={() => {
            setMode('date');
            setShowPickupDTP(true);
          }}>
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
          <View style={styles.inputIconContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <TimeIcon
                name="calendar-month-outline"
                size={20}
                color={LIGHT_THEME}
                onPress={() => {
                  showMode('date');
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <TimeIcon
                name="clock-time-four-outline"
                size={20}
                color={LIGHT_THEME}
                onPress={() => {
                  showMode('time');
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupDetailsHeadline;

const styles = StyleSheet.create({
  pickupDetails: {
    backgroundColor: DARK_THEME,
    width: windowWidth * 1.0,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  upperTextContainer: {
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    width: windowWidth * 0.9,
    alignItems: 'flex-start',
  },
  upperText: {
    fontFamily: Helvetica_Neue_BoldCondensed,
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 20,
    color: LIGHT_THEME,
  },
  lowerTextContainer: {
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    width: windowWidth * 0.9,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  lowerText: {
    fontFamily: Helvetica_Neue_Medium,
    fontSize: 16,
    // backgroundColor: 'green',
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 20,
    color: LIGHT_THEME,
  },
  inputIconContainer: {
    // backgroundColor: 'tomato',
    height: 'auto',
    width: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
