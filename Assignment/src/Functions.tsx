import axios from "axios";
import { ChangeEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { SetterOrUpdater } from "recoil";

export const fetchDataBySearch = async (
  input: string,
  setData: SetterOrUpdater<any>
) => {
  const value = input;
  if (value == "") return;
  const response = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en%3A"${value}"`
  );
  const new_data = await response.data.results;
  if (new_data.length == 0) return alert("No data found");
  setData(new_data);
};

type fetchDataProp = {
  setLoading: SetterOrUpdater<boolean>;
  input: string;
  limit: number;
  navigate: NavigateFunction;
  setData: SetterOrUpdater<any>;
};

export async function fetchData({
  setLoading,
  limit,
  input,
  setData,
  navigate,
}: fetchDataProp) {
  setLoading(true);
  let backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`;

  if (input.length > 0) {
    backendUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A"${input}"`;
  }
  setTimeout(async () => {
    try {
      const response = await axios.get(backendUrl);
      const new_data = await response.data.results;
      setData((prev: any) => [...prev, ...new_data]);
    } catch (error) {
      navigate("/error");
    }
  }, 1000);

  setLoading(false);
}

export const handlerInput = (
  e: ChangeEvent<HTMLInputElement>,
  setInput: SetterOrUpdater<string>
) => {
  setInput(e.target.value);
};

interface Item {
  name: string;
  geoname_id: number;
}

interface setDataProps {
  contents: [{ name: string; geoname_id: number }];
  state: string;
}

export function handleFilterHighToLow(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state == "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: { name: string }) => item.name)
        .sort((a: { name: string }, b: { name: string }) =>
          b.name.localeCompare(a.name)
        );
      setData(filteredAndSortedData);
    }
  }
}

export function handleFilterLowtoHigh(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state == "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: { name: string }) => item.name)
        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        );
      setData(filteredAndSortedData);
    }
  }
}

export function handleFilterHighToLowById(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state === "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: Item) => item.name)
        .sort((a: Item, b: Item) => b.geoname_id - a.geoname_id);
      setData(filteredAndSortedData);
    }
  }
}

export function handleFilterLowtoHighById(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state === "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: Item) => item.name)
        .sort((a: Item, b: Item) => a.geoname_id - b.geoname_id);
      setData(filteredAndSortedData);
    }
  }
}

export function handleFilterLowtoHighByPopulation(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state === "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: any) => item.population != null)
        .sort((a: any, b: any) => a.population - b.population);
      setData(filteredAndSortedData);
    }
  }
}

export function handleFilterHighToLowByPopulation(
  e: ChangeEvent<HTMLInputElement>,
  data: setDataProps,
  setData: SetterOrUpdater<Item[]>
) {
  if (e.target.checked) {
    if (data.state === "hasValue") {
      const filteredAndSortedData = data.contents
        .filter((item: any) => item.population != null)
        .sort((a: any, b: any) => b.population - a.population);
      setData(filteredAndSortedData);
    }
  }
}
