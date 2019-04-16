const API = "https://6ws598moff.execute-api.us-east-2.amazonaws.com/prod/google";
const Photo_URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=160&photoreference="

const Key= "YourProxyKey";
const GoogleKey = "YourGoogleKey";

const headers = {
  'Accept': 'application/json',
  'x-api-key': Key
};

/**
 * Get place details using Google Place API
 * @param {string} name
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise}
 */
export const getPlaceDetails = (name, lat, lng) =>
  fetch(`${API}?location=${lat},${lng}&radius=100&keyword=${name}`, {
      headers: headers
    })
    .then(res => res.json());

/**
 * Get Google map's photo URL
 * @param {string} photo_reference
 * @returns {string} photoURL
 */
export const getPhotoURL = (photo_reference) =>
  `${Photo_URL}${photo_reference}&key=${GoogleKey}`;
