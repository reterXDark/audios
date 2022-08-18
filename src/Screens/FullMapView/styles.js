import {StyleSheet, Dimensions} from 'react-native';
import {
  DARK_THEME,
  Helvetica_Neue_Bold,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Light,
  Helvetica_Neue_Medium,
  LIGHT_THEME,
  PRIMARY_PURPLE,
} from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: DARK_THEME,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  selectedLocationContainer: {
    backgroundColor: LIGHT_THEME,
    flex: 0,
    position: 'absolute',
    width: '90%',
    height: '12%',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 10,
    borderRadius: 10,
    top: '85%',
    bottom: '-200%',
    flexDirection: 'row',
    paddingLeft: 30,
  },
  addressContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    height: windowHeight * 0.16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  addressNameText: {
    fontFamily: Helvetica_Neue_Bold,
    color: DARK_THEME,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  Distance: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 13,
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 'auto',
    width: 'auto',
  },
  EstimatedDelivery: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 13,
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 'auto',
    width: 'auto',
  },
});

export default styles;
