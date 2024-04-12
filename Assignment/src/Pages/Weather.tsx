import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiKey, getBgImgAndIcon, url } from "../Data";
import humidity from "../images/humidity.png";
import windImg from "../images/wind.png";
import { useRecoilState } from "recoil";
import { DetailsAtom, bgImg_BgIcon_Atom, loadingAtom2 } from "../Atoms/Atoms";
import { DataContext } from "../ContextApi";

const Weather = () => {
  const { cityName } = useParams();
  const [input, setInput] = useState<string | undefined>(cityName);
  const [loading, SetLoading] = useRecoilState<boolean>(loadingAtom2);
  const [details, setDetails] = useRecoilState(DetailsAtom);
  const [bgImgAndIcon, SetBgImgAndIcon] = useRecoilState(bgImg_BgIcon_Atom);

  async function fetchWeather() {
    const weatherUrl = url + input + ApiKey;
    try {
      const res = await axios.get(weatherUrl);
      const name = res.data.name;
      setDetails({
        temp: res.data.main.temp,
        wind: res.data.wind.speed,
        humidity: res.data.main.humidity,
        weatherDescription: res.data.weather[0].description,
        name: res.data.name,
        pressure: res.data.main.pressure,
        cord: res.data.coord,
        sea_level: res.data.main.sea_level,
        timezone: res.data.timezone,
        windGust: res.data.wind.gust,
      });
      console.log(name, details);
      // addCityWeatherData(name, details);
      SetBgImgAndIcon(getBgImgAndIcon(res.data.weather[0].main));
    } catch (error) {
      console.log(error);
      alert("Error fetch Data");
    }
    SetLoading(false);
  }

  useEffect(() => {
    SetLoading(true);
    fetchWeather();
  }, []);

  if (loading) {
    return <div>...loading</div>;
  } else if (!loading) {
    return (
      <>
        <div className=" flex justify-center items-center">
          <div
            className="border h-[500px] m-5 mt-[5%] rounded-xl w-[80%]  bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImgAndIcon.bgImg})`,
            }}
          >
            <div className="flex justify-center">
              <input
                type="text"
                className="border border-black rounded-xl px-4 py-2 m-4"
                placeholder="Enter City Name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex justify-center items-center">
                <button
                  className="px-4 py-2 rounded-xl border border-black  m-4 bg-black hover:border hover:border-black  text-white hover:bg-white hover:text-black"
                  onClick={fetchWeather}
                >
                  Search
                </button>
              </div>
            </div>

            <div className=" flex justify-center items-center">
              <div
                className="  h-[200px] w-[200px] bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgImgAndIcon.bgIcon})`,
                }}
              ></div>

              <p className="text-center font-bold  text-3xl">
                {" "}
                {details.temp}&deg;C <br />
                {details.weatherDescription} <br />
                {details.name}
              </p>
            </div>

            <div className="mt-[50px]">
              <div className="ml-3 flex justify-between text-center">
                <div>
                  <div
                    className=" h-[100px] w-[100px] bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${humidity})` }}
                  ></div>
                  <div className="bg-gray-50 text-black">
                    <span className="text-center  text-2xl">
                      {details.humidity}%
                    </span>
                    <p className="text-center ">Humidity</p>
                  </div>
                </div>

                <div className="mr-3  text-center">
                  <div
                    className="h-[100px] w-[100px] bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${windImg})` }}
                  ></div>
                  <div className="bg-gray-50 text-black">
                    <span className="text-center  text-2xl">
                      {details.wind}%
                    </span>
                    <p className="text-center">Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[12%] ">
          <p className="font-bold">More Info</p>
          <div className="flex gap-[50px]">
            <div className="m-3 ml-0">
              <p>Pressure : {details.pressure} Pa</p>
              <p>Wind Gust : {details.windGust}</p>
            </div>
            <div className="m-3 ml-0">
              <p>Latitude : {details.cord.lat}</p>
              <p>Longitude : {details.cord.lon}</p>
            </div>
            <div className="m-3 ml-0">
              <p>Sea level : {details.sea_level}</p>
              <p>Timezone : {details.timezone}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Weather;
