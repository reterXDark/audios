import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import NavigationStrings from '../../../Navigation/NavigationStrings';
import CustomHeader from '../../Components/CustomHeader';
import {DARK_THEME} from '../../helper/commonStyle';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';

const OrderHistory = props => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const Back = () => {
    props.navigation.goBack();
  };
  const data = [
    {
      label: 'Newest Date',
      value: 'Newest',
    },
    {
      label: 'Oldest Date',
      value: 'Oldest',
    },
  ];

  const orderDetails = [
    {
      orderType: 'Pickup Order',
      orderTypeValue: 'Picked up',
      OrderNumber: 'AX12301',
      fromDateTime: 'Oct 01 9:00 am',
      toDateTime: 'Oct 02 9:00 am',
    },
    {
      orderType: 'Delivery Order',
      orderTypeValue: 'Out for delivery',
      OrderNumber: 'AX12302',
      fromDateTime: 'Oct 01 9:00 am',
      toDateTime: 'Oct 02 9:00 am',
    },
    {
      orderType: 'Delivery Order',
      orderTypeValue: 'Completed',
      OrderNumber: 'AX12303',
      fromDateTime: 'Oct 01 9:00 am',
      toDateTime: 'Oct 02 9:00 am',
    },
  ];

  const EventItem = ({
    orderType,
    orderTypeValue,
    OrderNumber,
    fromDateTime,
    toDateTime,
  }) => (
    <View style={styles.OrderHistoryContianer}>
      <View style={styles.pickupDetails}>
        <View style={styles.orderTypecontainer}>
          <Text style={styles.orderTypeHeading}>{orderType}</Text>
          <Text style={styles.orderType}>{orderTypeValue}</Text>
        </View>
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberText}>{OrderNumber}</Text>
        </View>
      </View>
      <View style={styles.breakerINLine} />

      <View style={styles.dateTimeContainer}>
        {/* Rental Starts At */}
        <View style={styles.startContainer}>
          <View style={styles.startTextContainer}>
            <Text style={styles.startText}>From</Text>
          </View>
          <View style={styles.startTextContainer}>
            <Text style={styles.startDescText}>{fromDateTime}</Text>
          </View>
        </View>
        {/* Ends At */}
        <View style={styles.startContainer}>
          <View style={styles.startTextContainer}>
            <Text style={styles.startText}>To</Text>
          </View>
          <View style={styles.startTextContainer}>
            <Text style={styles.startDescText}>{toDateTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const ItemSeparatorComponent = () => {
    return <View style={styles.breaker} />;
  };

  const renderOrderItem = ({item}) => (
    <EventItem
      orderType={item.orderType}
      orderTypeValue={item.orderTypeValue}
      OrderNumber={item.OrderNumber}
      fromDateTime={item.fromDateTime}
      toDateTime={item.toDateTime}
    />
  );
  return (
    <View style={styles.container}>
      <CustomHeader
        headerText={'Order History'}
        showBackIcon={true}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          Back();
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            autoScroll
            iconStyle={styles.iconStyle}
            containerStyle={styles.containerrrrStyle}
            data={data}
            maxHeight={120}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Newest Date' : '...'}
            value={value}
            showsVerticalScrollIndicator={false}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.falteContainer}>
          <FlatList
            data={orderDetails}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => {
              return <ItemSeparatorComponent />;
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;
