/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
"use client";

import { memo, useEffect, useState } from "react";
import { TitleText } from "../TitleText/page";
import { AuthInputProps } from "@/ts/interfaces/UiKitInterface";
const AuthInput = memo((props: AuthInputProps) => {
  const {
    labelStyle,
    errors,
    lblTextLeft,
    mandatorySign,
    lblTextRight,
    icon,
    resStyle,
    mainStyle,
    type,
    placeholder,
    checked,
    name,
    onChange,
    onFocus,
    onClick,
    onKeyDown,
    disabled,
    readOnly,
    value,
    id,
    accept,
    maxLength,
    pattern,
    touched,
    onBlur,
    optional,
  } = props;
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [, setDisplayError] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { key, target } = event;
    if (name === "dueAmount" && !/^\d$/.test(key)) {
      event.preventDefault();
    } else if (
      key === " " &&
      !(target as HTMLInputElement | HTMLTextAreaElement).value.trim()
    ) {
      event.preventDefault();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const numberFieldArray: string[] | undefined = [
    "fixedCost",
    "priceInside_city_perDay",
    "dueAmount",
    "priceInoutSide_city_perKm",
    "minimumPay",
  ];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (numberFieldArray.includes(name as string)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    } else if (
      name === "password" ||
      name === "confirmPassword" ||
      type === "password"
    ) {
      event.target.value = event.target.value.replace(/\s/g, "");
    }
    onChange && onChange(event);
  };

  useEffect(() => {
    if (!!errors && isTouched) setDisplayError(true);
    else setDisplayError(false);
  }, [errors, isTouched]);
  useEffect(() => {
    if (!!errors && isTouched) setIsTouched(true);
    else setIsTouched(false);
  }, [errors, isTouched]);

  return (
    <div className="relative">
      <div className="flex justify-between">
        <TitleText restStyle={labelStyle}>
          {lblTextLeft}
          <span className="text-red-500">{mandatorySign}</span>
          {optional && (
            <span>
              {" "}
              <p className="inline-block text-txtCardGray">{`(${optional})`}</p>
            </span>
          )}
        </TitleText>

        <p className="text-sm text-optionText font-medium font-pathway">
          {lblTextRight}
        </p>
      </div>
      <div
        className={`${
          isFocused ? "border-black" : "border-lightBgGreen"
        } border font-pathway font-normal text-sm text-black mobile:h-11 h-10 px-4 rounded-md w-full flex items-center relative 
          // errors ? "border-red-600" : ""
        ${mainStyle} `}
      >
        <div className="w-full">
          <input
            type={
              type === "number" && numberFieldArray.includes(name as string)
                ? "text"
                : type
            }
            inputMode={
              numberFieldArray.includes(name as string) ? "numeric" : undefined
            }
            pattern={
              numberFieldArray.includes(name as string) ? "\\d*" : pattern
            }
            onKeyPress={handleKeyPress}
            value={value}
            className={`border-none bg-transparent focus:outline-none font-pathway font-medium text-sm text-black mobile:h-10 h-9 rounded-lg w-full appearance-none placeholder:text-txtCardGray placeholder:font-normal ${resStyle}`}
            placeholder={placeholder}
            checked={checked}
            name={name}
            // pattern={pattern}
            onWheel={(event) => {
              event.preventDefault();
              event.currentTarget.blur();
            }}
            min="0"
            onChange={handleChange}
            onKeyDown={(event) => {
              onKeyDown && onKeyDown(event);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur || onBlur}
            onClick={onClick}
            readOnly={readOnly}
            disabled={disabled}
            accept={accept}
            maxLength={maxLength}
            id={id}
            // inputMode="text"
          />
          {icon && (
            <div className="absolute w-6 h-6 right-5 top-10">
              <img className="w-full h-full" src={icon} alt="icon" />
            </div>
          )}
        </div>
      </div>
      {errors && touched && (
        <div className="col-span-2 relative -bottom-1 px-1 text-xs font-pathway">
          <div className="text-red-600 text-xs flex items-center gap-2">
            <img
              src="/vendor/images/errorIcon.svg"
              alt="error"
              className="w-4"
            />
            {errors}
          </div>
        </div>
      )}
    </div>
  );
});

export default AuthInput;
