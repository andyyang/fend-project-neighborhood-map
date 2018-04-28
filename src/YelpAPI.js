
const API = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3";
const BusinessSearchURL = "/businesses/search";
const BusinessDetailsURL = "/businesses/";

const Secret = "8BTgKXFcGS9U3N2f61RU7AqctGPUc5LRkzpqxgH9r2Ibz_PLoaQ1gKTlwsgL2qpberoGfr9R8PlbIvSgehSoQQsAGa7DS-Q7mnZgp-AJJ1izSi3vDEJkMVw-YBjdWnYx";

const Headers = {
  'Accept': 'application/json',
};

/**
 * Get Yelp data using Yelp API
 * @param {string} url
 * @returns {Promise}
 */
export const getYelpInfo = (url) =>
  fetch(url, {
    headers: {
      ...Headers,
      'Authorization': `Bearer ${Secret}`
    }}).then(res => res.json());

/**
 * Search business using Yelp API
 * @param {string} name
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise}
 */
export const getBusinesses = (name, lat, lng) =>
  getYelpInfo(`${API}${BusinessSearchURL}?term=${name}&latitude=${lat}&longitude=${lng}&radius=100&limit=1`);

/**
 * Get business details using Yelp API
 * @param {string} BusinessId
 * @returns {Promise}
 */
export const getBusinessDetails = (BusinessId) =>
  getYelpInfo(`${API}${BusinessDetailsURL}/${BusinessId}`);
