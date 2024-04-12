import {
  ChangeEvent,
  Children,
  Dispatch,
  ReactNode,
  createContext,
  useState,
} from "react";
import {
  useRecoilStateLoadable,
  useRecoilState,
  SetterOrUpdater,
  Loadable,
} from "recoil";
import { dataAtom, limitAtom, inputAtom, loadingAtom } from "./Atoms/Atoms";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

type citiesWeatherDataProp = {};

// type contextProp = {
//   data: Loadable<any>;
//   setData: SetterOrUpdater<any>;
//   fetchData: () => void;
//   fetchDataBySearch: () => void;
//   setLoading: SetterOrUpdater<boolean>;
//   loading: boolean;
//   limit: number;
//   setLimt: SetterOrUpdater<number>;
//   input: string;
//   setInput: SetterOrUpdater<string>;
//   handlerInput: (e: ChangeEvent<HTMLInputElement>) => void;
//   navigate: NavigateFunction;
//   handleScroll: () => void;
// };
// limit,
//   setLimt,
//   input,
//   setInput,
//   handlerInput,
// const DataContextProvider = ({ children }: { children: ReactNode }) => {
//   const [data, setData] = useRecoilStateLoadable<any>(dataAtom);

//   const [limit, setLimt] = useRecoilState(limitAtom);

//   const [input, setInput] = useRecoilState(inputAtom);

//   const navigate = useNavigate();

//   const [loading, setLoading] = useRecoilState(loadingAtom);

//   const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const handleScroll = () => {
//     if (loading) return;
//     if (
//       window.innerHeight + document.documentElement.scrollTop + 1 >=
//       document.documentElement.scrollHeight
//     ) {
//       setLimt((prev) => prev + 1);
//     }
//   };

//   const fetchDataBySearch = async (input: string, setData: any) => {
//     const value = input;
//     if (value == "") return;
//     const response = await axios.get(
//       `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en%3A"${value}"`
//     );
//     const new_data = await response.data.results;
//     if (new_data.length == 0) return alert("No data found");
//     setData(new_data);
//   };

//   async function fetchData() {
//     setLoading(true);
//     let backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`;

//     if (input.length > 0) {
//       backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A"${input}"`;
//     }
//     setTimeout(async () => {
//       try {
//         const response = await axios.get(backendUrl);
//         const new_data = await response.data.results;
//         setData((prev: any) => [...prev, ...new_data]);
//       } catch {
//         navigate("/error");
//       }
//     }, 1000);

//     setLoading(false);
//   }

//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         setData,
//         fetchData,
//         fetchDataBySearch,
//         loading,
//         setLoading,
//         limit,
//         setLimt,
//         input,
//         setInput,
//         handlerInput,
//         navigate,
//         handleScroll,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

type DataContextProp = {
  citiesWeatherData: [];
  SetCitiesWeatherData: Dispatch<any>;
  addCityWeatherData: (name: string, details: object) => void;
};

// type citiesWeatherDataProp = {
//   name:string,
//   details:{
//     temp: string,
//         wind: string,
//         humidity: string,
//         weatherDescription: string,
//         name: string,
//         pressure: string,
//         cord: s,
//         sea_level: res.data.main.sea_level,
//         timezone: res.data.timezone,
//         windGust: res.data.wind.gust,
//   }
// }

export const DataContext = createContext({} as DataContextProp);

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [citiesWeatherData, SetCitiesWeatherData] = useState<any>([]);

  const addCityWeatherData = (name: string, details: object) => {
    SetCitiesWeatherData((prev: any) => [...prev, { name, details }]);
  };

  return (
    <>
      <DataContext.Provider
        value={{ citiesWeatherData, SetCitiesWeatherData, addCityWeatherData }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContextProvider;
