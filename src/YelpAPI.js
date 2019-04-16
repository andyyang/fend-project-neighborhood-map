
const API = "https://6ws598moff.execute-api.us-east-2.amazonaws.com/prod/yelp"
const BusinessSearchURL = "/businesses/search";
const BusinessDetailsURL = "/businesses";

const Key = "YourProxyKey";

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
      'x-api-key': Key
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
