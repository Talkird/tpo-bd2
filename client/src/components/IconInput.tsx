import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

interface IconInputProps {
  icon: IconDefinition;
  placeholder: string;
  onChange: (value: string) => void;
}

function IconInput(props: IconInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className="mb-3 flex items-center rounded-md border bg-[#E9E9E9] p-2">
      <FontAwesomeIcon className="mr-2 text-gray-500" icon={props.icon} />
      <input
        className="w-full bg-[#E9E9E9] text-gray-700 placeholder-gray-500 focus:outline-none"
        placeholder={props.placeholder}
        type="text"
        value={inputValue}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default IconInput;
