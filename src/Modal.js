import React from 'react';
import ReactModal from 'react-modal';

const DaysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Convert time in 24 hour to time in 12 hour
 * https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 * @param {string} time
 * @returns {string} time converted
 */
const convertTo12Hour = (time) => {
  let H = +time.substr(0, 2);
  let h = H % 12 || 12;
  let ampm = (H < 12 || H === 24) ? 'AM' : 'PM';
  return `${h}:${time.substr(2, 2)} ${ampm}`;
}

/**
 * Merge open hours of the same day
 * @param {Object} hours
 * @returns {Array} openHours
 */
const mergeOpenHours = (hours) => {
  let openHours = [];
  hours.forEach((time) => {
    let openHour = openHours[time.day];
    let newHour = `${convertTo12Hour(time.start)} - ${convertTo12Hour(time.end)}`;
    openHours[time.day] = openHour ? openHour.concat(', ', newHour) : newHour;
  });
  return openHours;
}

ReactModal.setAppElement('#root');

/**
 * The modal providing additional restaurant info using Yelp data
 * @param {object} props
 */
const RestaurantModal = (props) => {
  const { businessDetails, showingModal, onCloseModal } = props;
  const isLoading = !businessDetails;

  return (
    <section className='App-modal'>
      <ReactModal
        isOpen={showingModal}
        onRequestClose={onCloseModal}
        className='modal'
        overlayClassName='modal-overlay'
        contentLabel='Business Details'
      >
        <button
          className='close-btn'
          onClick={onCloseModal}
        >
          Close
        </button>

        {isLoading && <div
          className='loader'
          role='status'
          aria-busy='true'
          aria-label='loading'
        />}

        {!isLoading && businessDetails.error && <div
          className='alert'
          role='alert'
          aria-live='assertive'
        >
           <p>{businessDetails.error}</p>
        </div>}

        {!isLoading && !businessDetails.error && <div
          className='restaurant-details'
          role='presentation'
        >
          <h2 className='restaurant-name'>{businessDetails.name}</h2>
          <div
            className='details-container'
            role='presentation'
          >
            <div
              className='details-header container'
              role='presentation'
            >
              <p className='restaurant-cuisine'>
                {businessDetails.categories.map((category) => category.title).join(', ')}
              </p>
              <p className='restaurant-price'>{businessDetails.price}</p>
            </div>
            <div
              className='details-body'
              role='presentation'
            >
              <p className='restaurant-rating'>{`rating: ${businessDetails.rating}`}</p>
              <p className='restaurant-address'>
                <i className='fa fa-map-marker' aria-hidden='true'/>
                {businessDetails.location.display_address.join(', ')}
              </p>
              <p className='restaurant-phone'>
                <i className='fa fa-phone' aria-hidden='true'/>
                {businessDetails.phone}
              </p>
              <table className='restaurant-hours'>
                <tbody>
                  {businessDetails.hours &&
                    mergeOpenHours(businessDetails.hours[0].open).map((openTime, index) => (
                    <tr key={index}>
                      <td tabIndex='0'>{DaysOfTheWeek[index]}</td>
                      <td tabIndex='0'>{openTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>}
      </ReactModal>
    </section>
  );
};

export default RestaurantModal;