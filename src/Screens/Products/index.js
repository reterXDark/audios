import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import PickupDetailsHeadline from '../../Components/PickupDetailsHeadline';
import {DARK_THEME} from '../../helper/commonStyle';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';

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
  }) => {
    props.navigation.navigate(NavigationStrings.ProductDetails, {
      id: id,
      packageName: packageName,
      packageDescription: packageDescription,
      price: price,
      SpeakerImage: SpeakerImage,
      quantity: quantity,
    });
  };

  const navigateToProductBrands = ({
    id,
    packageName,
    packageDescription,
    price,
    SpeakerImage,
    quantity,
  }) => {
    props.navigation.navigate(NavigationStrings.ProductBrands, {
      id: id,
      packageName: packageName,
      packageDescription: packageDescription,
      price: price,
      SpeakerImage: SpeakerImage,
      quantity: quantity,
    });
  };

  const [Loading, setLoading] = useState(true);
  const [eventpackagesData, seteventpackagesData] = useState([]);
  const [individualpackagesData, setindividualpackagesData] = useState([]);

  const getEventItems = () => {
    /*
    Getting 
    Event Products
   */
    firestore()
      .collection('Products')
      .where('brands', '==', false)
      .get()
      .then(querySnapshot => {
        console.log('Total Event Products: ', querySnapshot.size);
        setLoading(false);
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            console.log(documentSnapshot.data()),
            seteventpackagesData(pre => [...pre, documentSnapshot.data()]),
          );
        });
      })
      .catch(err => {
        console.log('Error getting Event Products', err);
      });
  };
  const getIndividualItems = () => {
    /*
    Getting 
    Individual Products
   */
    firestore()
      .collection('Products')
      .where('brands', '==', true)
      .get()
      .then(querySnapshot => {
        console.log('Total Individual Products: ', querySnapshot.size);
        setLoading(false);
        querySnapshot.forEach(documentSnapshot => {
          setindividualpackagesData(pre => [...pre, documentSnapshot.data()]),
            console.log(console.log(documentSnapshot.data()));
        });
      })
      .catch(err => {
        console.log('Error getting Individual Products', err);
      });
  };

  useEffect(() => {
    const eve = getEventItems();
    const ini = getIndividualItems();
    return () => eve, ini;
  }, [1]);

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

        {Loading ? (
          <ActivityIndicator size={'large'} color={DARK_THEME} />
        ) : (
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
        )}
        {/*  */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Individuals Items</Text>
        </View>
        {Loading ? (
          <ActivityIndicator size={'large'} color={DARK_THEME} />
        ) : (
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
                },
                u,
              ) => {
                return (
                  <IndividualItem
                    key={id}
                    id={id}
                    packageName={packageName}
                    packageDescription={packageDescription}
                    price={price}
                    SpeakerImage={SpeakerImage}
                    onPress={() => {
                      navigateToProductBrands({
                        id,
                        packageName,
                        packageDescription,
                        price,
                        SpeakerImage,
                        quantity,
                      });
                    }}
                  />
                );
              },
            )}
          </View>
        )}
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
