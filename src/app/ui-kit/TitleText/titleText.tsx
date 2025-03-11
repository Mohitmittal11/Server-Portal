"use client";
import { TitleTextPropsType } from "@/ts/interfaces/UiKitInterface";

const TitleText: React.FC<TitleTextPropsType> = ({
  children,
  restStyle = "",
}: TitleTextPropsType) => {
  return (
    <div className={`text-sm text-black font-medium mb-1 ${restStyle}`}>
      {children}
    </div>
  );
};

export default TitleText;
