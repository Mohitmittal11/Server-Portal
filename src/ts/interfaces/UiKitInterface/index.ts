/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikTouched } from 'formik';
import { ChangeEvent, MouseEventHandler } from 'react';

export interface AuthInputProps {
  lblTextLeft?: string;
  labelStyle?: string;
  lblTextSecondary?: string;
  mandatorySign?: string;
  lblTextRight?: string;
  icon?: string;
  resStyle?: string;
  mainStyle?: string;
  type?: string;
  placeholder?: string;
  checked?: boolean;
  name?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number | any;
  id?: string;
  accept?: string;
  maxLength?: number;
  errors?: any;
  optional?: string;
  pattern?: string;
  onBlur?: any;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  min?: string;
  onWheel?: any;
}

export interface ButtonProp {
  mainStyle?: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  text: string;
  onClick?: () => void;
  id?: string;
  isLoading?: boolean;
  disabled?: boolean;
  wait?: string;
  btnImg?: string;
  btnImgRight?: string;
  ref?: string;
  tabIndex?: number;
  onKeyDown?: any;
  textStyle?: string;
  btnImgRightStyle?: string;
}

export interface CheckboxProps {
  children?: React.ReactNode;
  id?: string;
  resStyle?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  checked?: boolean;
}

export interface RadioBtnProps {
  id?: string;
  style?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  checked?: boolean;
}

export interface UiImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

export interface LinkProps {
  children?: React.ReactNode;
  text?: string;
  path?: any;
  target?: string;
  resStyle?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  id?: string;
}

export interface TitleTextPropsType {
  title?: string;
  restStyle?: string;
}

export interface TitleTextPropsType {
  children?: React.ReactNode;
  restStyle?: string;
}

export interface SearchFieldProps {
  placeholder?: string;
  nameSearch?: string;
  value?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  buttonOnClick?: ((e: any) => void) | undefined;
  resStyle?: string;
}
