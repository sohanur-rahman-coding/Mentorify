"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/tutors?${params.toString()}`);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative animate__animated animate__fadeIn flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-black transition-all overflow-hidden"
    >
      <div className="pl-5 text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search for tutors or subjects..."
        className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="h-10 px-6 mr-2 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
