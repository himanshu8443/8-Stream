"use client";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hook";
import { toggleEpModal } from "@/redux/slices/epModal";
import play from "@/assets/play.svg";
import { useEffect, useState } from "react";
import { setLang, setSeasonInfo } from "@/redux/slices/options";
import { useRouter } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";

const PlayButton = ({
  getSeasonList,
  imdbId,
  tmdbId,
  type,
}: {
  getSeasonList: (imdbId: string) => Promise<any>;
  imdbId: string;
  tmdbId: string;
  type: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getMedia() {
      setLoading(true);
      const data = await getSeasonList(imdbId);
      if (data?.success) {
        dispatch(setSeasonInfo(data?.data?.seasons));
        // console.log("Sinfo", data);
        dispatch(setLang(data?.data?.seasons?.[0].lang[0]));
        console.log(data?.data?.seasons?.[0].lang[0]);
        setLoading(false);
      } else {
        console.log(imdbId);
        setError(true);
      }
    }
    getMedia();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg px-3 bg-opacity-20 hover:scale-105 duration-200 backdrop-blur-sm py-4">
          <p className="text-white text-4xl font-extrabold">No Available</p>
        </div>
        <p className="text-white text-xs font-medium flex justify-center items-center gap-1">
          <IoIosInformationCircleOutline className="text-[#F9CC0B] text-xl" />
          Try another provider or try again later
        </p>
      </div>
    );
  }
  return (
    <div className="">
      <button
        className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg 
        px-3 py-0 bg-opacity-20 hover:scale-105 duration-200 backdrop-blur-sm max-sm:w-[350px] max-sm:justify-between"
        disabled={loading}
        onClick={() => {
          if (type === "movie") {
            router.push(`/watch/${type}/${tmdbId}/${imdbId}`);
          } else {
            dispatch(toggleEpModal(true));
          }
        }}
      >
        <p className="text-white text-4xl font-extrabold">Play</p>
        {loading ? (
          <div className="flex justify-center items-center h-[100px] w-[100px]">
            <div className="mediaLoader"></div>
          </div>
        ) : (
          <Image
            src={play}
            width={100}
            height={100}
            alt="play"
            className="group-hover:scale-105 group-active:scale-100 transition-all duration-300"
          />
        )}
      </button>
    </div>
  );
};

export default PlayButton;
