"use client";
import { useAppDispatch } from "@/lib/hook";
import { setApi } from "@/redux/slices/options";

const Options = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-[#0f0f0f] rounded-lg w-fit px-3 py-2">
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
            disabled={true}
            className="px-1 bg-gray-900 text-center  hover:bg-gray-600 rounded-lg "
            value="consumet"
          >
            Consumet
          </option>
        </select>
      </div>
    </div>
  );
};

export default Options;
