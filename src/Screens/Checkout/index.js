import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Caret from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
// import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import {Controller, useForm} from 'react-hook-form';
import {
  DARK_THEME,
  DISABLED,
  LIGHT_THEME,
  PRIMARY_PURPLE,
} from '../../helper/commonStyle';
import styles from './styles';
import CustomHeader from '../../Components/CustomHeader';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CancelButtonIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Checkout = props => {
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState(400);
  const [Password, setPassword] = useState();
  const [fireBAuthCheck, setfireBAuthCheck] = useState('');

  const [testname, setTestName] = useState('Test It Lets go');

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const toggleModal = () => {
    setAuthModalVisible(!authModalVisible);
  };
  const back = () => {
    props.navigation.goBack();
  };
  const navigateToReset = () => {
    props.navigation.navigate(NavigationStrings.RestPassword);
  };
  const navigateToSignup = () => {
    props.navigation.navigate(NavigationStrings.Signup);
  };
  const goToCart = () => {
    props.navigation.navigate(NavigationStrings.Cart);
  };
  const navigateToCards = () => {
    props.navigation.navigate(NavigationStrings.Cards);
  };

  const handleSignin = async () => {
    console.log('Done from Handle Signup');

    try {
      auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          // try {
          //   AsyncStorage.setItem('authStatusChecker', 'login');
          // } catch (error) {
          //   console.log('Storage Error from Signin Button :', error);
          // }
          console.log('User account Signin!');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully Sigin!',
          });
          setTimeout(() => {
            setAuthModalVisible(false);
          }, 3000);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log('User Not Found');
            Toast.show({
              type: 'error',
              text1: 'User Not Found!',
              text2: 'Provided User is not Exist',
            });
          }
          if (error.code === 'auth/invalid-password') {
            console.log('User Not Found');
            Toast.show({
              type: 'error',
              text1: 'User Not Found!',
              text2: 'Provided User is not Exist',
            });
          }
          if (error.code === 'auth/wrong-password') {
            console.log('Password is Wrong');
            Toast.show({
              type: 'error',
              text1: 'Password is Wrong',
              text2: 'Password is not Correct,Check your Password!',
            });
          }
          // console.error('ERRRRRORR', error);
        });
    } catch (err) {
      console.log('hmm', err);
    }
  };
  // getting User State
  const currentAuthState = async () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        let userEmail = user.email;
        let userName = user.uid;
        console.log(userEmail);
        console.log(userName);

        setfireBAuthCheck(userEmail);
        // ...
      } else {
        setfireBAuthCheck(null);
      }
    });
  };

  useEffect(() => {
    currentAuthState();
  }, [currentAuthState]);

  return (
    <View style={styles.container}>
      {/*  */}
      <CustomHeader
        headerText={'Checkout'}
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
      {/*  */}
      <View style={styles.pickupDetails}>
        <View style={styles.upperTextContainer}>
          <Text style={styles.upperText}>Pickup</Text>
        </View>
        <View style={styles.lowerTextContainer}>
          <Text style={styles.lowerText}>
            AAA Audios {'  '}Oct 10 - Oct 12 {'  '}09:00
          </Text>
          <TouchableOpacity activeOpacity={0.5} style={{marginRight: 20}}>
            <EditIcon name="mode-edit" color={LIGHT_THEME} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/*  */}
      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled>
        {/*  */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Contact </Text>
        </View>
        {/* Check User State here! */}
        {fireBAuthCheck !== null ? (
          <View style={styles.isignupCheckContainer}>
            <Text style={styles.stylesisignupCheckText}>{fireBAuthCheck}</Text>
          </View>
        ) : (
          <View style={styles.isignupCheckContainer}>
            <Text style={styles.stylesisignupCheckText}>
              Please
              <Text
                style={styles.authButtonText}
                onPress={() => setAuthModalVisible(true)}>
                {' '}
                Login{' '}
              </Text>
              or{' '}
              <Text style={styles.authButtonText} onPress={navigateToSignup}>
                Signup{' '}
              </Text>{' '}
              to complete payment, your receipt and order confirmation willl be
              sent to this email address.
            </Text>
            <Modal
              animationIn={'fadeInRight'}
              animationOut={'zoomOut'}
              swipeDirection={'right'}
              isVisible={authModalVisible}
              backdropOpacity={0}
              onBackButtonPress={() => {
                setAuthModalVisible(!authModalVisible);
              }}
              onBackdropPress={() => {
                setAuthModalVisible(!authModalVisible);
              }}>
              <View style={styles.authModalContainer}>
                <View style={styles.cancelButtonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.5}
                    onPress={() => {
                      setAuthModalVisible(!authModalVisible);
                    }}>
                    <CancelButtonIcon
                      name="cancel"
                      color={DARK_THEME}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <Controller
                  name="Email"
                  control={control}
                  rules={{
                    required: `Email is Required`,
                    pattern: EMAIL_REGEX,
                  }}
                  render={({
                    field: {onChange, onBlur, value},
                    fieldState: {error},
                  }) => {
                    return (
                      <>
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              borderColor: error ? 'red' : DARK_THEME,
                              borderWidth: error ? 1 : 1,
                            },
                          ]}>
                          <TextInput
                            placeholder="Email Address"
                            placeholderTextColor={'#737373'}
                            style={styles.inputStyle}
                            onBlur={onBlur}
                            keyboardType={'email-address'}
                            keyboardAppearance={'default'}
                            value={value}
                            onChange={valueInput => {
                              setEmail(valueInput.nativeEvent.text.toString());
                              console.log(Email);
                            }}
                            onChangeText={onChange}
                          />
                        </View>
                        {error && (
                          <Text style={styles.errorMessageTextStyle}>
                            {error.message || `Email is not Valid - ${value}`}
                          </Text>
                        )}
                      </>
                    );
                  }}
                />
                <Controller
                  name="Password"
                  control={control}
                  rules={{
                    required: `Password is Required`,
                    minLength: {
                      value: 6,
                      message: `Password must be 6 character Long`,
                    },
                  }}
                  render={({
                    field: {onChange, onBlur, value},
                    fieldState: {error},
                  }) => {
                    return (
                      <>
                        <View
                          style={[
                            styles.inputContainer,
                            {
                              borderColor: error ? 'red' : DARK_THEME,
                              borderWidth: error ? 1 : 1,
                            },
                          ]}>
                          <TextInput
                            placeholder="Password"
                            placeholderTextColor={'#737373'}
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            keyboardType={'ascii-capable'}
                            onBlur={onBlur}
                            value={value}
                            onChange={valueInput => {
                              setPassword(
                                valueInput.nativeEvent.text.toString(),
                              );
                              console.log(Password);
                            }}
                            onChangeText={onChange}
                          />
                        </View>
                        {error && (
                          <Text style={styles.errorMessageTextStyle}>
                            {error.message ||
                              `Password is too short - ${value}`}
                          </Text>
                        )}
                      </>
                    );
                  }}
                />

                <View style={styles.forgotPassAndCheckboxContainer}>
                  <View style={styles.authcheckboxContainer}>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      tintColors={toggleCheckBox ? PRIMARY_PURPLE : DISABLED}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                    />
                    <Text style={styles.rememberText}>Remember me</Text>
                  </View>
                  <Text
                    style={styles.rememberText}
                    onPress={() => {
                      setAuthModalVisible(!authModalVisible);
                      navigateToReset();
                    }}>
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.customAuthButton}
                  activeOpacity={0.5}
                  onPress={handleSubmit(handleSignin)}>
                  <Text style={styles.customAuthButtonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  New to Audios?{' '}
                  <Text
                    style={styles.authButtonText}
                    onPress={() => {
                      setAuthModalVisible(!authModalVisible);
                      navigateToSignup();
                    }}>
                    Sign up here
                  </Text>
                </Text>
              </View>
            </Modal>
          </View>
        )}

        {/* end */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Payment</Text>
        </View>
        <TouchableOpacity
          style={styles.isignupCheckContainer}
          activeOpacity={0.85}>
          <Text style={styles.stylesisignupCheckText}>
            Select a payment method
          </Text>
          <Caret name="caret-forward-sharp" size={20} color={DARK_THEME} />
        </TouchableOpacity>
        {/*  */}
        <View style={styles.termsContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              tintColors={toggleCheckBox ? PRIMARY_PURPLE : DISABLED}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
          </View>
          <View style={styles.termsTextContainer}>
            <Text style={styles.termsText}>
              By checking the box, I agree to{' '}
              <Text style={styles.authButtonText}>Terms & Conditions </Text>
              and I have reviewed the Rental Contract offered by Audios.
            </Text>
          </View>
        </View>
        {/*  */}
        <TouchableOpacity
          style={[
            styles.customButton,
            fireBAuthCheck !== null
              ? {backgroundColor: DARK_THEME}
              : {backgroundColor: DISABLED},
          ]}
          activeOpacity={0.5}
          disabled={fireBAuthCheck !== null ? false : true}
          onPress={() => {
            navigateToCards();
          }}>
          <View style={styles.lineCont}>
            <TimeIcon
              name={fireBAuthCheck !== null ? 'cart-check' : 'lock-outline'}
              color={LIGHT_THEME}
              size={20}
            />
            <Text style={styles.customButtonText}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Checkout;
