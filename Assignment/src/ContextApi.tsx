import { Dispatch, ReactNode, createContext, useState } from "react";

type DataContextProp = {
  citiesWeatherData: [];
  SetCitiesWeatherData: Dispatch<any>;
  addCityWeatherData: (name: string, details: object) => void;
};

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
