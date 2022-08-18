// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CardsIcon from 'react-native-vector-icons/FontAwesome';
// import CustomHeader from '../../Components/CustomHeader';
// import styles from './styles';
// import {DARK_THEME} from '../../helper/commonStyle';
// import NavigationStrings from '../../../Navigation/NavigationStrings';

// const Cards = props => {
//   const back = () => {
//     props.navigation.goBack();
//   };
//   return (
//     <View style={styles.container}>
//       {/*  */}
//       <CustomHeader
//         headerText={'Add New Card'}
//         showBackIcon={true}
//         showBackIconColor={DARK_THEME}
//         onPressCustom={() => {
//           back();
//         }}
//       />
//       {/*  */}
//       <View>
//         <CardsIcon name="cc-mastercard" color={'#7474'} size={300} />
//       </View>
//       <TouchableOpacity
//         style={styles.customButton}
//         activeOpacity={0.5}
//         onPress={() => {
//           props.navigation.navigate(NavigationStrings.Receipt);
//         }}>
//         <Text style={styles.customButtonText}>Add This Card</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Cards;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardsIcon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../Components/CustomHeader';
import styles from './styles';
import {
  DARK_THEME,
  DISABLED,
  Helvetica_Neue_BoldCondensed,
} from '../../helper/commonStyle';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import {
  CardField,
  StripeProvider,
  useStripe,
  CardForm,
} from '@stripe/stripe-react-native';
const Cards = props => {
  const {confirmPayment} = useStripe();
  const [Key, setKey] = useState('');

  const back = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      amount: 300,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`http://localhost:3000/payment`, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log('intent', res);
        console.log('res.clientSecret', res.clientSecret);
        if (res.clientSecret) {
          setKey(res.clientSecret);
          console.log('res.clientSecret', res.clientSecret);
        } else {
          alert('An unknown error has been occured');
        }
      })
      .catch(e => {
        Alert.alert(e.message);
        console.log('Error before', e);
      });
  }, []);

  const handleConfirmation = async () => {
    let key = null;

    console.log('KeyKeyKeyKeyKey', Key);
    if (Key) {
      const {paymentIntent, error} = await confirmPayment(Key, {
        paymentMethodType: 'Card',
        billingDetails: {
          email: 'umarhayat9855@gmail.com',
        },
      });

      if (!error) {
        Alert.alert(
          'Received payment',
          `Billed for ${paymentIntent?.amount} Invoice will be send on Email`,
        );
        console.log('Payment Done', paymentIntent);
        setTimeout(() => {
          props.navigation.navigate(NavigationStrings.Receipt);
        }, 3000);
      } else {
        Alert.alert('Error after', error.message);
        console.log('paymentIntent', error.message);
      }
    } else {
      console.log('Key is not fing');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <CustomHeader
          headerText={'Add New Card'}
          showBackIcon={true}
          showBackIconColor={DARK_THEME}
          onPressCustom={() => {
            back();
          }}
        />
        {/*  */}
        {/* <View>
          <CardsIcon name="cc-mastercard" color={'#7474'} size={300} />
        </View> */}

        <CardField
          postalCodeEnabled={true}
          countryCode="US"
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            borderColor: DARK_THEME,
            borderWidth: 1,
            borderRadius: 3,
            placeholderColor: DISABLED,
            cursorColor: DARK_THEME,
            fontFamily: Helvetica_Neue_BoldCondensed,
          }}
          placeholders={{
            number: '1234 1234 1234 1234',
            expiration: 'MM/YY',
            cvc: 'CVC',
            postalCode: 'Postal Code',
          }}
          style={{
            width: '95%',
            height: 50,
            marginVertical: 30,
            backgroundColor: '#FFFFFF',
            // borderWidth: 1,
            // borderColor: DARK_THEME,
            alignItems: 'center',
            justifyContent: 'flex-start',
            elevation: 7,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        <TouchableOpacity
          style={styles.customButton}
          activeOpacity={0.5}
          onPress={handleConfirmation}>
          <Text style={styles.customButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cards;
