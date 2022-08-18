import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Toast from 'react-native-toast-message';
import AppLogo from '../../Images/logoapp.png';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {DARK_THEME} from '../../helper/commonStyle';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Signup = props => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const navigateToBack = () => {
    props.navigation.goBack();
  };

  const handleSignin = async () => {
    console.log('Done from Handle Signup');

    try {
      auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          try {
            AsyncStorage.setItem('authStatusChecker', 'login');
          } catch (error) {
            console.log('Storage Error from Signup Button :', error);
          }
          console.log('User account Signed up!');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully Signed up',
          });
          setTimeout(() => {
            navigateToBack();
          }, 3000);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('email already in use]');
            Toast.show({
              type: 'error',
              text1: 'Email Already Exit!',
              text2: 'Email already in use!',
            });
          }
          if (error.code === 'auth/invalid-email') {
            console.log('Email is Invalid');
            Toast.show({
              type: 'error',
              text1: 'Email Invalid',
              text2: 'Provided Email is no Valid!',
            });
          }
          // console.error('ERRRRRORR', error);
        });
    } catch (err) {
      console.log('hmm', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appLogoContainer}>
        <Image
          source={AppLogo}
          resizeMode="contain"
          style={styles.AppLogoStyles}
        />
      </View>

      <View style={styles.authContainer}>
        {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        <Controller
          name="Email"
          control={control}
          rules={{
            required: `Email is Required`,
            pattern: EMAIL_REGEX,
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
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
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
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
                      setPassword(valueInput.nativeEvent.text.toString());
                      console.log(Password);
                    }}
                    onChangeText={onChange}
                  />
                </View>
                {error && (
                  <Text style={styles.errorMessageTextStyle}>
                    {error.message || `Password is too short - ${value}`}
                  </Text>
                )}
              </>
            );
          }}
        />
        <TouchableOpacity
          style={styles.customAuthButton}
          activeOpacity={0.5}
          onPress={handleSubmit(handleSignin)}>
          <Text style={styles.customAuthButtonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Have Audios Account?{' '}
          <Text
            style={styles.authButtonText}
            onPress={() => {
              navigateToBack();
            }}>
            Login here
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;
