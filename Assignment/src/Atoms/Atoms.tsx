import { atom, atomFamily, selectorFamily } from "recoil";
import { ApiKey, getBgImgAndIcon, url } from "../Data";
import axios from "axios";

export const dataAtom = atom({
  key: "dataAtom",
  default: [],
});

export const limitAtom = atom({
  key: "limitAtom",
  default: 20,
});

export const inputAtom = atom({
  key: "InputAtom",
  default: "",
});

export const loadingAtom = atom({
  key: "LoadingAtom",
  default: false,
});

export const InputAtom2 = atom({
  key: "InputAtom2",
  default: "",
});

export const loadingAtom2 = atom({
  key: "LoadingAtom2",
  default: true,
});

export const DetailsAtom = atom({
  key: "DetailsAtom",
  default: {
    humidity: "",
    wind: "",
    temp: 0,
    weatherDescription: "",
    name: "",
    pressure: "",
    cord: { lon: "", lat: "" },
    sea_level: "",
    timezone: "",
    windGust: "",
  },
});

export const bgImg_BgIcon_Atom = atom({
  key: "bgImg_BgIcon_Atom",
  default: getBgImgAndIcon("Clear"),
});

export const weatherData = atomFamily({
  key: "weatherDataFamily",
  default: selectorFamily({
    key: "weatherDataSelectorFamily",
    get: (weatherName: string) => async () => {
      const weatherUrl = url + weatherName + ApiKey;
      const data = await axios.get(weatherUrl);
      return data.data;
    },
  }),
});
