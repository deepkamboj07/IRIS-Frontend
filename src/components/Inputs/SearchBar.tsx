import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  delay?: number;
  placeholder?: string;
  className?: string;

}

const SearchBar = ({ onSearch, delay = 500, placeholder, className }: SearchBarProps) => {
    const [input, setInput] = useState("");
  const [debounced, setDebounced] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(input);
    }, delay);
    return () => clearTimeout(handler);
  }, [input, delay]);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-sm border border-gray-300 bg-[#fafafa] w-full max-w-md ${className}`}
    >
      <SearchOutlined style={{ color: "#888" }} />
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-black placeholder-black"
      />
    </div>
  );
};

export default SearchBar;
