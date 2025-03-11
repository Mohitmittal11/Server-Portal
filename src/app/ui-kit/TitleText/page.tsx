import { TitleTextPropsType } from '@/ts/Interfaces/UiKitInterface';

export const TitleText: React.FC<TitleTextPropsType> = ({
  children,
  restStyle = '',
}: TitleTextPropsType) => {
  return (
    <div
      className={`text-sm text-txtBlack font-pathway font-medium mb-1 ${restStyle}`}
    >
      {children}
    </div>
  );
};
