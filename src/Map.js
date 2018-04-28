import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import RestaurantMarker from './Marker';

const Map = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={15}
    center={props.mapCenter}
  >
    {props.restaurants.map((restaurant) => (
      <RestaurantMarker
        key={restaurant.name}
        restaurant={restaurant}
        selectedPlace={props.selectedPlace}
        placeDetails={props.placeDetails}
        businessDetails={props.businessDetails}
        onToggleMarker={props.onToggleMarker}
        onOpenModal={props.onOpenModal}
      />
    ))}
  </GoogleMap>
);

export default Map;
