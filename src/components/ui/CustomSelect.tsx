import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect, FC } from "react";
interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const CustomSelect: FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between px-4 py-3 text-sm text-gray-700 p-[10px] w-full bg-[#F6F6F6] rounded-[6px] focus:outline-none placeholder:text-[#999] placeholder:text-[12px] ${
          options.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={options?.length === 0}
      >
        <span>{value || placeholder}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto py-5">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
