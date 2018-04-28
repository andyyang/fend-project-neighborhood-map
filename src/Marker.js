/* global google */
import React from 'react';
import { Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as GoogleAPI from './GoogleAPI';

const RestaurantMarker = (props) => {
  const {
    restaurant,
    selectedPlace,
    placeDetails,
    onToggleMarker,
    onOpenModal } = props;
  const isOpen = selectedPlace === restaurant;
  const isLoading = !placeDetails;

  return (
    <Marker
      position={{ lat: restaurant.lat, lng: restaurant.lng }}
      animation={ isOpen ? google.maps.Animation.BOUNCE : null }
      onClick={() => onToggleMarker(restaurant)}
    >
      {isOpen && <InfoBox
        options={{ closeBoxURL: '', enableEventPropagation: true }}
        onCloseClick={() => onToggleMarker(restaurant)}
      >
        <div
          className='restaurant-info-window'
          id='restaurant-info-window'
          role='dialog'
          aria-label='Restaurant information'
        >
          <button
            className='close-time-btn'
            aria-label='Close'
            onClick={() => onToggleMarker(restaurant)}
          >
            &times;
          </button>

          {isLoading && <div
            className='loader'
            role='status'
            aria-busy='true'
            aria-label='loading'
          />}

          {!isLoading && placeDetails.error && <div
            className='alert'
            role='alert'
            aria-live='assertive'
          >
            <p>{placeDetails.error}</p>
          </div>}

          {!isLoading && !placeDetails.error && <div
            className='restaurant-info'
            role="presentation"
          >
            <img
              src={placeDetails.photos.length > 0 ?
                GoogleAPI.getPhotoURL(placeDetails.photos[0].photo_reference) : ''}
              alt={`${restaurant.name}`}
            />
            <h2>{restaurant.name}</h2>
            <p>{placeDetails.formatted_address || placeDetails.vicinity}</p>
            <button
              aria-label={`View details about ${restaurant.name}`}
              onClick={() => onOpenModal(restaurant)}
            >
              View Details
            </button>
          </div>}
        </div>
      </InfoBox>}
    </Marker>
  );
};

export default RestaurantMarker;
