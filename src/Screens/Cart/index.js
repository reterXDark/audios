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
                      <View style={styles.productDescTextContainer}>
                        <Text style={styles.productDescText}>
                          {packageDescription}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/*  */}
                  <View style={styles.brandTypeContainer}>
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
                  </View>
                  {/*  */}
                  <View style={styles.breaker} />
                  {/*  Total Price container */}
                  <View style={styles.totalPriceContainer}>
                    <View style={styles.totalPrice}>
                      <Text style={styles.totalPriceText}>Total price</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.PriceText}>{price}</Text>
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
        </ScrollView>
      ) : (
        <View style={styles.emptySignContainer}>
          <Svg
            width={212}
            height={197}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
              d="M211.282 194.558 60.55 197 .718 185.603h93.406l117.158 8.955Z"
              fill="#E6E6E6"
            />
            <Path
              d="M174.293 51.828c13.317 0 24.112-11.602 24.112-25.914C198.405 11.602 187.61 0 174.293 0c-13.316 0-24.112 11.602-24.112 25.914 0 14.312 10.796 25.914 24.112 25.914Z"
              fill="#FF6584"
            />
            <Path d="M43.373 186.958s.353-7.943 7.583-7.02Z" fill="#3F3D56" />
            <Path
              d="M41.33 179.399c1.999 0 3.619-1.741 3.619-3.889 0-2.148-1.62-3.889-3.619-3.889-1.998 0-3.619 1.741-3.619 3.889 0 2.148 1.62 3.889 3.619 3.889Z"
              fill="#6C63FF"
            />
            <Path
              d="M41.763 182.059H40.74v7.685h1.022v-7.685ZM162.544 188.314s.353-7.942 7.584-7.019Z"
              fill="#3F3D56"
            />
            <Path
              d="M160.502 180.756c1.998 0 3.618-1.741 3.618-3.889 0-2.148-1.62-3.889-3.618-3.889-1.999 0-3.619 1.741-3.619 3.889 0 2.148 1.62 3.889 3.619 3.889Z"
              fill="#6C63FF"
            />
            <Path
              d="M160.934 183.416h-1.021v7.685h1.021v-7.685ZM179.966 189.671s.352-7.942 7.583-7.019Z"
              fill="#3F3D56"
            />
            <Path
              d="M177.923 182.113c1.998 0 3.618-1.741 3.618-3.889 0-2.148-1.62-3.889-3.618-3.889-1.999 0-3.619 1.741-3.619 3.889 0 2.148 1.62 3.889 3.619 3.889Z"
              fill="#6C63FF"
            />
            <Path
              d="M178.355 184.773h-1.021v7.684h1.021v-7.684ZM71.903 183.159s.353-7.943 7.584-7.02Z"
              fill="#3F3D56"
            />
            <Path
              d="M69.86 175.6c2 0 3.62-1.741 3.62-3.889 0-2.148-1.62-3.889-3.62-3.889-1.998 0-3.618 1.741-3.618 3.889 0 2.148 1.62 3.889 3.618 3.889Z"
              fill="#6C63FF"
            />
            <Path
              d="M70.293 178.26h-1.021v7.685h1.021v-7.685ZM18.125 184.516s.352-7.943 7.583-7.02Z"
              fill="#3F3D56"
            />
            <Path
              d="M16.082 176.957c1.998 0 3.619-1.741 3.619-3.889 0-2.148-1.62-3.889-3.62-3.889-1.998 0-3.618 1.741-3.618 3.889 0 2.148 1.62 3.889 3.619 3.889Z"
              fill="#6C63FF"
            />
            <Path
              d="M16.515 179.617h-1.022v7.685h1.022v-7.685ZM105.618 170.714c21.775 0 39.427-18.971 39.427-42.373 0-23.402-17.652-42.373-39.427-42.373-21.774 0-39.426 18.971-39.426 42.373 0 23.402 17.652 42.373 39.426 42.373Z"
              fill="#3F3D56"
            />
            <Path
              d="M80.797 131.742a10.566 10.566 0 0 1 3.587-2.968 9.822 9.822 0 0 1 4.42-1.056c1.528 0 3.036.36 4.42 1.056a10.566 10.566 0 0 1 3.587 2.968c1.676-1.719 2.834-3.937 3.325-6.37a13.328 13.328 0 0 0-.568-7.279c-.861-2.311-2.347-4.292-4.266-5.687-1.918-1.395-4.181-2.141-6.498-2.141-2.316 0-4.58.746-6.498 2.141-1.919 1.395-3.404 3.376-4.266 5.687a13.336 13.336 0 0 0-.568 7.279c.491 2.433 1.65 4.651 3.325 6.37ZM112.106 131.743a10.554 10.554 0 0 1 3.588-2.969 9.819 9.819 0 0 1 4.419-1.056 9.82 9.82 0 0 1 4.42 1.056 10.564 10.564 0 0 1 3.588 2.969c1.675-1.72 2.833-3.938 3.324-6.371a13.326 13.326 0 0 0-.568-7.279c-.861-2.311-2.347-4.292-4.265-5.687-1.919-1.395-4.182-2.141-6.499-2.141-2.316 0-4.579.746-6.498 2.141-1.918 1.395-3.404 3.376-4.266 5.687a13.345 13.345 0 0 0-.568 7.279c.492 2.433 1.65 4.651 3.325 6.371Z"
              fill="#fff"
            />
            <Path
              d="M84.848 122.771c2.203 0 3.99-1.919 3.99-4.287 0-2.367-1.787-4.287-3.99-4.287-2.203 0-3.989 1.92-3.989 4.287 0 2.368 1.786 4.287 3.99 4.287ZM116.156 122.771c2.203 0 3.989-1.919 3.989-4.287 0-2.367-1.786-4.287-3.989-4.287s-3.988 1.92-3.988 4.287c0 2.368 1.785 4.287 3.988 4.287Z"
              fill="#3F3D56"
            />
            <Path
              d="M77.208 143.919c2.562 0 4.639-2.232 4.639-4.985s-2.077-4.985-4.639-4.985c-2.562 0-4.638 2.232-4.638 4.985s2.076 4.985 4.638 4.985ZM130.55 143.919c2.561 0 4.638-2.232 4.638-4.985s-2.077-4.985-4.638-4.985c-2.562 0-4.639 2.232-4.639 4.985s2.077 4.985 4.639 4.985ZM103.879 128.964l-3.479 16.201 5.798-6.231-2.319-9.97Z"
              fill="#FF6584"
            />
            <Path
              d="m121.754 191.277-3.95-3.562.092 3.562h-1.226l-.098-3.767-5.333 3.767h-2.232l7.525-5.316-.509-19.592 1.223-.036.512 19.618 5.903 5.326h-1.907ZM103.199 191.277l-3.95-3.562.092 3.562h-1.223l-.098-3.767-5.333 3.767h-2.232l7.522-5.316-.51-19.592 1.227-.036.51 19.618 5.902 5.326h-1.907ZM106.198 82.853c-1.082 0-2.036.903-2.674 2.29-.562-2.086-1.744-3.537-3.124-3.537-.094.01-.187.027-.278.05-.53-2.226-1.763-3.788-3.2-3.788-1.922 0-3.48 2.79-3.48 6.231S95 90.33 96.922 90.33c.093-.01.186-.027.278-.05.53 2.227 1.763 3.789 3.2 3.789 1.082 0 2.036-.903 2.674-2.29.563 2.086 1.744 3.536 3.124 3.536 1.921 0 3.479-2.79 3.479-6.231s-1.558-6.231-3.479-6.231Z"
              fill="#3F3D56"
            />
            <Path
              d="M68.612 144.399c-1.523 0-3.031-.323-4.438-.949a11.565 11.565 0 0 1-3.762-2.702 12.558 12.558 0 0 1-2.514-4.043 13.271 13.271 0 0 1-.882-4.769v-6.231c0-3.306 1.221-6.476 3.396-8.813 2.175-2.337 5.124-3.65 8.2-3.65v31.157ZM142.625 113.242c1.523 0 3.031.322 4.438.949a11.577 11.577 0 0 1 3.762 2.701 12.552 12.552 0 0 1 2.513 4.043c.583 1.512.883 3.133.883 4.77v6.231c0 1.637-.3 3.257-.883 4.769a12.541 12.541 0 0 1-2.513 4.043 11.566 11.566 0 0 1-3.762 2.702 10.906 10.906 0 0 1-4.438.948v-31.156Z"
              fill="#6C63FF"
            />
            <Path
              d="M148.702 126.684h-1.84c0-25.077-18.983-45.48-42.317-45.48-23.333 0-42.317 20.403-42.317 45.48h-1.84c0-26.168 19.81-47.456 44.157-47.456 24.348 0 44.157 21.288 44.157 47.456Z"
              fill="#6C63FF"
            />
            <Path
              d="m41.406 88.573-.864-.387-4.954-2.251-1.857 5.037 4.942 2.249.026.025-.333.844a1.546 1.546 0 0 0-.116.243c-.233.633.208 1.263.624 1.44.416.178.943-.192 1.177-.825.23-.624.005-1.418-.401-1.61l-.864-.387-2.957-1.235 1.69-4.585-.25-.106-1.691 4.586-.366-.153 1.697-4.604 3.52 1.601.026.026-.333.843a1.534 1.534 0 0 0-.116.244c-.233.633.208 1.263.624 1.44.417.177.943-.192 1.177-.825.23-.625.005-1.418-.401-1.61ZM58.512 100.272c-1.794-1.102-1.435-3.521-1.435-3.521-.046-1.572-1.254-1.35-1.254-1.35l-.44.108a1.254 1.254 0 0 0-.653-.13l-.67.121c1.524.385 1.399 1.754 1.399 1.754l.213 1.601-3.99-1.73.458-1.161a2.13 2.13 0 0 0 .161-.338c.324-.88-.288-1.754-.867-2-.578-.247-1.31.266-1.634 1.146-.32.867-.007 1.969.557 2.235v.001l1.2.537.009-.03 6.946 2.757Zm-2.027-2.813.128 1.532a3.732 3.732 0 0 1-.6-2.346 1.557 1.557 0 0 0-.266-.822c.251.173.453.417.584.706.13.289.183.61.154.93ZM28.07 77.608v-.001l-1.2-.537-5.018-2.097 1.267-1.21a1.586 1.586 0 0 1 1.02-.665c.408-.072.825.028 1.166.28l-.393-.628s-.74-1.051-1.773.06c0 0-1.28 2.028-3.29 1.511l6.864 3.123.036.035-.462 1.172c-.063.107-.117.22-.162.338-.324.88.288 1.754.867 2 .578.247 1.31-.267 1.634-1.146.32-.867.007-1.969-.556-2.235ZM46.439 70.747l-.463 1.172c-.063.108-.117.22-.161.339-.324.879.288 1.754.866 2 .579.246 1.31-.267 1.635-1.146.32-.868.007-1.97-.557-2.236l-1.2-.538-4.107-1.716 2.347-6.367-.348-.148-2.348 6.37-.507-.213 2.356-6.394 4.89 2.224.036.035-.463 1.172c-.063.107-.117.22-.161.338-.324.88.288 1.754.866 2 .579.247 1.31-.267 1.635-1.146.32-.867.007-1.969-.557-2.235v-.001l-1.2-.538-6.881-3.126-2.578 6.997 6.864 3.122.036.035ZM24.686 34.915l.001-.002-2.067-.925-8.637-3.608 2.18-2.085s1.45-2.162 3.763-.662l-.676-1.08s-1.272-1.81-3.052.104c0 0-2.203 3.49-5.663 2.6l11.816 5.375.062.06-.796 2.019c-.109.184-.202.38-.278.582-.557 1.514.496 3.02 1.492 3.443.996.424 2.255-.46 2.813-1.973.55-1.493.013-3.39-.958-3.848ZM31.028 65.227c-4.289-2.636-3.43-8.42-3.43-8.42-.109-3.757-2.997-3.225-2.997-3.225l-1.051.258a3 3 0 0 0-1.564-.311l-1.599.29c3.642.919 3.342 4.192 3.342 4.192l.51 3.828-9.541-4.136 1.095-2.777c.152-.256.281-.527.386-.808.775-2.103-.688-4.194-2.071-4.782-1.384-.59-3.133.638-3.908 2.74-.764 2.074-.017 4.708 1.33 5.344v.003l2.87 1.285.021-.073 16.607 6.592Zm-4.845-6.726.307 3.677c-1.801-2.57-1.433-5.624-1.433-5.624a3.723 3.723 0 0 0-.64-1.966c2.07 1.331 1.766 3.913 1.766 3.913Z"
              fill="#3F3D56"
            />
          </Svg>
          <View style={styles.cartEmptySlogan}>
            <Text style={styles.cartEmptySloganText}>
              Your cart is empty 😐
            </Text>
          </View>
        </View>
      )}

      {/*  */}
    </ScrollView>
  );
};

export default Cart;
