import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import EPDProducts from '../../../features/cart/EPDProducts';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import PickupDetailsHeadline from '../../Components/PickupDetailsHeadline';
import {DARK_THEME, LIGHT_THEME} from '../../helper/commonStyle';
// import SpeakerImage from '../../Images/Speaker.jpg';
import styles from './styles';

const individualpackagesData = [
  {
    id: '1PB',
    packageName: 'Brand 1',
    packageDescription: 'This Package is good for 50+ people...',
    price: 80,
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/cartImage.jpg?alt=media&token=8d9747f9-d682-4a01-b3f4-1e91a7827222',
    quantity: 0,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
  {
    id: '2PB',
    packageName: 'Brand 2',
    packageDescription: 'This Package is good for 50+ people...',
    price: 50,
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/cartImage.jpg?alt=media&token=8d9747f9-d682-4a01-b3f4-1e91a7827222',
    quantity: 0,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
  {
    id: '3PB',
    packageName: 'Brand 3',
    packageDescription: 'This Package is good for 50+ people...',
    price: 20,
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/cartImage.jpg?alt=media&token=8d9747f9-d682-4a01-b3f4-1e91a7827222',
    quantity: 0,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
];

const IndividualItem = ({
  id,
  packageName,
  packageDescription,
  price,
  SpeakerImage,
  onPress,
  quantity,
  // Brand_1,
  // Brand_2,
  // Brand_3,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.imageNameContainer} onPress={onPress}>
        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.7}>
          <Image
            resizeMode="contain"
            style={styles.imageStyles}
            source={{uri: SpeakerImage}}
          />
        </TouchableOpacity>
        <View style={styles.nameDescContainer}>
          <View style={styles.productNameTextContainer}>
            <Text style={styles.productNameText}>{packageName}</Text>
          </View>
          <View style={styles.productDescTextContainer}>
            <Text style={styles.productDescText}>{packageDescription}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.PriceText}>{`$ ${price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.breaker} />
    </>
  );
};

const ProductsBrands = props => {
  const back = () => {
    props.navigation.goBack();
  };
  const goToCart = () => {
    props.navigation.navigate(NavigationStrings.Cart);
  };
  const navigateToDetails = ({
    id,
    packageName,
    packageDescription,
    price,
    SpeakerImage,
    quantity,
    // Brand_1,
    // Brand_2,
    // Brand_3,
  }) => {
    props.navigation.navigate(NavigationStrings.ProductDetails, {
      id: id,
      packageName: packageName,
      packageDescription: packageDescription,
      price: price,
      SpeakerImage: SpeakerImage,
      quantity: quantity,
      // Brand_1: Brand_1,
      // Brand_2: Brand_2,
      // Brand_3: Brand_3,
    });
  };

  return (
    <View style={styles.container}>
      {/*  */}
      <CustomHeader
        headerText={`All ${props.route.params.packageName}`}
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
      {/* up pickup details */}
      <PickupDetailsHeadline />
      {/*  */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Products Brands */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Brands</Text>
        </View>
        <View style={styles.individualContainer}>
          {individualpackagesData.map(
            (
              {
                id,
                packageName,
                packageDescription,
                SpeakerImage,
                price,
                quantity,
                // Brand_1,
                // Brand_2,
                // Brand_3,
              },
              u,
            ) => {
              // const {Name1, Bquantity1, Bprice1} = Brand_1;
              // const {Name2, Bquantity2, Bprice2} = Brand_2;
              // const {Name3, Bquantity3, Bprice3} = Brand_3;
              return (
                <IndividualItem
                  key={id}
                  id={id}
                  packageName={packageName}
                  packageDescription={packageDescription}
                  price={price}
                  SpeakerImage={props.route.params.SpeakerImage}
                  // Brand_1={Brand_1}
                  // Brand_2={Brand_2}
                  // Brand_3={Brand_3}
                  onPress={() => {
                    navigateToDetails({
                      id,
                      packageName,
                      packageDescription,
                      price,
                      SpeakerImage,
                      quantity,
                      // Brand_1,
                      // Brand_2,
                      // Brand_3,
                    });
                  }}
                />
              );
            },
          )}
        </View>
        {/*  */}
        <TouchableOpacity
          style={styles.customButton}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate(NavigationStrings.Cart);
          }}>
          <Text style={styles.customButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductsBrands;
