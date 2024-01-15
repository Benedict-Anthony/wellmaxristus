"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { services } from "@/constants/services";
import Card from "./Card";
import Image from "next/image";

export default function Services() {
  return (
    <>
      <h2 className="text-center tex-md md:text-3xl font-semibold  mt-3 py-2 text-lightBlue">
        What we can help you with
      </h2>
      <div className=" pb-3 pt-5 px-4">
        <Swiper
          slidesPerView={3}
          spaceBetween={15}
          //   freeMode={true}
          draggable={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            180: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className="mySwiper"
        >
          {services.map((item) => (
            <SwiperSlide key={item.id}>
              <Card>
                <Image
                  src={item.image}
                  height={70}
                  width={70}
                  alt={item.name}
                  className="w-full"
                ></Image>
                <div className="w-full">
                  <h2 className="card-title text-lightBlue my-2 w-full">
                    {item.name}
                  </h2>
                  <p>{item.description}</p>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
