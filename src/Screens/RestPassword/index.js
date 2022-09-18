import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import {DARK_THEME} from '../../helper/commonStyle';
import Modal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import styles from './styles';
import {firebase} from '@react-native-firebase/auth';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RestPassword = props => {
  const [Email, setEmail] = useState('');

  const sendMail = async () => {
    await firebase
      .auth()
      .sendPasswordResetEmail(Email)
      .then(() => {
        // Password reset email sent!
        console.log('Email Hass Been Send');
        setAuthModalVisible(!authModalVisible);
        // ..
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [authModalVisible, setAuthModalVisible] = useState(false);

  const Back = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        headerText={'Reset Password'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={Back}
      />
      <View style={styles.superInputContainer}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabelText}>Email Address</Text>
        </View>
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
                      borderBottomColor: error ? 'red' : DARK_THEME,
                      borderBottomWidth: error ? 1 : 1,
                    },
                  ]}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor={'#737373'}
                    style={styles.inputStyle}
                    keyboardType={'email-address'}
                    onBlur={onBlur}
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
      </View>
      <TouchableOpacity
        style={styles.customButton}
        activeOpacity={0.5}
        onPress={handleSubmit(sendMail)}>
        <Text style={styles.customButtonText}>Send Instruction</Text>
      </TouchableOpacity>
      <Modal animationIn={'slideInUp'} isVisible={authModalVisible}>
        <View style={styles.authModalContainer}>
          <Text style={styles.modalDescription}>
            {`Reset password instruction has sent to ${Email}`}
          </Text>
          <TouchableOpacity
            style={styles.OkayTextContainer}
            activeOpacity={0.5}
            onPress={() => {
              setAuthModalVisible(!authModalVisible);
              props.navigation.navigate(NavigationStrings.Checkout);
            }}>
            <Text style={styles.OkayText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default RestPassword;
