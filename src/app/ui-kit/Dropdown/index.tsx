"use client";
import React, { useState } from "react";
import Select from "react-select";
import TitleText from "../TitleText/titleText";

interface SelectCompoProps {
  resStyle?: string;
  lblTextLeft?: string;
  mandatorySign?: string;
  restStyle?: string;
  arrowStyle?: string;
  minHeight?: string;
  marginTop?: string;
  optional?: string;
  onChange?: any;
  options?: any;
  name: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  label?: string;
  placeholder?: string;
  isSearchable?: boolean;
  menuPlacement?: boolean;
}

export default function SelectCompo(props: SelectCompoProps) {
  const {
    resStyle,
    lblTextLeft,
    optional,
    mandatorySign,
    restStyle,
    options,
    minHeight,
    value,
    name,
    marginTop,
    onChange,
    onFocus,
    placeholder,
    isSearchable = false, // default to false to disable typing
    menuPlacement,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`${resStyle}`}>
      <TitleText>
        <span className="text-txtCardGray">
          {lblTextLeft}
          {mandatorySign && (
            <span className="text-red-500">{mandatorySign}</span>
          )}
          {optional && (
            <span className="text-txtCardGray">{` (${optional})`}</span>
          )}
        </span>
      </TitleText>
      <div
        className={`${
          isFocused ? "border-black" : "border-textboxBorder"
        } border font-medium text-sm placeholder:text-gray-900 mobile:h-11 h-10 rounded-lg w-full relative ${restStyle}`}
      >
        <Select
          onChange={(selectedOption) => onChange(selectedOption)}
          value={value}
          options={options}
          name={name}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          menuPlacement={menuPlacement ? "top" : "bottom"}
          isSearchable={isSearchable} // Disables typing
          styles={{
            option: (styles, { isSelected }) => ({
              ...styles,
              cursor: "pointer",
              color: isSelected ? "#000000" : "#767677",
              backgroundColor: "transparent",
            }),

            control: (provided) => ({
              ...provided,
              minHeight: minHeight || "40px",
              marginTop: marginTop || "1px",
              paddingLeft: "8px",
              paddingRight: "8px",
              border: "none",
              borderRadius: "12px",
              boxShadow: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: "none",
              },
              "&::placeholder": {
                color: "#F5F5F5",
              },
              "@media (max-width: 767px)": {
                minHeight: "30px",
                marginTop: "1px",
                borderRadius: "8px",
                paddingTop: "2px",
              },
            }),
            menu: (provided) => ({
              ...provided,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "#B1B1B1",
            }),
          }}
        />
      </div>
    </div>
  );
}
