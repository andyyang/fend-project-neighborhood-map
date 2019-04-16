# Neighborhood Map Project

This is a single page application featuring a map of Victoria restaurants. The functionality to this map includes highlighted restaurants and Yelp data about those restaurants. The project emphasizes using React to build the application and it also aceesses the Google Places API and the Yelp API to get the restaurant information as you interact with the aplication.

[View Neighborhood Map](http://victoria-restaurants.s3-website.us-east-2.amazonaws.com/)

## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [APIs](#apis)

## Instructions

1. Clone the GitHub repository.

2. Go into the directory where the project now lives.

3. Install all project dependencies with `npm install`.

4. Update `const Key` with your Google API key in GoogleAPI.js and `const Secret` with your Yelp API key in
YelpAPI.js.

5. Start the development server with `npm start`. The command will open a web browser to visit the application. You can look around to see what the experience looks like.

## Dependencies

This project uses these tools, components, and frameworks:

* [React](https://reactjs.org/)
* [react-google-maps](https://github.com/tomchentw/react-google-maps)
* [recompose](https://github.com/acdlite/recompose)
* [radium](https://github.com/FormidableLabs/radium)
* [react-modal](https://github.com/reactjs/react-modal)

## APIs

This project uses the place search function of [Google Places API](https://developers.google.com/places/web-service/search), the search function and the business details fuction of [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3) to get the restaurant data.

Because these APIs don't support CORS headers, the project uses a proxy service based on AWS API Gateway and AWS Lambda to access these APIs. [CORS Anywhere](https://cors-anywhere.herokuapp.com/) is another option.
