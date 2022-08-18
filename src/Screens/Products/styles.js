import {StyleSheet, Dimensions} from 'react-native';
import {
  DARK_THEME,
  Helvetica_Neue_Bold,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Heavy,
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
    fontSize: 35,
    fontFamily: Helvetica_Neue_Heavy,
    color: DARK_THEME,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  scrollContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: LIGHT_THEME,
    width: windowWidth * 1.0,
    height: 'auto',
    marginTop: windowHeight * 0.01,
    paddingBottom: 20,
  },
  headingContainer: {
    // backgroundColor: 'tomato',
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.9,
  },
  heading: {
    fontFamily: Helvetica_Neue_Medium,
    color: DARK_THEME,
    fontSize: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  eventpakgContainer: {
    backgroundColor: LIGHT_THEME,
    alignSelf: 'center',
    width: windowWidth * 0.95,
    height: 'auto',
    elevation: 4,
    borderRadius: 20,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
  },
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
  individualContainer: {
    backgroundColor: LIGHT_THEME,
    alignSelf: 'center',
    width: windowWidth * 0.95,
    height: 'auto',
    elevation: 4,
    borderRadius: 20,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.03,
  },
  imageNameContainer: {
    // backgroundColor: '#fff',
    width: windowWidth * 0.86,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: windowHeight * 0.02,
    // marginBottom: windowHeight * 0.02,
    borderRadius: 5,
  },
  imageContainer: {
    // backgroundColor: 'green',
    width: windowWidth * 0.3,
    height: windowHeight * 0.12,
  },
  imageStyles: {
    // backgroundColor: 'green',
    width: windowWidth * 0.3,
    height: windowHeight * 0.12,
  },
  nameDescContainer: {
    // backgroundColor: 'gold',
    width: windowWidth * 0.55,
    height: windowHeight * 0.12,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  productNameTextContainer: {
    // backgroundColor: 'green',
    width: windowWidth * 0.5,
    height: 'auto',
    justifyContent: 'center',
  },
  productNameText: {
    fontFamily: Helvetica_Neue_Medium,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: DARK_THEME,
  },
  productDescText: {
    fontFamily: Helvetica_Neue_BoldCondensed,
    fontSize: 13,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: DARK_THEME,
  },
  productDescTextContainer: {
    // backgroundColor: 'green',
    width: windowWidth * 0.55,
    height: 'auto',
    justifyContent: 'center',
  },
  priceContainer: {
    // backgroundColor: 'green',
    width: windowWidth * 0.55,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  PriceText: {
    fontFamily: Helvetica_Neue_Bold,
    fontSize: 19,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: PRIMARY_PURPLE,
  },
  counterContainer: {
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    width: windowWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  grandTotalContainer: {
    backgroundColor: LIGHT_THEME,
    width: windowWidth * 0.95,
    height: windowHeight * 0.2,
    elevation: 4,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  breaker: {
    backgroundColor: '#DADADA',
    width: windowWidth * 0.8,
    height: 1,
    marginTop: windowHeight * 0.01,
    // marginBottom: windowHeight * 0.01,
    alignSelf: 'center',
  },
  customButton: {
    backgroundColor: DARK_THEME,
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: windowHeight * 0.02,
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
