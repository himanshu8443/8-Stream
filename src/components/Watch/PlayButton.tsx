"use client";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hook";
import { toggleEpModal } from "@/redux/slices/epModal";
import play from "@/assets/play.svg";
import { useEffect, useState } from "react";
import { setLang, setSeasonInfo } from "@/redux/slices/options";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getMedia() {
      setLoading(true);
      const data = await getSeasonList(imdbId);
      if (data?.success) {
        dispatch(setSeasonInfo(data?.data?.seasons));
        if (type === "movie") {
        } else {
          dispatch(setLang(data?.data?.seasons?.[0].lang[0]));
        }
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
      <div className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg px-3 py-0 bg-opacity-20 hover:scale-105 duration-200 backdrop-blur-sm">
        <p className="text-white text-4xl font-extrabold">No Media</p>
      </div>
    );
  }
  return (
    <div className="">
      <button
        className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg 
        px-3 py-0 bg-opacity-20 hover:scale-105 duration-200 backdrop-blur-sm"
        disabled={loading}
        onClick={() => {
          if (type === "movie") {
            router.push(`/watch/${type}/${tmdbId}/${imdbId}`);
          } else {
            dispatch(toggleEpModal(true));
          }
        }}
      >
        <p className="text-white text-4xl font-extrabold">
          {loading ? "Loading..." : "Play"}
        </p>
        <Image
          src={play}
          width={100}
          height={100}
          alt="play"
          className="group-hover:scale-105 group-active:scale-100 transition-all duration-300"
        />
      </button>
    </div>
  );
};

export default PlayButton;
