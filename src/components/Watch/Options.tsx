"use client";
import React, { useState } from "react";

const Options = ({
  ids,
  seasons,
}: {
  ids: {
    tmdb: string;
    imdb: string;
  };
  seasons: any;
}) => {
  const [season, setSeason] = useState(seasons?.[0]?.season_number);
  const [api, setApi] = useState("8 Stream");
  const [lang, setLang] = useState("");
  const [langOptions, setLangOptions] = useState([]);

  return (
    <div className="bg-[#0f0f0f] rounded-lg w-[500px] px-4 py-2 flex flex-col gap-2 relative -top-16">
      <div className="flex justify-start items-center gap-5">
        <div className="flex justify-center items-center gap-1">
          <label className="text-white text-base font-medium">Provider</label>
          <select
            className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
            onChange={(e) => setApi(e.target.value)}
          >
            <option className="px-1 " value="8 Stream">
              8 Stream
            </option>
          </select>
        </div>
        <div className="flex justify-center items-center gap-1">
          <label className="text-white text-base font-medium">Season</label>
          <select
            className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
            onChange={(e) => setSeason(e.target.value)}
          >
            {seasons?.map((season: any) => {
              return (
                <option
                  className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
                  key={season?.id}
                  value={season?.season_number}
                >
                  {season?.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-center items-center gap-1">
          <label className="text-white text-base font-medium">Lang</label>
          <select
            className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
            onChange={(e) => setLang(e.target.value)}
          >
            {langOptions?.map((lang: any) => {
              return (
                <option
                  className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
                  key={lang?.id}
                  value={lang?.id}
                >
                  {lang?.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Options;
