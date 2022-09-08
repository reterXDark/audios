import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {calculateTotals, totalItemsInCart} from '../../features/cart/cartSlice';
import {
  DARK_THEME,
  Helvetica_Neue_BoldCondensed,
  Helvetica_Neue_Heavy,
  Helvetica_Neue_Light,
  Helvetica_Neue_Regular,
  LIGHT_THEME,
  PRIMARY_PURPLE,
} from '../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomHeader = ({
  onPressCustom,
  showBackIcon,
  headerText,
  showBackIconColor,
  showCartButton,
  goToCartPress,
}) => {
  const {cartItems, amount, total} = useSelector(store => store.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
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
        {showCartButton === true ? (
          <TouchableOpacity style={styles.headerText} onPress={goToCartPress}>
            <Text style={styles.cartTotaliconText}>{cartItems.length}</Text>
            <TimeIcon name="cart-outline" color={DARK_THEME} size={30} />
          </TouchableOpacity>
        ) : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'tomato',
    marginRight: 30,
  },
  headerText: {
    fontSize: 30,
    fontFamily: Helvetica_Neue_Heavy,
    color: DARK_THEME,
    textAlignVertical: 'center',
    // textAlign: 'left',
    // backgroundColor: 'green',
    alignSelf: 'center',
  },
  cartTotaliconText: {
    backgroundColor: PRIMARY_PURPLE,
    textAlign: 'center',
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    color: LIGHT_THEME,
    left: 20,
    bottom: 20,
    fontFamily: Helvetica_Neue_BoldCondensed,
    textAlignVertical: 'center',
    fontSize: 12,
  },
});

export default CustomHeader;
