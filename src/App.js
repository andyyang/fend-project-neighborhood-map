import React, { Component } from 'react';
import Radium from 'radium';

import * as RestaurantData from './RestaurantData'
import Map from './Map';
import Menubar from './Menubar';
import RestaurantModal from './Modal';
import * as GoogleAPI from './GoogleAPI';
import * as YelpAPI from './YelpAPI';
import './App.css';

const isLargeScreen = () => window.matchMedia('(min-width: 760px)').matches;
const GoogleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places';

class App extends Component {
  state = {
    restaurants: RestaurantData.Restaurants,
    filteredRestaurants: RestaurantData.Restaurants,
    filter: '',
    placeDetails: null,
    businessDetails: null,

    showingInfoWindow: false,
    selectedPlace: null,
    showingModal: false,
    showingMenubar: isLargeScreen(),
    mapCenter: RestaurantData.LatLngCenter
  }

  /**
   * Update restaurant filter
   * @param {string} filter
   */
  updateFilter = (filter) => {
    filter = filter.trim();
    let filteredRestaurants = this.state.restaurants;
    if(filter.length > 0) {
      filteredRestaurants = this.state.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }
    this.setState({ filter, filteredRestaurants });
  }

  /**
   * Toggle marker on Google map,
   * and get restaurant data using Google Place API
   * @param {object} restaurant
   */
  onToggleMarker = (restaurant) => {
    const isCloseAction = this.state.selectedPlace && this.state.selectedPlace === restaurant;

    this.setState((state) => ({
      selectedPlace: isCloseAction ? null : restaurant,
      placeDetails: null,
      mapCenter: (!isLargeScreen() && state.showingMenubar && !isCloseAction) ?
        { lat: restaurant.lat, lng: restaurant.lng } : state.mapCenter
    }));

    if(!isCloseAction) {
      GoogleAPI.getPlaceDetails(restaurant.name, restaurant.lat, restaurant.lng).then((data) => {
        if (data.status === 'OK') {
          this.setState((state) => ({
            placeDetails: data.results[0]
          }));
        } else {
          this.setState((state) => ({
            placeDetails: { error: `Failed to load Google data: ${data.status}` }
          }));
        }
      }).catch((reason) => {
        this.setState((state) => ({
          placeDetails: { error: `Failed to load Google data: ${reason}` }
        }));
      });
    }
  }

  /**
   * Deal with the open modal event,
   * and get additional restaurant info using Yelp API
   * @param {object} restaurant
   */
  onOpenModal = (restaurant) => {
    this.setState((state) => ({
      showingModal: true
    }));

    YelpAPI.getBusinesses(restaurant.name, restaurant.lat, restaurant.lng).then((data) => {
      if(data.businesses.length === 0 || !data.businesses[0].id) {
        this.setState((state) => ({
          businessDetails: { error: 'No business data on Yelp' }
        }));
      } else {
        YelpAPI.getBusinessDetails(data.businesses[0].id).then((data) => {
          this.setState((state) => ({
            businessDetails: data
          }));
        });
      }
    }).catch((reason) => {
      this.setState((state) => ({
        businessDetails: { error: `Failed to load Yelp data: ${reason}` }
      }));
    });
  }

  /**
   * Deal with the close modal event
   */
  onCloseModal = () => {
    this.setState((state) => ({
      showingModal: false,
      businessDetails: null
    }));
  }

  /**
   * Toggle the menubar
   */
  onToggleMenubar = () => {
    this.setState((state) => ({
      showingMenubar: ! state.showingMenubar
    }));
  }

  render() {
    const {
      filteredRestaurants,
      filter,
      selectedPlace,
      placeDetails,
      businessDetails,
      showingModal,
      showingMenubar,
      mapCenter
    } = this.state;

    const styles = {
      menubar: {
        width: '30%',
        display: showingMenubar ? 'block' : 'none',

        '@media (max-width: 960px)': {
          width: '258px'
        }
      },
      map: {
        width: showingMenubar ? '70%' : '100%',

        '@media (max-width: 960px)': {
          width: showingMenubar ? 'calc(100% - 258px)' : '100%'
        }
      }
    };

    return (
      <div
        className='App'
        role='application'
      >
        <header className='App-header'>
          <button
            className='header-menu'
            aria-label='Menu of restaurant filter and list view'
            aria-controls='App-menubar'
            aria-expanded={showingMenubar.toString()}
            onClick={this.onToggleMenubar}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z'/>
            </svg>
          </button>
          <h1 className='App-title'>Victoria Restaurants</h1>
        </header>
        <main className='App-main container'>
          <Menubar
            style={styles.menubar}
            filter={filter}
            restaurants={filteredRestaurants}
            updateFilter={this.updateFilter}
            onToggleMarker={this.onToggleMarker}
          />
          <Map
            googleMapURL={GoogleMapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<section className='App-map' style={styles.map} />}
            mapElement={<div style={{ height: `100%` }} />}
            restaurants={filteredRestaurants}
            selectedPlace={selectedPlace}
            placeDetails={placeDetails}
            businessDetails={businessDetails}
            onToggleMarker={this.onToggleMarker}
            onOpenModal={this.onOpenModal}
            mapCenter={mapCenter}
          />
          <RestaurantModal
            businessDetails={businessDetails}
            showingModal={showingModal}
            onCloseModal={this.onCloseModal}
          />
        </main>
      </div>
    );
  }
}

export default Radium(App);
