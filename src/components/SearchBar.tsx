import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  setInputValue,
  handleSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Search Product by ID</h2>
      <div className="flex space-x-2">
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter product ID"
          className="bg-neutral-800 text-white border-neutral-700 border-2 focus:border-neutral-600"
        />
        <Button
          onClick={handleSearch}
          className="bg-white text-neutral-950 hover:bg-gray-200"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
