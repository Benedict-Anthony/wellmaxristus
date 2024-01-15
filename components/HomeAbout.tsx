import React from "react";
import liitleGirl from "@/assets/images/littlegirl.jpg";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const HomeAbout = () => {
  return (
    <section className="bg-white py-3 px-1 flex flex-col-reverse justify-between items-center  md:flex-row ">
      <div className="w-full">
        <Image
          src={liitleGirl}
          width={200}
          height={200}
          alt="little girl"
          className="w-full mt-2 rounded-md shadow"
        />
      </div>
      <div className="w-full px-5 text-center md:text-left space-y-2 ">
        <h3 className="text-2xl md:text-4xl font-semibold leading-normal">
          Enhance learning with{" "}
          <span className="text-lightPink">WellMax-Ristus</span>
        </h3>
        <p className="text-sm leading-7 md:leading-8 md:text-xl text-dark">
          Welcome to a revolution in education! At WellMax-Ristus, we believe in
          the power of knowledge to transform lives. Our cutting-edge e-learning
          hub is your gateway to a world of possibilities. From skill-building
          to career advancement, our curated courses and expert instructors are
          here to guide you. Join us on this exciting journey of learning and
          growth. Your future begins here.
        </p>
        <Button className="bg-lightBlue text-white hover:text-dark mb-3">
          <Link href={"/about"}>Read more</Link>
        </Button>
      </div>
    </section>
  );
};

export default HomeAbout;
