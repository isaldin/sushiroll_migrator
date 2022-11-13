import React, { ChangeEvent } from "react";
import { omit } from "rambda";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
} & Omit<React.HTMLProps<HTMLInputElement>, "value" | "onChange">;

const Input: React.FC<InputProps> = (props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <>
      {props.label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {props.label}
        </label>
      )}
      <input
        {...omit(["value", "onChange"], props)}
        onChange={handleChange}
        value={props.value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </>
  );
};

export default Input;
