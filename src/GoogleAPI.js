const API = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const Photo_URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=160&photoreference="

const Key= "AIzaSyAf6e7PbmHLvjOIoHmXDf09CR2ddaGh0Lg";

const headers = {
  'Accept': 'application/json'
};

/**
 * Get place details using Google Place API
 * @param {string} name
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise}
 */
export const getPlaceDetails = (name, lat, lng) =>
  fetch(`${API}location=${lat},${lng}&radius=100&keyword=${name}&key=${Key}`, headers)
    .then(res => res.json());

/**
 * Get Google map's photo URL
 * @param {string} photo_reference
 * @returns {string} photoURL
 */
export const getPhotoURL = (photo_reference) =>
  `${Photo_URL}${photo_reference}&key=${Key}`;