import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Appearance} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {DARK_THEME, PRIMARY_PURPLE} from '../../helper/commonStyle';
import MapView, {Callout, Circle, Marker, Polyline} from 'react-native-maps';
import MapViewDirection from 'react-native-maps-directions';
import GeoLocation from '@react-native-community/geolocation';
import CustMarker from '../../Images/markerImg.png';
import CarMarker from '../../Images/carMarker.png';
import styles from './styles';

const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];
const mapLightStyle = [];

const colorScheme = Appearance.getColorScheme();

const FullMapView = props => {
  // GeoLocation.getCurrentPosition(data => {
  //   setDestination(
  //     {
  //       ...destination,
  //       latitude: data.coords.latitude,
  //       longitude: data.coords.longitude,
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // });

  let [timeandDuration, setTimeandDuration] = useState({
    time: null,
    distance: null,
  });

  let [origin, setOrigin] = React.useState({
    latitude: 33.757418,
    longitude: -84.50369,
    latitudeDelta: 0.022,
    longitudeDelta: 0.0021,
  });

  const [destination, setDestination] = React.useState({
    latitude: 33.744287,
    longitude: -84.391424,
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        showBackIcon={true}
        headerText={'Rental'}
        showBackIconColor={DARK_THEME}
        onPressCustom={() => {
          props.navigation.goBack();
        }}
      />
      {timeandDuration.distance !== null && timeandDuration.time !== null && (
        <View style={styles.selectedLocationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressNameText}>Order Confirmed</Text>
            <Text style={styles.EstimatedDelivery}>
              Estimated Delivery: {timeandDuration.time} Min
            </Text>
            <Text style={styles.Distance}>
              Distance: {timeandDuration.distance} Km
            </Text>
          </View>
        </View>
      )}
      <MapView
        style={styles.map}
        userLocationAnnotationTitle={"I'm here"}
        customMapStyle={colorScheme === 'dark' ? mapDarkStyle : mapLightStyle}
        showsCompass={true}
        scrollEnabled={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsTraffic={true}
        mapType={'standard'}
        showsBuildings={true}
        showsUserLocation={true}
        loadingEnabled={true}
        loadingIndicatorColor={PRIMARY_PURPLE}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        initialRegion={origin}>
        <Marker
          draggable={true}
          coordinate={origin}
          image={CarMarker}
          onDragEnd={direction => {
            setOrigin(direction.nativeEvent.coordinate);
          }}
        />
        <Marker
          draggable={true}
          coordinate={destination}
          image={CustMarker}
          onDragEnd={direction => {
            setDestination(direction.nativeEvent.coordinate);
          }}
        />

        <MapViewDirection
          origin={origin}
          destination={destination}
          apikey={'AIzaSyCgTXTy8JDUtqsYi9KHoA4rE7jBmaD0MSA'}
          strokeColor={PRIMARY_PURPLE}
          fillColor={DARK_THEME}
          strokeWidth={3}
          mode="DRIVING"
          lineDashPhase={2}
          onStart={params => {
            console.log(params.origin), console.log(params.destination);
          }}
          onReady={Result => {
            setTimeandDuration({
              distance: Math.floor(Result.distance),
              time: Math.floor(Result.duration),
            });
            console.log(`Distance: ${Math.floor(Result.distance)} Km`);
            console.log(`Duration: ${Math.floor(Result.duration)} Min`);
          }}
        />

        {/* <Polyline
          coordinates={[origin, destination]}
          strokeColor={PRIMARY_PURPLE}
          fillColor={DARK_THEME}
        /> */}

        <Circle center={destination} radius={100} />
      </MapView>
    </View>
  );
};

export default FullMapView;
