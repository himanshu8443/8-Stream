"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import epModal, { toggleEpModal } from "@/redux/slices/epModal";
import play from "@/assets/play.svg";
import { useEffect, useState } from "react";
import { setSeasonInfo } from "@/redux/slices/options";
import { useRouter } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { getConsumetMediaInfo } from "@/lib/consumetApi";

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
  const seasonModal = useAppSelector((state) => state.epModal.epModal);
  const provider = useAppSelector((state) => state.options.api);
  useEffect(() => {
    // 8stream info
    console.log("provider", provider);

    async function getMedia() {
      setLoading(true);
      if (type === "movie") {
        dispatch(toggleEpModal(false));
      }
      const data = await getSeasonList(imdbId);
      if (data?.success) {
        dispatch(setSeasonInfo(data?.data?.seasons));
        // console.log("Sinfo", data);
        setLoading(false);
      } else {
        setError(true);
      }
    }
    // consumet info
    async function getConsumet() {
      setLoading(true);
      const data = await getConsumetMediaInfo(tmdbId, type);
      if (data?.success) {
        dispatch(setSeasonInfo(data?.data?.seasons));
      } else {
        setError(true);
      }
      setLoading(false);
    }
    if (provider === "8stream") {
      setError(false);
      getMedia();
    } else {
      setError(false);
      getConsumet();
    }
  }, [provider]);

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
    !seasonModal && (
      <div className="">
        <button
          className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg 
        px-3 py-0 bg-opacity-20 duration-200 backdrop-blur-sm max-sm:w-[350px] max-sm:justify-between"
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
              unoptimized={true}
              src={play}
              width={100}
              height={100}
              alt="play"
              className="group-hover:scale-110 group-active:scale-100 transition-all duration-300"
            />
          )}
        </button>
      </div>
    )
  );
};

export default PlayButton;
