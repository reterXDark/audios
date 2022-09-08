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

const eventpackagesData = [
  {
    id: '1A',
    packageName: '300 Person Package',
    packageDescription:
      'This package is good for an event with 300 people or less',
    price: 200,
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/prductdetails.jpg?alt=media&token=046215ea-d223-45a0-9846-9d7f4b8c3d53',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
  {
    id: '1B',
    packageName: '1000 Person Package',
    packageDescription:
      'This package is good for an event with 1000 people or less',
    price: 500,
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/prductdetails.jpg?alt=media&token=046215ea-d223-45a0-9846-9d7f4b8c3d53',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
];
const individualpackagesData = [
  {
    id: '2A',
    packageName: 'Mixer',
    packageDescription: 'This Package is good for 50+ people...',
    price: '20 - 80',
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/cartImage.jpg?alt=media&token=8d9747f9-d682-4a01-b3f4-1e91a7827222',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 6, Bprice1: 500},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 8, Bprice2: 200},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 9, Bprice3: 400},
  },
  {
    id: '2B',
    packageName: 'LED Light',
    packageDescription: 'This Package is good for 50+ people...',
    price: '20 - 80',
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/LEDLight.jpg?alt=media&token=589df23d-ab15-4395-957b-3a2ea8b301cb',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 0, Bprice1: 600},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 0, Bprice2: 700},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 0, Bprice3: 200},
  },
  {
    id: '2C',
    packageName: 'Microphone',
    packageDescription: 'This Package is good for 50+ people...',
    price: '20 - 80',
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/Microphone.jpg?alt=media&token=c460f143-d639-4728-8405-3364c1a13670',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 0, Bprice1: 700},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 0, Bprice2: 860},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 0, Bprice3: 100},
  },
  {
    id: '2D',
    packageName: 'Wireless Loudspeaker',
    packageDescription:
      'Audios speakers can reliably connect and stream synch...',
    price: '20 - 80',
    SpeakerImage:
      'https://firebasestorage.googleapis.com/v0/b/audio-74b54.appspot.com/o/prductdetails.jpg?alt=media&token=046215ea-d223-45a0-9846-9d7f4b8c3d53',
    quantity: 1,
    // Brand_1: {Name1: 'Brand 1', Bquantity1: 0, Bprice1: 540},
    // Brand_2: {Name2: 'Brand 2', Bquantity2: 0, Bprice2: 420},
    // Brand_3: {Name3: 'Brand 3', Bquantity3: 0, Bprice3: 600},
  },
];

const EventItem = ({
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
      <TouchableOpacity
        style={styles.imageNameContainer}
        activeOpacity={0.5}
        onPress={onPress}>
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={0.8}
          onPress={onPress}>
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

const Products = props => {
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

  const navigateToProductBrands = ({
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
    props.navigation.navigate(NavigationStrings.ProductBrands, {
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
        headerText={'Products'}
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
        {/*  */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Event Packages</Text>
        </View>
        <View style={styles.eventpakgContainer}>
          {eventpackagesData.map(
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
            ) => (
              <EventItem
                key={id}
                id={id}
                packageName={packageName}
                packageDescription={packageDescription}
                price={price}
                SpeakerImage={SpeakerImage}
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
            ),
          )}
        </View>
        {/*  */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Individuals Items</Text>
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
                  SpeakerImage={SpeakerImage}
                  // Brand_1={Brand_1}
                  // Brand_2={Brand_2}
                  // Brand_3={Brand_3}
                  onPress={() => {
                    navigateToProductBrands({
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

export default Products;
