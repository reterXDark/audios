import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Rect, Ellipse, Path} from 'react-native-svg';
import AppLogo from '../../Images/AppLogo.png';
import MapView from '../../Images/mapView.jpg';
import styles from './styles';
import CustomHeader from '../../Components/CustomHeader';
import {DARK_THEME} from '../../helper/commonStyle';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import PickupDetailsHeadline from '../../Components/PickupDetailsHeadline';
import {useDispatch, useSelector} from 'react-redux';

const Receipt = (props, {navigation}) => {
  const {cartItems, amount, total} = useSelector(store => store.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(NavigationStrings.OrderHistory);
    }, 3000);
    dispatch(calculateTotals());
  }, [cartItems]);
  const back = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/*  */}
      <CustomHeader
        headerText={'Rental'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          back();
        }}
      />
      {/*  */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Svg
          pointerEvents={Platform.OS === 'android' ? 'box-none' : 'auto'}
          width={385}
          height={700}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <Rect x={20} width={345} height={700} rx={20} fill="#fff" />
          <Ellipse cx={20} cy={142.933} rx={20} ry={18.667} fill="#231F20" />
          <Ellipse cx={365} cy={142.933} rx={20} ry={18.667} fill="#231F20" />
          <Path
            stroke="#CDCDCD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 10"
            d="M52.5 142.5h279"
          />
          <View style={styles.updownContainer}>
            <View style={styles.upperContainer}>
              <View style={styles.logoContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.logoStyle}
                  source={AppLogo}
                />
              </View>
              <View style={styles.greetingTextContainer}>
                <Text style={styles.greetingText}>
                  Thanks for your order, Yani!
                </Text>
              </View>
              <View style={styles.orderTextContainer}>
                <Text style={styles.orderText}>
                  Your order number is:{' '}
                  <Text style={styles.orderNoText}>AX1234567</Text>
                </Text>
              </View>
            </View>
            <View style={styles.downContainer}>
              {/* Heading */}
              <View style={styles.headingOrderSummaryContainer}>
                <Text style={styles.headingOrderSummaryText}>
                  Order Summary
                </Text>
              </View>
              <View style={styles.breaker} />
              {/* Date And Time */}
              <View style={styles.dateTimeContainer}>
                {/* Rental Starts At */}
                <View style={styles.startContainer}>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startText}>Rental Starts At</Text>
                  </View>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startDescText}>01 Oct 10:00 AM</Text>
                  </View>
                </View>
                {/* Ends At */}
                <View style={styles.startContainer}>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startText}>Ends At</Text>
                  </View>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startDescText}>02 Oct 10:00 AM</Text>
                  </View>
                </View>
              </View>
              {/* Map View */}
              <Pressable
                style={styles.mapViewContainer}
                activeOpacity={0.8}
                onPress={() => {
                  console.log('pressed');
                  props.navigation.navigate(NavigationStrings.FullMapView);
                }}>
                <Image
                  style={styles.imageMapVIewStyles}
                  resizeMode="contain"
                  source={MapView}
                />
              </Pressable>
              {/* Item Info */}
              <View style={styles.itemInfoContainer}>
                <View style={styles.startContainer}>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startText}>Item Info</Text>
                  </View>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startDescText}>DJ in the House</Text>
                  </View>
                </View>
                <View style={styles.startContainer}>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startText}>Quantity</Text>
                  </View>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startDescText}>1</Text>
                  </View>
                </View>
                <View style={styles.startContainer}>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startText}>Price</Text>
                  </View>
                  <View style={styles.startTextContainer}>
                    <Text style={styles.startDescText}>$200</Text>
                  </View>
                </View>
              </View>
              {/* breaker */}
              <View style={styles.breaker} />
              {/* Total Container */}
              <View style={styles.grandTotalContainer}>
                <View style={styles.subContainer}>
                  <Text style={styles.subtotalText}>Subtotal</Text>
                  <Text style={styles.subtotalText}>$200</Text>
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
                  <Text style={styles.totalCost}>${total}</Text>
                </View>
              </View>
              {/* End */}
            </View>
          </View>
        </Svg>
      </ScrollView>
    </View>
  );
};

export default Receipt;
