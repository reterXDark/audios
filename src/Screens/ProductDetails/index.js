import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import User from 'react-native-vector-icons/FontAwesome5';
import {Rating} from 'react-native-ratings';
import CounterSign from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import {DARK_THEME, PRIMARY_PURPLE} from '../../helper/commonStyle';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../features/cart/cartSlice';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProductDetails = ({navigation, route}) => {
  console.log(route);
  let {
    id,
    packageName,
    packageDescription,
    price,
    SpeakerImage,
    quantity,
    // Brand_1,
    // Brand_2,
    // Brand_3,
  } = route.params;

  // let {Name1, Bquantity1, Bprice1} = Brand_1;
  // let {Name2, Bquantity2, Bprice2} = Brand_2;
  // let {Name3, Bquantity3, Bprice3} = Brand_3;
  // console.log(Brand_1);
  // console.log(Brand_2);
  // console.log(Brand_3);

  // const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(quantity);

  const dispatch = useDispatch();

  const images = [
    require('../../Images/prductdetails.jpg'),
    require('../../Images/prductdetails.jpg'),
    require('../../Images/prductdetails.jpg'),
    require('../../Images/prductdetails.jpg'),
  ];
  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  const [active, setActive] = useState(0);

  const Change = nativeEvent => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  const back = () => {
    navigation.goBack();
  };

  const goToCart = () => {
    navigation.navigate(NavigationStrings.Cart);
  };

  const navigateTocart = () => {
    setTimeout(() => {
      navigation.navigate(NavigationStrings.Cart);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader
        headerText={'Products Details'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          back();
        }}
        showCartButton={true}
        goToCartPress={() => {
          goToCart();
        }}
      />
      {/* headerend */}
      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled>
        <View style={styles.ImageSwiperContainer}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={({nativeEvent}) => Change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            style={styles.imageSwiper}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{uri: SpeakerImage}}
                style={{
                  width: windowWidth * 1.0,
                  height: windowHeight * 0.3,
                  borderRadius: 1,
                }}
                resizeMode={'contain'}
              />
            ))}
          </ScrollView>
          <View style={styles.hoverPriceContainer}>
            <Text style={styles.hoverPriceText}>{`$ ${price}`}</Text>
          </View>
          <View style={styles.dotStyle}>
            {images.map((i, k) => (
              <Text
                key={k}
                style={
                  k == active ? styles.pagingActiveText : styles.pagingText
                }>
                ⬤
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.ProductDetailsContainer}>
          <View style={styles.nameAndReviewContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText}>{packageName}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <Rating
                type="star"
                ratingCount={6}
                imageSize={10}
                ratingColor={PRIMARY_PURPLE}
                //               showRating
                onFinishRating={ratingCompleted}
              />
              <Text style={styles.nameText}>(20)</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{packageDescription}</Text>
          </View>
          <View style={styles.whatInsdeContainer}>
            <Text style={styles.nameText}>What is included?</Text>
            <Text style={styles.descriptionText}>
              2 x Audios Speakers, 1 x Mixer set, 1 x Mircophone.
            </Text>
          </View>
        </View>

        <View style={styles.breaker} />

        {/* <View style={styles.brandTypeContainer}>
          <TouchableOpacity activeOpacity={0.5} style={styles.brandType1}>
            <Text style={styles.brandNameText}>{Name1}</Text>
            <Text style={styles.brandPriceText}>{`$ ${Bprice1}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.brandType2}>
            <Text style={styles.brandNameText}>{Name2}</Text>
            <Text style={styles.brandPriceText}>{`$ ${Bprice2}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.brandType3}>
            <Text style={styles.brandNameText}>{Name3}</Text>
            <Text style={styles.brandPriceText}>{`$ ${Bprice3}`}</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.breaker} />

        <View style={styles.quantityContainer}>
          {/* <View style={styles.inputContainer}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              autoScroll
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerrrrStyle}
              data={result}
              maxHeight={120}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Qty' : '...'}
              value={value}
              showsVerticalScrollIndicator={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View> */}
          <View style={styles.counterContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                value !== 0 ? setValue(value - 1) : setValue(value);
                quantity = quantity - 1;
              }}
              disabled={value > 0 ? false : true}>
              <CounterSign
                name="minus-circle"
                size={20}
                color={value > 0 ? DARK_THEME : 'grey'}
              />
            </TouchableOpacity>
            <Text style={styles.PriceText}>{value}</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <CounterSign
                name="plus-circle"
                size={20}
                color={DARK_THEME}
                onPress={() => {
                  setValue(value + 1);
                  quantity = quantity + 1;
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        <TouchableOpacity
          style={styles.customButton}
          activeOpacity={0.5}
          onPress={() => {
            quantity = value;
            dispatch(
              addToCart({
                id,
                packageName,
                packageDescription,
                quantity,
                price,
                SpeakerImage,
              }),
              navigateTocart(),
            );
          }}>
          <Text style={styles.customButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        <View style={styles.breaker} />

        <View style={styles.publicReviewsContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={styles.nameText}>Reviews</Text>
          </View>
          <View style={styles.userReviewContainer}>
            <View style={styles.logoNameAndDateContainer}>
              <User name="user-circle" size={20} color={'#000'} />
              <Text style={styles.UserNameText}>Qing P.</Text>
              <Text style={styles.userReviewDate}>Dec 12, 2019</Text>
            </View>
            <View style={styles.ratedStyles}>
              <Rating
                type="star"
                ratingCount={6}
                imageSize={10}
                ratingColor={PRIMARY_PURPLE}
                //               showRating
                onFinishRating={ratingCompleted}
                readonly={true}
              />
            </View>
            <View style={styles.subject}>
              <Text style={styles.nameText}>
                Audios has the best speakers!!
              </Text>
            </View>
            <View style={styles.reviewdescriptionContainer}>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmo....
              </Text>
            </View>
          </View>
          <View style={styles.userReviewContainer}>
            <View style={styles.logoNameAndDateContainer}>
              <User name="user-circle" size={20} color={'#000'} />
              <Text style={styles.UserNameText}>Qing P.</Text>
              <Text style={styles.userReviewDate}>Dec 12, 2019</Text>
            </View>
            <View style={styles.ratedStyles}>
              <Rating
                type="star"
                ratingCount={6}
                imageSize={10}
                ratingColor={PRIMARY_PURPLE}
                //               showRating
                onFinishRating={ratingCompleted}
                readonly={true}
              />
            </View>
            <View style={styles.subject}>
              <Text style={styles.nameText}>
                Audios has the best speakers!!
              </Text>
            </View>
            <View style={styles.reviewdescriptionContainer}>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmo....
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.customButton} activeOpacity={0.5}>
            <Text style={styles.customButtonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
