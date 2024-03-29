import {StyleSheet, Dimensions} from 'react-native';
import {
  DARK,
  DARK_THEME,
  Helvetica_Neue_Bold,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Heavy,
  Helvetica_Neue_Light,
  Helvetica_Neue_Medium,
  Helvetica_Neue_Regular,
  INPUT_BORDER_COLOR,
  LIGHT_THEME,
  PRIMARY_PURPLE,
} from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_THEME,
    // ...StyleSheet.absoluteFillObject,
  },
  headerContainer: {
    backgroundColor: LIGHT_THEME,
    width: windowWidth * 1.0,
    height: windowHeight * 0.17,
    elevation: 6,
    justifyContent: 'flex-end',
  },
  headerTextContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'tomato',
    marginRight: 30,
  },
  headerText: {
    fontSize: 35,
    fontFamily: Helvetica_Neue_Heavy,
    color: DARK_THEME,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  rentalOptionsContainer: {
    // backgroundColor: 'green',
    height: 'auto',
    width: windowWidth * 1.0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pickupOptionContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.3,
    height: 'auto',
    // margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupOptionText: {
    fontFamily: Helvetica_Neue_Medium,
    fontSize: 22,
    borderBottomColor: PRIMARY_PURPLE,
    borderBottomWidth: 2,
    color: DARK_THEME,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: windowHeight * 0.02,
  },
  pickupswitchContainer: {
    // backgroundColor: 'tomato',
    width: 'auto',
    height: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  pickupswitchText: {
    fontFamily: Helvetica_Neue_Light,
    color: '#737373',
  },
  scrollViewInfo: {
    // backgroundColor: 'green',
    width: windowWidth * 1.0,
    height: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rentalInformationContainer: {
    backgroundColor: LIGHT_THEME,
    height: 'auto',
    width: windowWidth * 0.9,
    elevation: 3,
    borderRadius: 20,
    marginTop: windowHeight * 0.05,
    paddingTop: 20,
    paddingBottom: 20,
  },
  labelAndInputContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'space-around',
  },
  inputLabelTextContainer: {
    //     backgroundColor: 'green',
    alignItems: 'flex-start',
  },
  labelText: {
    fontSize: 20,
    fontFamily: Helvetica_Neue_Bold,
    color: DARK_THEME,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  inputContainer: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderWidth: 0.5,
    borderColor: INPUT_BORDER_COLOR,
    // backgroundColor: 'tomato',
  },
  inputStyle: {
    fontFamily: Helvetica_Neue_BoldCondensed,
    fontSize: 18,
    //     backgroundColor: 'tomato',
    width: windowWidth * 0.6,
    color: DARK_THEME,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  dropdown: {
    height: 40,
    borderRadius: 7,
    paddingHorizontal: 17,
    backgroundColor: LIGHT_THEME,
    // elevation: 1,
    width: windowWidth * 0.75,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: Helvetica_Neue_BoldCondensed,
    color: '#737373',
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: Helvetica_Neue_BoldCondensed,
    color: '#737373',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerrrrStyle: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 100,
    elevation: 10,
  },
  inputIconContainer: {
    // backgroundColor: 'tomato',
    height: 'auto',
    width: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputIconContainer1: {
    // backgroundColor: 'tomato',
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  bottomSheetHeaderText: {
    fontFamily: Helvetica_Neue_Medium,
    fontSize: 16,
    color: LIGHT_THEME,
    textAlign: 'center',
  },
  PickupCityBottomSheetContinaer: {
    height: windowHeight * 1.0,
    alignItems: 'center',
    elevation: 10,
    width: windowWidth * 1.0,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  placesSuperContainer: {
    flex: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  listViewStyles: {
    backgroundColor: 'white',
    color: DARK_THEME,
  },
  descriptionStyles: {
    color: DARK_THEME,
  },
  textInputContainerStyles: {
    backgroundColor: LIGHT_THEME,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  renderRightButtonStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_THEME,
    alignSelf: 'center',
  },
  selectedLocationContainer: {
    backgroundColor: LIGHT_THEME,
    flex: 0,
    position: 'absolute',
    width: '90%',
    height: '18%',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 10,
    borderRadius: 10,
    top: 280,
    bottom: -200,
    flexDirection: 'row',
  },
  addressContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    height: windowHeight * 0.14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  addressNameText: {
    fontFamily: Helvetica_Neue_BoldCondensed,
    color: DARK_THEME,
    fontSize: 15,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  addressText: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 12,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  addressDistance: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 12,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  addressContact: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 12,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  addressBHours: {
    fontFamily: Helvetica_Neue_Light,
    color: DARK_THEME,
    fontSize: 12,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  selecteAddressButton: {
    backgroundColor: PRIMARY_PURPLE,
    width: windowWidth * 0.37,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    elevation: 4,
  },
  selectButtonText: {
    fontFamily: Helvetica_Neue_Medium,
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: LIGHT_THEME,
  },
  deliveryInfoStyles: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    width: windowWidth * 0.8,
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
  },
  deliveryInfoStylesText: {
    // backgroundColor: 'red',
    color: DARK_THEME,
    fontSize: 14,
    fontFamily: Helvetica_Neue_BoldCondensed,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
});

export default styles;
