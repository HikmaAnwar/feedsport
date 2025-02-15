"use client";

import React, { useState } from "react";
import { Input } from "@mantine/core";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full sm:w-80"
      />
    </div>
  );
};

export default Search;
