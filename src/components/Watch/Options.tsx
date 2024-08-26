"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setApi } from "@/redux/slices/options";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Options = () => {
  const api = useAppSelector((state) => state.options.api);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#0f0f0f] rounded-lg w-fit px-3 py-2">
        <div className="flex justify-center items-center gap-1">
          <label className="text-white text-base font-medium">Provider</label>
          <select
            className="bg-white/20 backdrop-blur-lg rounded-lg px-2 py-1 text-sm text-white font-medium styled-select outline-none"
            value={api}
            onChange={(e) => {
              dispatch(setApi(e.target.value));
            }}
          >
            <option
              className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg"
              value="8stream"
            >
              8 Stream
            </option>
            <option
              className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg "
              value="consumet"
            >
              Consumet
            </option>
          </select>
        </div>
      </div>
      <p className="text-white text-xs font-medium flex  items-center gap-1">
        <IoIosInformationCircleOutline className="text-[#F9CC0B] text-sm" />
        {api === "8stream"
          ? "8stream provide multi lang"
          : "Consumet provide eng and subs"}
      </p>
    </div>
  );
};

export default Options;
