import wind from "./images/wind.png";
import clear from "./images/clear.png";
import clouds from "./images/clouds.png";
import drizzle from "./images/drizzle.png";
import humidity from "./images/humidity.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import weatherClear from "./images/Weather-clear.jpg";
import weatherClouds from "./images/Weather-clouds.jpg";
import weatherDrizzle from "./images/Weather-drizzle.jpg";
import weatherMist from "./images/Weather-mist.jpg";
import weatherRain from "./images/Weather-rain.jpg";
import weatherSnow from "./images/Weather-snow.jpg";
import weatherWind from "./images/Weather-wind.jpg";

export const country_names = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Faeroe Islands",
  "Falkland Islands (Malvinas)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong, China",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Rep. of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Dem. People's Rep. of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Dem. Rep.",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau, China",
  "Macedonia, The former Yugoslav Rep. of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan, The Republic of",
  "Spain",
  "Sri Lanka",
  "Sudan, The Republic of",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, China",
];

export const ApiKey = "&appid=314aaa8c5ef6f26f08b5166253cc43c1";
export const url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
export interface responseProp {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: string;
    sunset: string;
  };
  timezone: string;
  id: number;
  name: string;
  cod: number;
}

export function getBgImgAndIcon(main: string) {
  let bgIcon = clear;
  let bgImg = weatherClear;
  if (main == "Wind") {
    bgIcon = wind;
    bgImg = weatherWind;
  } else if (main == "Clear") {
    bgIcon = clear;
    bgImg = weatherClear;
  } else if (main == "Drizzle") {
    bgIcon = drizzle;
    bgImg = weatherDrizzle;
  } else if (main == "Humidity") {
    bgIcon = humidity;
    bgImg = weatherDrizzle;
  } else if (main == "Snow") {
    bgIcon = snow;
    bgImg = weatherSnow;
  } else if (main == "Mist") {
    bgIcon = mist;
    bgImg = weatherMist;
  } else if (main == "Rain") {
    bgIcon = rain;
    bgImg = weatherRain;
  } else if (main == "Clouds") {
    bgIcon = clouds;
    bgImg = weatherClouds;
  }
  return { bgIcon, bgImg };
}

export type Location = {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  country_name_en: string;
  admin1_code: string;
  admin2_code: string;
  population: number;
  elevation: null | number;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: {
    lon: number;
    lat: number;
  };
};

export type DataProp = {
  state: string;
  contents: Location[];
};
