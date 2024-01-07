"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { toggleEpModal, togglePlayer } from "@/redux/slices/epModal";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import { getAvailableEpisodes } from "@/lib/api";
import { setEpisode } from "@/redux/slices/options";

const Seasons = async ({
  id,
  getEpisodes,
}: {
  id: {
    tmdb: string;
    imdb: string;
  };
  getEpisodes: (id: string, season_number: number) => Promise<any>;
}) => {
  const dispatch = useAppDispatch();
  const season = useAppSelector((state) => state.options.season);
  const epModal = useAppSelector((state) => state.epModal.epModal);
  const [episodes, setEpisodes] = useState<any>([]);
  const [availableEpisodes, setAvailableEpisodes] = useState<number>(9999);
  useEffect(() => {
    async function getSeasons() {
      const data = await getEpisodes(id.tmdb, season);
      setEpisodes(data);
      console.log(data);
    }
    getSeasons();
  }, [id, season]);
  useEffect(() => {
    async function getEp() {
      const data = await getAvailableEpisodes(id.imdb, season);
      if (data?.success) {
        setAvailableEpisodes(data?.data?.totalEpisodes);
      }
    }
    getEp();
  }, [id, season]);
  return (
    <div
      className="fixed inset-0  flex justify-center items-end z-50"
      onClick={() => {
        dispatch(toggleEpModal(false));
      }}
      style={epModal ? { display: "flex" } : { display: "none" }}
    >
      <div
        className="bg-white bg-opacity-10 backdrop-blur-sm p-5 h-[700px] w-[700px] overflow-y-scroll
      flex flex-col gap-3 rounded-t-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {episodes
          ?.slice(0, availableEpisodes)
          ?.map((episode: any, i: number) => {
            return (
              <div
                key={episode?.episode_number}
                className="flex bg-white bg-opacity-10 backdrop-blur-md rounded-lg justify-start items-center gap-3 p-2 cursor-pointer hover:bg-opacity-20 bg group"
              >
                <div
                  className="relative"
                  onClick={() => {
                    dispatch(setEpisode(i));
                    dispatch(togglePlayer(true));
                    console.log(i);
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${episode?.still_path}`}
                    alt={episode?.name}
                    width={200}
                    height={200}
                    className="object-cover w-[180px] h-[100px] rounded-lg"
                  />
                  <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <IoPlay className="text-white text-4xl" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h1 className="text-white text-xl font-medium">
                    {episode?.episode_number}. {episode?.name}
                  </h1>
                  <h1 className="text-white text-xs font-medium">
                    {episode?.overview?.length > 100
                      ? episode?.overview?.slice(0, 100) + "..."
                      : episode?.overview}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Seasons;
