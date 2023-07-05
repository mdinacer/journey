import { Search } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';

const SearchBar = () => {
  return (
    <div className=" inline-flex w-full items-center gap-x-3 rounded-md bg-[#F3F3F3] px-4">
      <Search className=" h-5 w-5" />
      <input
        placeholder="Type a search query to filter"
        className="background flex h-10 w-full rounded-md border  border-none bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

export default SearchBar;
