"use client";
import React, { useEffect } from "react";
import Artplayer from "./ArtPlayer";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { CgClose } from "react-icons/cg";
import { togglePlayer } from "@/redux/slices/epModal";
import { playEpisode, playMovie } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import { setLang } from "@/redux/slices/options";

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
  const seasonInfo = useAppSelector((state) => state.options.seasonInfo);
  console.log(seasonInfo);
  useEffect(() => {
    async function getStream() {
      if (params.type === "movie") {
        const data = await playMovie(params.imdb, opt.lang);
        console.log(data);
        if (data?.success && data?.data?.link?.length > 0) {
          art?.switchUrl(data?.data?.link);
          setUrl(data?.data?.link);
        } else {
          router.back();
        }
      } else {
        const data = await playEpisode(
          params.imdb,
          parseInt(season as string),
          parseInt(episode as string),
          opt.lang
        );
        console.log(data);
        if (data?.success && data?.data?.link?.length > 0) {
          setUrl(data?.data?.link);
          console.log("art", art?.switchUrl);
          art?.switchUrl(data?.data?.link);
          console.log("art", art?.playbackRate);
        } else {
          dispatch(togglePlayer(false));
        }
      }
    }
    getStream();
  }, [opt.lang]);
  return (
    <div className="fixed bg-black inset-0 flex justify-center items-end z-[200]">
      <div className="w-[100%] h-[100%] rounded-lg" id="player-container">
        {url?.length > 0 ? (
          <Artplayer
            artRef={ref}
            style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
            option={{
              container: "#player-container",
              url: url,
              setting: true,
              theme: "#fcba03",
              controls: [
                {
                  name: "Lang",
                  position: "right",
                  index: 5,
                  html: `<p >${opt.lang}</p>`,
                  selector: [
                    ...seasonInfo[0]?.lang?.map((item: any, i: number) => {
                      return {
                        default: i === 0,
                        html: `<p ">${item}</p>`,
                        value: item,
                      };
                    }),
                  ],
                  onSelect: function (item, $dom) {
                    // @ts-ignore
                    dispatch(setLang(item.value));
                    return item.html;
                  },
                },
              ],
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
        className="absolute top-0 right-0 m-5 cursor-pointer z-50"
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
