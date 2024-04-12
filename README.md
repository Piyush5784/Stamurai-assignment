# Stamurai-assignment

## Overview

The Weather Forecast Web Application provides users with a table of cities, an autocomplete search feature, and detailed weather information for selected cities. It leverages the OpenWeatherMap API for weather data and the GeoNames API for city information. Users can view current weather conditions and forecasts, along with interactive features like dynamic backgrounds based on weather conditions.
Features

City Table:
        Display cities with infinite scroll.
        Search as you type with autocomplete.
        Filter and sort by various columns (city name, country, timezone).
        Click on city name to view detailed weather.
        Right-click on city name to open weather in a new tab.

 Weather Page:
        View detailed weather information for selected cities.
        Display current weather (temperature, description, humidity, wind speed, pressure).
        Show forecast (highs/lows, weather descriptions, precipitation).

Styling:
        Utilize styled components and dynamic backgrounds based on weather conditions.
        Display appropriate images/animations for different weather types.

Responsive Design:
        Ensure responsiveness across various screen sizes using media queries.

Error Handling:
        Gracefully handle API request failures and invalid search queries.
        Display error messages to users when necessary.

 State Management:
        Use React state management to avoid unnecessary re-fetching of data.
        Centralize weather data state and pass down necessary data as props.

Type Safety:
        Leverage TypeScript for type safety throughout the application.

## Installation

Provide instructions on how to install and set up your project. Include any dependencies that need to be installed.

```bash
# installation steps
git clone https://github.com/Piyush5784/Stamurai-assignment.git #clone repo

cd Assignment #navigate to main folder

npm install   # or any other package manager command

npm run dev  
