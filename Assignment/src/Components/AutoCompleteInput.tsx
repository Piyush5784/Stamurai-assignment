import { ChangeEvent, useState } from "react";
import { country_names } from "../Data";
import { SetterOrUpdater } from "recoil";

type autoCompleteprops = {
  value: string;
  handlerInput: (
    e: ChangeEvent<HTMLInputElement>,
    setInput: SetterOrUpdater<string>
  ) => void;
  setValue: SetterOrUpdater<string>;
};

const AutoCompleteInput = ({
  value,
  handlerInput,
  setValue,
}: autoCompleteprops) => {
  const options = country_names;
  const [showSuggestion, SetShowSuggestion] = useState(false);

  function handlerOnClick(suggestion: string) {
    setValue(suggestion);
    SetShowSuggestion(false);
  }

  const suggestion = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          className="w-[90%]  m-5 p-2 border border-black"
          placeholder="Search by city "
          onChange={(e) => handlerInput(e, setValue)}
          value={value}
          onClick={() => SetShowSuggestion(!showSuggestion)}
        />
        {showSuggestion && (
          <ul className="absolute bg-white border md:w-[40%] sm:w-[60%] ml-5">
            {suggestion.map((suggestion, index: number) => (
              <div
                key={index}
                className="hover:bg-gray-400 p-2"
                onClick={() => handlerOnClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AutoCompleteInput;
