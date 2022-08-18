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
import {
  DARK_THEME,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Medium,
  LIGHT_THEME,
} from '../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PickupDetailsHeadline = () => {
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

  return (
    <View style={styles.pickupDetails}>
      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>Pickup</Text>
      </View>
      <View style={styles.lowerTextContainer}>
        <Text style={styles.lowerText}>{`AAA Audios  ${text} `}</Text>
        <TouchableOpacity
          activeOpacity={0.1}
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
          <EditIcon name="mode-edit" color={LIGHT_THEME} size={20} />
        </TouchableOpacity>
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
});
