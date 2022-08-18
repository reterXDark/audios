import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import AppLogo from '../../Images/AppLogo.png';
import styles from './styles';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(NavigationStrings.Rental);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={AppLogo}
        resizeMode={'contain'}
        style={styles.logoStyles}
      />
      <Text style={styles.appNameText}>Audios</Text>
    </View>
  );
};

export default Splash;
