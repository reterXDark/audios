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
import CustomHeader from '../../Components/CustomHeader';
import styles from './styles';
import {DARK_THEME, DISABLED, LIGHT_THEME} from '../../helper/commonStyle';
import Clipboard from '@react-native-clipboard/clipboard';
import {URLSearchParams} from 'react-native-url-polyfill';
import DateTimePicker from '@react-native-community/datetimepicker';
import {firebase} from '@react-native-firebase/auth';
import Edit from 'react-native-vector-icons/FontAwesome';
import Cross from 'react-native-vector-icons/FontAwesome';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import {useDispatch, useSelector} from 'react-redux';
import {calculateTotals} from '../../../features/cart/cartSlice';

const Cards = props => {
  const [Key, setKey] = useState('');

  const [editCancel1, setEditCancel1] = useState(true);
  const [editCancel2, setEditCancel2] = useState(true);
  const [editCancel3, setEditCancel3] = useState(true);

  const [cardNumber, setCardNumber] = useState('4242424242424242');
  const [expiryM, setexpiryM] = useState('mm');
  const [expiryY, setexpiryY] = useState('yy');
  const [cvc, setcvc] = useState('');
  const [disable, setDisable] = useState(true);
  const [paymentMethodId, setpaymentMethodId] = useState('');
  const [paymentIntentId, setpaymentIntentId] = useState('');
  const [name, setName] = useState('');

  const back = () => {
    props.navigation.goBack();
  };

  const {cartItems, amount, total} = useSelector(store => store.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  const handleConfirmation = async () => {
    const Api_url = 'https://api.stripe.com//v1/payment_methods',
      REQ_URL = new URL(Api_url);
    const data = Object.entries({
        type: 'card',
        'card[exp_month]': expiryM,
        'card[exp_year]': expiryY,
        'card[number]': cardNumber,
        'card[cvc]': cvc,
      }),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,

      redirect: 'follow',
    };

    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert(result.error.message);
          // console.log(result.error)
        } else {
          setpaymentMethodId(result.id);
          setDisable(false);
        }
      })
      .catch(error => alert(error));
  };

  // Confirm payment Function

  const confirmPayment = paymentIntent => {
    const Api_url = `https://api.stripe.com//v1/payment_intents/${paymentIntent}/confirm`,
      REQ_URL = new URL(Api_url);
    const data = Object.entries({payment_method: paymentMethodId}),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    let url;
    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        url = result.charges.data.map(item => {
          return {url1: item.receipt_url};
        });
      })
      .then(() => {
        console.log(url[0].url1);
        setDisable(true);
        return Alert.alert(
          'Success',
          'Your ordered has been placed successfully',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancel pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                Clipboard.setString(url[0].url1),
                  props.navigation.navigate(NavigationStrings.Receipt);
              },
            },
          ],
        );
      })
      .catch(error => console.log('error', error));
  };

  // Payment Intent function

  const handlePaymnetIntent = () => {
    const Api_url = 'https://api.stripe.com//v1/payment_intents',
      REQ_URL = new URL(Api_url);
    const data = Object.entries({
        amount: total,
        currency: 'usd',
        payment_method: paymentMethodId,
        receipt_email: firebase.auth().currentUser.email,
      }),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert(result.error.message);
        } else {
          setpaymentIntentId(result.id);
          console.log('RESULT IS : ', result);
          return Alert.alert(
            'Confirm',
            'Do you want to confirm this payment?',
            [
              {
                text: 'Cancel',
                onPress: () => setDisable(true),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => confirmPayment(result.id)},
            ],
          );
        }
      })
      .catch(error => console.log('error', error));
  };

  /*Date Function and states*/
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPickupDTP, setShowPickupDTP] = useState(false);
  const [text, settext] = useState('');
  const [DeleviveryLocationName, setDeleviveryLocationName] = useState('');

  const showMode = currentMode => {
    setShowPickupDTP(true);
    setMode(currentMode);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickupDTP(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let fMonth = `${tempDate.getMonth()}`;
    let fYear = `${tempDate.getFullYear().toString().slice(-2)}`;

    let fTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`;

    setexpiryM(`${fMonth}`);
    setexpiryY(`${fYear}`);
    console.log(`${fMonth} and hehe ${fYear}`);
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

        <View style={styles.PaymentInputsContainer}>
          <Text style={styles.textLabelContainer}>Name on card </Text>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                placeholder={'e.g. Isic Nick'}
                placeholderTextColor={DISABLED}
                style={styles.inputStyle}
                value={name}
                onChange={text => {
                  setName(text);
                }}
              />
            </View>
          </View>
          <Text style={styles.textLabelContainer}>Card Number </Text>
          <View style={[styles.inputContainer, {marginVertical: 8}]}>
            <View style={styles.logoContainer}>
              <Cross name="credit-card-alt" size={20} color={DARK_THEME} />
            </View>
            <TextInput
              placeholder={'Card Number'}
              placeholderTextColor={DISABLED}
              style={styles.inputStyle}
              onChangeText={text => setCardNumber(text)}
              keyboardType="number-pad"
              maxLength={16}
            />
          </View>
          <View style={styles.lablesDownContainer}>
            <Text style={styles.textLabel1}>Expiry </Text>
            <Text style={styles.textLabel2}>CVC</Text>
          </View>
          <View style={styles.dateCvcContainer}>
            <View style={[styles.inputDateContainer, {marginVertical: 8}]}>
              <Text
                style={
                  styles.textDateContainer
                }>{`${expiryM}/${expiryY}`}</Text>

              <TouchableOpacity
                onPress={() => {
                  showMode('date');
                }}>
                <Cross name="calendar" size={20} color={DARK_THEME} />
              </TouchableOpacity>
            </View>
            <View style={[styles.inputCvcContainer, {marginVertical: 8}]}>
              <TextInput
                placeholder={'CVC'}
                placeholderTextColor={DISABLED}
                style={styles.inputStyle}
                value={cvc}
                onChangeText={text => setcvc(text)}
                keyboardType="number-pad"
              />
            </View>
          </View>
          {showPickupDTP && (
            <DateTimePicker
              key={'PickupData'}
              testID="DateTimePicker"
              value={date}
              mode={mode}
              display={'default'}
              onChange={onDateChange}
              is24Hour={false}
            />
          )}
          {/* <View style={[styles.inputContainer, {marginVertical: 8}]}>
            <TextInput
              placeholder={'Expiry Year'}
              placeholderTextColor="#CED2F5"
              style={styles.inputStyle}
              onChangeText={text => setexpiryY(text)}
              maxLength={4}
              keyboardType="number-pad"
            />
          </View> */}
        </View>

        <TouchableOpacity
          style={styles.customButton}
          // onPress={() => {
          //   navigateToOrderVailidated();
          // }}
          // propsFun={handleConfirmation}
          onPress={handleConfirmation} // stripe Payment Button
          // onPress={APICall}
        >
          <Text style={styles.customButtonText}>{'Confirm card details'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.customButton,
            {marginTop: 10, backgroundColor: disable ? DISABLED : DARK_THEME},
          ]}
          disabled={disable ? true : false}
          onPress={handlePaymnetIntent} // stripe Payment Button
          // onPress={APICall}
        >
          <Text style={styles.customButtonText}>Pay</Text>
        </TouchableOpacity>

        {/* <CardField
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
        /> */}
        {/* <TouchableOpacity
          style={styles.customButton}
          activeOpacity={0.5}
          onPress={handlePaymnetIntent}>
          <Text style={styles.customButtonText}>Pay</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default Cards;
