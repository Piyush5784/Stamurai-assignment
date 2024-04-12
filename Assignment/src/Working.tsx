import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { dataAtom, limitAtom, inputAtom, loadingAtom } from "../Atoms/Atoms";
import AutoCompleteInput from "./AutoCompleteInput";
import { Loading } from "./LoadingAnimation";
import { Link } from "react-router-dom";

export default function Table() {
  const [data, setData] = useRecoilStateLoadable<any>(dataAtom);

  const [limit, setLimt] = useRecoilState(limitAtom);

  const [input, setInput] = useRecoilState(inputAtom);

  const [loading, setLoading] = useRecoilState(loadingAtom);

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchDataBySearch = async () => {
    const value = input;
    if (value == "") return;
    const response = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en%3A"${value}"`
    );
    const new_data = await response.data.results;
    if (new_data.length == 0) return alert("No data found");
    setData(new_data);
  };

  async function fetchData() {
    setLoading(true);
    let backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`;

    if (input.length > 0) {
      backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A"${input}"`;
    }
    setTimeout(async () => {
      const response = await axios.get(backendUrl);
      const new_data = await response.data.results;
      setData((prev: any) => [...prev, ...new_data]);
    }, 1000);

    setLoading(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLimt((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  if (data.state == "loading") {
    <div className="ml-[50%]">
      <Loading />
    </div>;
  } else if (data.state == "hasValue") {
    return (
      <>
        <div>
          <p className="text-center p-5 font-bold  text-3xl">City Table</p>

          <div className="flex w-full ">
            <div className="w-[40%] ">
              <AutoCompleteInput
                value={input}
                setValue={setInput}
                handlerInput={handlerInput}
              />
            </div>

            <div className="p-5 ">
              <div
                onClick={fetchDataBySearch}
                className="border px-4 py-2  rounded-3xl bg-black hover:border-black text-white hover:bg-white hover:text-black"
              >
                Search
              </div>
            </div>
          </div>

          <table className="table-auto border border-gray-300">
            <thead className="w-full">
              <tr>
                <th className="px-4 py-2 bg-gray-200">Geoname ID</th>
                <th className="px-4 py-2 bg-gray-200">Name</th>
                <th className="px-4 py-2 bg-gray-200">Country name EN</th>
                <th className="px-4 py-2 bg-gray-200">ASCII Name</th>
                <th className="px-4 py-2 bg-gray-200">Population</th>
                <th className="px-4 py-2 bg-gray-200">Alternate Names</th>
                {/* <th className="px-4 py-2 bg-gray-200">Digital Elevation Model</th> */}
                <th className="px-4 py-2 bg-gray-200">Timezone</th>
                <th className="px-4 py-2 bg-gray-200">Country Code</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {!loading &&
                data.contents.map((item: any) => (
                  <>
                    <tr key={item.geoname_id}>
                      <td className="px-4 py-2 border">{item.geoname_id}</td>

                      <td className="px-4 py-2 border">
                        <Link to={`/weather/${item.name}`}>{item.name} </Link>
                      </td>
                      <td className="px-4 py-2 border">
                        <Link to={`/weather/${item.cou_name_en}`}>
                          {item.cou_name_en}
                        </Link>
                      </td>
                      <td className="px-4 py-2 border">{item.ascii_name}</td>
                      <td className="px-4 py-2 border">{item.population}</td>
                      <td className="px-4 py-2 border">
                        {item.alternate_names != null &&
                          item.alternate_names.slice(0, 1).join(", ")}
                      </td>
                      {/* <td className="px-4 py-2 border">{item.elevation}</td> */}
                      <td className="px-4 py-2 border">{item.timezone}</td>
                      <td className="px-4 py-2 border">{item.country_code}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiKey, getBgImgAndIcon, url } from "../Data";
import humidity from "../images/humidity.png";
import windImg from "../images/wind.png";
const Weather = () => {
  const { cityName } = useParams();
  const [input, setInput] = useState(cityName);
  const [response, SetResponse] = useState<any>();
  const [loading, SetLoading] = useState(true);
  const [details, setDetails] = useState({
    humidity: "",
    wind: "",
    temp: 0,
  });

  const [bgImgAndIcon, SetBgImgAndIcon] = useState(getBgImgAndIcon("Clear"));

  async function fetchWeather() {
    const weatherUrl = url + input + ApiKey;
    try {
      const res = await axios.get(weatherUrl);
      let bgStr = res.data.weather[0].main;
      let humidity = res.data.main.humidity;
      let wind = res.data.wind.speed;
      let temp = Math.floor(res.data.main.temp);
      setDetails({
        temp,
        wind,
        humidity,
      });
      SetBgImgAndIcon(getBgImgAndIcon(bgStr));
      SetResponse(res.data);
    } catch (error) {
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
            </div>
            <p className="text-center text-black text-3xl">
              {" "}
              {details.temp}&deg;C<p className="text-xl">{input}</p>
            </p>

            <div className=" flex justify-between">
              <div>
                <div
                  className="m-3 h-[100px] w-[100px] bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${humidity})` }}
                ></div>
                <p className="text-center">{details.humidity}%</p>
              </div>

              <div>
                <div
                  className="m-3 h-[100px] w-[100px] bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${windImg})` }}
                ></div>
                <p className="text-center">{details.wind}%</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Weather;
