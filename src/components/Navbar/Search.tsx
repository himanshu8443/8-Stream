"use client";
import { useEffect, useState } from "react";
import { search } from "@/lib/api";
import { debounce } from "lodash";
import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    const res = await search(query);
    setResults(res);
  };

  useEffect(() => {
    const debounced = debounce(searchMovies, 500);
    debounced();
    return debounced.cancel;
  }, [query]);
  return (
    <div className="relative w-[350px]">
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setQuery(""), 500)}
          className="bg-[#02040A] w-[100px] max-sm:focus:w-[80vw] lg:focus:w-[300px] h-10 px-3 py-2  text-white placeholder-white/50 focus:outline-none
          focus:border-yellow-500 focus:border-b
        transition-all duration-200"
        />
        <IoSearchSharp className="text-white max-sm:text-xl text-3xl" />
      </div>
      {query && (
        <div
          className="flex flex-col justify-center gap-2 w-[370px] absolute top-12 left-0 z-[100] bg-black
        bg-opacity-60 backdrop-blur-xl rounded-md max-sm:focus:w-[80vw] p-3"
        >
          <div className="overflow-y-scroll max-h-[600px]">
            {results?.map((result: any) => (
              <Link href={`/watch/${result?.media_type}/${result?.id}`}>
                <div className="flex w-full justify-start hover:bg-white/20 items-center gap-2 bg-white/15 p-1 ">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${result?.poster_path}`}
                    alt="poster"
                    className="min-w-[100px] h-[50px] object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h3 className="truncate w-[200px]">
                      {result?.title || result?.name}
                    </h3>
                    <div className="flex gap-3">
                      <p className="text-xs text-gray-400 capitalize w-7 text-center">
                        {/* get media type */}
                        {result?.media_type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {/* get year */}
                        {result?.release_date?.slice(0, 4) ||
                          result?.first_air_date?.slice(0, 4)}
                      </p>
                      <p className="text-xs font-bold text-yellow-600">
                        {/* get rating */}
                        {result?.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
