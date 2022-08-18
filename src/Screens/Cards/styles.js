import {StyleSheet, Dimensions} from 'react-native';
import {
  DARK_THEME,
  Helvetica_Neue_Heavy,
  Helvetica_Neue_Medium,
  LIGHT_THEME,
} from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: LIGHT_THEME,
  },
  headerContainer: {
    backgroundColor: LIGHT_THEME,
    width: windowWidth * 1.0,
    height: windowHeight * 0.17,
    elevation: 6,
    justifyContent: 'flex-end',
  },
  headerBackIconContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    //     backgroundColor: 'green',
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
    fontSize: 35,
    fontFamily: Helvetica_Neue_Heavy,
    color: DARK_THEME,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  customButton: {
    backgroundColor: DARK_THEME,
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    // marginTop: windowHeight * 0.04,
    alignSelf: 'center',
    elevation: 3,
  },
  customButtonText: {
    fontFamily: Helvetica_Neue_Medium,
    color: LIGHT_THEME,
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
});

export default styles;
