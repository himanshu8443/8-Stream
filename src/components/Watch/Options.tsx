"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setApi, setLang, setSeason } from "@/redux/slices/options";
import play from "@/assets/play.svg";
import Image from "next/image";
import { toggleEpModal } from "@/redux/slices/epModal";

const Options = ({
  seasons,
  mediaInfo,
  type,
}: {
  seasons: any;
  mediaInfo: any;
  type: string;
}) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.options);
  const epModal = useAppSelector((state) => state.epModal.epModal);
  return (
    <div className="flex justify-between items-center gap-1 w-[80%]">
      <div className="bg-[#0f0f0f] rounded-lg  px-4 py-2 flex flex-col gap-2 relative -top-16">
        <div className="flex justify-start items-center gap-5">
          <div className="flex justify-center items-center gap-1">
            <label className="text-white text-base font-medium">Provider</label>
            <select
              className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
              onChange={(e) => dispatch(setApi(e.target.value))}
            >
              <option
                className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
                value="8stream"
              >
                8 Stream
              </option>
              <option
                className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg "
                value="Fembed"
              >
                Consumet
              </option>
            </select>
          </div>
          {type === "tv" && (
            <div className="flex justify-center items-center gap-1">
              <label className="text-white text-base font-medium">Season</label>
              <select
                className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
                onChange={(e) => dispatch(setSeason(e.target.value))}
              >
                {options.api === "8stream"
                  ? Array.from(Array(mediaInfo?.data?.totalSeasons).keys()).map(
                      (season) => {
                        return (
                          <option
                            className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
                            key={season + 1}
                            value={season + 1}
                          >
                            Season {season + 1}
                          </option>
                        );
                      }
                    )
                  : seasons
                      ?.filter((season: any) => season?.name !== "Specials")
                      ?.map((season: any) => {
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
          )}
          <div className="flex justify-center items-center gap-1">
            <label className="text-white text-base font-medium">Lang</label>
            <select
              className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
              onChange={(e) => dispatch(setLang(e.target.value))}
            >
              {options.api === "8stream" ? (
                mediaInfo?.data?.languages?.map((lang: any) => {
                  return (
                    <option
                      className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
                      key={lang?.id}
                      value={lang?.id}
                    >
                      {lang?.name}
                    </option>
                  );
                })
              ) : (
                <option className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg">
                  English
                </option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="-top-[100px] relative">
        <button
          className="flex justify-center items-center gap-3 cursor-pointer group bg-white rounded-lg 
        px-3 py-0 bg-opacity-20 hover:scale-105 duration-200 backdrop-blur-sm"
          style={!epModal ? {} : { opacity: 0 }}
          onClick={() => {
            dispatch(toggleEpModal(true));
          }}
        >
          <p className="text-white text-4xl font-extrabold">Play</p>
          <Image
            src={play}
            width={100}
            height={100}
            alt="play"
            className="group-hover:scale-105 group-active:scale-100 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default Options;
