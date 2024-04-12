import { SetterOrUpdater } from "recoil";
import {
  handlerInput,
  fetchDataBySearch,
  handleFilterLowtoHigh,
  handleFilterHighToLow,
  handleFilterLowtoHighById,
  handleFilterHighToLowById,
  handleFilterLowtoHighByPopulation,
  handleFilterHighToLowByPopulation,
} from "../Functions";
import AutoCompleteInput from "./AutoCompleteInput";
type Input_Functions_Props = {
  input: string;
  setInput: SetterOrUpdater<string>;
  setData: any;
  data: any;
};

const Input_Functions = ({
  input,
  setInput,
  setData,
  data,
}: Input_Functions_Props) => {
  return (
    <>
      <div className="md:flex sm:flex-none ">
        <div className="flex md:w-[60%] sm:w-[60%]">
          <div className="w-[40%] ">
            <AutoCompleteInput
              value={input}
              setValue={setInput}
              handlerInput={handlerInput}
            />
          </div>

          <div className="p-5 ">
            <div
              onClick={() => fetchDataBySearch(input, setData)}
              className="border px-4 py-2  rounded-3xl bg-black hover:border-black text-white hover:bg-white hover:text-black"
            >
              Search
            </div>
          </div>
        </div>
        <div className="filters ml-5 flex gap-5">
          <div>
            <div>Filter By CityName</div>
            <div>
              <label htmlFor="set">A - Z </label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) => handleFilterLowtoHigh(e, data, setData)}
              />
            </div>
            <div>
              <label htmlFor="set">Z - A </label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) => handleFilterHighToLow(e, data, setData)}
              />
            </div>
          </div>

          <div className="">
            <div>Filter By ID</div>
            <div>
              <label htmlFor="set">Low to High </label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) => handleFilterLowtoHighById(e, data, setData)}
              />
            </div>
            <div>
              <label htmlFor="set">High to Low </label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) => handleFilterHighToLowById(e, data, setData)}
              />
            </div>
          </div>

          <div className="">
            <div>Filter By Population</div>
            <div>
              <label htmlFor="set">Low to High </label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) =>
                  handleFilterLowtoHighByPopulation(e, data, setData)
                }
              />
            </div>
            <div>
              <label htmlFor="set">High to low</label>
              <input
                id="set"
                type="radio"
                name="radio"
                onChange={(e) =>
                  handleFilterHighToLowByPopulation(e, data, setData)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input_Functions;
