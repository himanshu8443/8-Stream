"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

import {
  FreeMode,
  Navigation,
  Mousewheel,
  Keyboard,
  Virtual,
} from "swiper/modules";

const Slider = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="Flex gap-4 flex-col">
      <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ml-3 ">
        {title}
      </h2>
      <Swiper
        modules={[Navigation, FreeMode, Mousewheel, Keyboard, Virtual]}
        breakpoints={{
          300: { slidesPerView: 4, spaceBetween: 3 },
          640: { slidesPerView: 5.3, spaceBetween: 3 },
          1024: { slidesPerView: 8.2, spaceBetween: 5 },
        }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        mousewheel={{
          forceToAxis: true,
        }}
        freeMode={true}
        className="relative"
      >
        {children}
        <button className="prev absolute top-1/2 left-0 transform -translate-y-1/2 z-50 bg-gradient-to-r from-black to-transparent w-10 h-10 rounded-full flex justify-center items-center text-white text-2xl font-semibold">
          <IoChevronBack />
        </button>
        <button className="next absolute top-1/2 right-0 transform -translate-y-1/2 z-50 bg-gradient-to-l from-black to-transparent w-10 h-10 rounded-full flex justify-center items-center text-white text-2xl font-semibold">
          <IoChevronForward />
        </button>
      </Swiper>
    </div>
  );
};

export default Slider;
