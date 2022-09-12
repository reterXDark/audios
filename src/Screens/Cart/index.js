import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import CounterSign from 'react-native-vector-icons/MaterialCommunityIcons';
import cartImage from '../../Images/cartImage.jpg';
import {DARK_THEME, LIGHT_THEME} from '../../helper/commonStyle';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import {useSelector, useDispatch} from 'react-redux';
import Svg, {Path, Circle} from 'react-native-svg';
import CartImage from '../../Images/cart_logo_image.png';
import styles from './styles';
import {
  calculateTotals,
  clearTheCart,
  decrease,
  increase,
  removeItem,
} from '../../../features/cart/cartSlice';
import PickupDetailsHeadline from '../../Components/PickupDetailsHeadline';

const Cart = ({navigation}, props) => {
  const {cartItems, amount, total} = useSelector(store => store.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  console.log(`Total : ${total} & Amount : ${amount}`);
  const back = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      {/* Header */}
      <CustomHeader
        headerText={'Cart'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          back();
        }}
      />
      {/* Black PickupHeadline */}
      <PickupDetailsHeadline />
      {/*  */}

      {cartItems.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Cart Summary </Text>
          </View>
          {/* Cart summary Container */}
          {cartItems.map(
            (
              {
                id,
                packageName,
                packageDescription,
                price,
                quantity,
                SpeakerImage,
              },
              key,
            ) => {
              return (
                <View style={styles.cartSummaryContainer} key={id}>
                  {/*  */}
                  <View style={styles.imageNameContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        resizeMode="contain"
                        style={styles.imageStyles}
                        source={{uri: SpeakerImage}}
                      />
                    </View>
                    <View style={styles.nameDescContainer}>
                      <View style={styles.productNameTextContainer}>
                        <Text style={styles.productNameText}>
                          {packageName}
                        </Text>
                      </View>
                      {/* <View style={styles.productDescTextContainer}>
                        <Text style={styles.productDescText}>
                          {packageDescription}
                        </Text>
                      </View> */}
                    </View>
                  </View>
                  {/*  */}
                  {/* <View style={styles.brandTypeContainer}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.brandType1}>
                      <Text style={styles.brandNameText}>Brand 1</Text>
                      <Text style={styles.brandPriceText}>$ 200</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.brandType2}>
                      <Text style={styles.brandNameText}>Brand 2</Text>
                      <Text style={styles.brandPriceText}>$ 300</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.brandType3}>
                      <Text style={styles.brandNameText}>Brand 3</Text>
                      <Text style={styles.brandPriceText}>$ 400</Text>
                    </TouchableOpacity>
                  </View> */}
                  {/*  */}
                  <View style={styles.breaker} />
                  {/*  Total Price container */}
                  <View style={styles.totalPriceContainer}>
                    <View style={styles.totalPrice}>
                      <Text style={styles.totalPriceText}>Total price</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.PriceText}>{`$ ${price}`}</Text>
                      <View style={styles.counterContainer}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            if (quantity === 1) {
                              dispatch(removeItem({id}));
                              return;
                            }
                            dispatch(decrease({id}));
                          }}>
                          <CounterSign
                            name="minus-circle"
                            size={20}
                            color={DARK_THEME}
                          />
                        </TouchableOpacity>
                        <Text style={styles.PriceText}>{quantity}</Text>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            dispatch(increase({id}));
                          }}>
                          <CounterSign
                            name="plus-circle"
                            size={20}
                            color={DARK_THEME}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            },
          )}
          {/* Grand Container */}
          <View style={styles.grandTotalContainer}>
            <View style={styles.subContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalText}>{`$ ${total}`}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subtotalText}>Delivery fee</Text>
              <Text style={styles.subtotalText}>$0</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.subtotalText}>Tax</Text>
              <Text style={styles.subtotalText}>$0</Text>
            </View>
            <View style={styles.breaker2} />
            <View style={styles.subContainer}>
              <Text style={styles.totalCost}>Total cost:</Text>
              <Text style={styles.totalCost}>{`$ ${total}`}</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.5}
            onPress={() => {
              // navigation.navigate(NavigationStrings.Checkout);
              dispatch(clearTheCart());
            }}>
            <Text style={styles.customButtonText}>Clear Cart</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate(NavigationStrings.Checkout);
              // dispatch(clearTheCart());
            }}>
            <Text style={styles.customButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate(NavigationStrings.Products);
              // dispatch(clearTheCart());
            }}>
            <Text style={styles.customButtonText}>Go Back Shopping</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.emptySignContainer}>
          <Image style={styles.cartImageStyles} source={CartImage} />
          <View style={styles.cartEmptySlogan}>
            <Text style={styles.cartEmptySloganText}>Your cart is empty.</Text>
          </View>
        </View>
      )}

      {/*  */}
    </ScrollView>
  );
};

export default Cart;
