import { cn } from '@/app/utils/merger';
import useOutsideClick from '@/app/utils/useOutsideClick';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface DropdownProps {
  spec: {
    _id: string;
    keyName: string;
    specifications_values: { _id: string; keyValue: string }[];
  };
  currentValue: string;
  handleSpecificationChange: (
    keyName: string,
    id: string,
    value: { value: string; keyValue: string },
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  spec,
  currentValue,
  handleSpecificationChange,
  onFocus,
}) => {
  const t = useTranslations('Title');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSelect = (value: { _id: string; keyValue: string }) => {
    handleSpecificationChange(spec.keyName, spec._id, {
      value: value._id,
      keyValue: value.keyValue,
    });
    setIsOpen(false);
  };

  const closeDdl = useOutsideClick<HTMLInputElement>(() => {
    setIsOpen(false);
  });

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
    <div ref={closeDdl} className="relative w-full">
      {/* Dropdown button */}
      <div
        className={cn(
          'border font-pathway font-medium text-sm mobile:h-11 h-10 rounded-lg w-full flex items-center justify-between px-4 cursor-pointer bg-white relative',
          isFocused ? 'border-black' : '',
          currentValue
            ? spec.specifications_values?.find((v) => v._id === currentValue)
                ?.keyValue === t('Select an option')
              ? 'text-txtCardGray font-normal'
              : 'text-black font-medium'
            : 'text-txtCardGray',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="absolute top-0 left-0 inset-0 px-4 font-pathway text-sm cursor-pointer w-full h-full border border-transparent bg-transparent focus:outline-none focus:border-none"
          readOnly
        />
        {currentValue
          ? spec.specifications_values.find((v) => v._id === currentValue)
              ?.keyValue || t('Select an option')
          : t('Select an option')}
        <span className="ml-2">
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            fill="#B1B1B1"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        </span>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute left-0 w-full max-h-72 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-1">
          <li
            className="px-4 py-2 text-black cursor-default"
            onClick={() =>
              handleSelect({ _id: '', keyValue: t('Select an option') })
            }
          >
            {t(`Select an option`)}
          </li>
          {spec?.specifications_values.map((value) => (
            <li
              key={value._id}
              className="px-4 py-2 bg-transparent font-pathway font-medium text-sm text-txtCardGray hover:text-lightGreen cursor-pointer"
              onClick={() => handleSelect(value)}
            >
              {value.keyValue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
