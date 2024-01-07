"use client";
import React, { useEffect } from "react";
import Artplayer from "./ArtPlayer";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { CgClose } from "react-icons/cg";
import { togglePlayer } from "@/redux/slices/epModal";

const Stream = ({
  getStreamUrl,
  imdbId,
}: {
  getStreamUrl: (
    id: string,
    episode: number,
    lang: number,
    season: number
  ) => Promise<any>;
  imdbId: string;
}) => {
  const dispatch = useAppDispatch();
  const isPlayer = useAppSelector((state) => state.epModal.player);
  const opt = useAppSelector((state) => state.options);
  const [url, setUrl] = React.useState<string>("");
  const ref = React.useRef<any>();
  const [art, setArt] = React.useState<any>();
  useEffect(() => {
    async function getStream() {
      const data = await getStreamUrl(
        imdbId,
        opt.episode,
        opt.lang,
        opt.season
      );
      if (data?.success) {
        setUrl(data?.data?.streamLink);
        console.log(data);
      }
    }
    getStream();
  }, [opt]);
  return (
    isPlayer && (
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
                autoSize: true,
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
              <h1 className="text-white text-2xl">Loading...</h1>
            </div>
          )}
        </div>
        <div
          className="absolute top-0 right-0 m-5 cursor-pointer"
          onClick={() => {
            art?.destroy();
            art?.hls?.destroy();
            dispatch(togglePlayer(false));
          }}
        >
          <CgClose className="text-white text-4xl" />
        </div>
      </div>
    )
  );
};

export default Stream;
