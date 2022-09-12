import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../Components/CustomHeader';
import {DARK_THEME} from '../../helper/commonStyle';
import auth, {firebase} from '@react-native-firebase/auth';
import styles from './styles';
import NavigationStrings from '../../../Navigation/NavigationStrings';

const Profile = props => {
  const [fireBAuthCheck, setfireBAuthCheck] = useState('');

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

  const back = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/*  */}
      <CustomHeader
        headerText={'Edit Profile'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          back();
        }}
      />
      {/*  */}

      <View style={styles.ProfileInputContainer}>
        <View style={styles.superInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>First Name</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="i.e: John Doe"
              placeholderTextColor={'#737373'}
              style={styles.inputStyle}
              keyboardType={'ascii-capable'}
            />
          </View>
        </View>
        <View style={styles.superInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Last Name</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="i.e: Parker Doe"
              placeholderTextColor={'#737373'}
              style={styles.inputStyle}
              keyboardType={'ascii-capable'}
            />
          </View>
        </View>
        <View style={styles.superInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Email Address</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="i.e: johndoe@site.com"
              placeholderTextColor={'#737373'}
              style={styles.inputStyle}
              keyboardType={'email-address'}
              value={fireBAuthCheck}
            />
          </View>
        </View>
        <View style={styles.superInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Phone Number</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="i.e: John Doe"
              placeholderTextColor={'#737373'}
              style={styles.inputStyle}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
      </View>
      {/*  */}
      <TouchableOpacity
        style={styles.customButton}
        activeOpacity={0.5}
        onPress={() => {
          // props.navigation.navigate(NavigationStrings.Checkout);
        }}>
        <Text style={styles.customButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
