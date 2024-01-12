"use client";
import React, { useEffect } from "react";
import Artplayer from "./ArtPlayer";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { CgClose } from "react-icons/cg";
import { togglePlayer } from "@/redux/slices/epModal";
import { playEpisode, playMovie } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

const Stream = ({
  params,
}: {
  params: { imdb: string; type: string; id: string };
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const dispatch = useAppDispatch();
  const [url, setUrl] = React.useState<string>("");
  const ref = React.useRef<any>();
  const [art, setArt] = React.useState<any>();
  const opt = useAppSelector((state) => state.options);
  useEffect(() => {
    async function getStream() {
      if (params.type === "movie") {
        const data = await playMovie(params.imdb, "Hindi");
        console.log(data);
        if (data?.success && data?.data?.link?.length > 0) {
          setUrl(data?.data?.link);
        } else {
          dispatch(togglePlayer(false));
        }
      } else {
        const data = await playEpisode(
          params.imdb,
          parseInt(season as string),
          parseInt(episode as string),
          "Hindi"
        );
        console.log(data);
        if (data?.success && data?.data?.link?.length > 0) {
          setUrl(data?.data?.link);
        } else {
          dispatch(togglePlayer(false));
        }
      }
    }
    getStream();
    console.log("search params ", searchParams.get("season"));
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-[90%] h-[90%] rounded-lg" id="player-container">
        {url?.length > 0 ? (
          <Artplayer
            artRef={ref}
            style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
            option={{
              container: "#player-container",
              url: url,
              theme: "#fcba03",

              playbackRate: true,
              fullscreen: true,
              lock: true,
              fastForward: true,
              cssVar: {
                "--art-indicator-scale": 1.5,
                "--art-indicator-size": "15px",
                "--art-bottom-gap": "25px",
                "--art-control-icon-scale": 1.7,
                "--art-padding": "10px 30px",
                "--art-control-icon-size": "60px",
                "--art-volume-handle-size": "20px",
                "--art-volume-height": "150px",
              },
            }}
            getInstance={(art: any) => {
              setArt(art);
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <span className="loader"></span>
          </div>
        )}
      </div>
      <div
        className="absolute top-0 right-0 m-5 cursor-pointer"
        onClick={() => {
          router.replace(`/watch/${params.type}/${params.id}}`);
        }}
      >
        <CgClose className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default Stream;
