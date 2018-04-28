import React from 'react';

const Menubar = (props =>
  <section
    className='App-menubar'
    id='App-menubar'
    style={props.style}
    role='menubar'
  >
    <div
      className='restaurant-filter container'
      role='group'
    >
      <input
        type='text'
        className='restaurant-input'
        placeholder='Restaurant name'
        value={props.filter}
        onChange={(event) => props.updateFilter(event.target.value)}
      />
      <div
        className='restaurant-button'
        role='note'
      >
        <i className='fa fa-filter' aria-hidden='true'/>Filter
      </div>
    </div>
    <ul className='restaurant-list'>
      {props.restaurants.map((restaurant) => (
        <li key={restaurant.name}>
          <button
            aria-label={`Information about ${restaurant.name}`}
            aria-controls='restaurant-info-window'
            onClick={() => props.onToggleMarker(restaurant)}>
            {restaurant.name}
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default Menubar;