import {StyleSheet, Dimensions} from 'react-native';
import {
  DARK_THEME,
  Helvetica_Neue_Bold,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Heavy,
  Helvetica_Neue_Light,
  LIGHT_THEME,
} from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_THEME,
  },
  logoStyles: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.15,
    height: windowHeight * 0.08,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  appNameText: {
    fontFamily: Helvetica_Neue_Light,
    fontSize: 30,
    color: DARK_THEME,
    marginTop: windowHeight * 0.01,
  },
});

export default styles;
