import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DARK_THEME,
  Helvetica_Neue_Heavy,
  LIGHT_THEME,
} from '../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomHeader = ({
  onPressCustom,
  showBackIcon,
  headerText,
  showBackIconColor,
}) => {
  return (
    <View style={styles.headerContainer}>
      {showBackIcon === true ? (
        <TouchableOpacity
          style={styles.headerBackIconContainer}
          onPress={onPressCustom}>
          <TimeIcon name="chevron-left" color={showBackIconColor} size={40} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: LIGHT_THEME,
    width: windowWidth * 1.0,
    height: windowHeight * 0.15,
    elevation: 6,
    justifyContent: 'flex-end',
  },
  headerBackIconContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    // backgroundColor: 'green',
    marginRight: 50,
  },
  headerTextContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignSelf: 'center',
    //     backgroundColor: 'tomato',
    marginRight: 30,
  },
  headerText: {
    fontSize: 30,
    fontFamily: Helvetica_Neue_Heavy,
    color: DARK_THEME,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
});

export default CustomHeader;
