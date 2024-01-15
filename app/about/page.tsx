import Image from "next/image";
import React from "react";
import littleGirl from "@/assets/images/littlegirlabout.jpg";
import Button from "@/components/Button";
import Link from "next/link";
import Card from "@/components/Card";
import { services } from "@/constants/services";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "About | WellMax-Ristus",
  description: "About WellMax-Ristus school",
};
const AboutPage = () => {
  return (
    <main className="container px-1 md:leading-7 text-center md:text-left">
      <section className="flex flex-col md:flex-row px-3 md:px-0 justify-between items-start pt-8 gap-6">
        <div className="w-full text-dark">
          <h3 className="text-2xl md:text-4xl font-semibold pb-4">
            About <span className="text-lightPink">WellMax-Ristus</span>
          </h3>
          <p className="py-1">
            <span className="text-lightBlue font-semibold">
              WELLMAX-RISTUS SCHOOLS
            </span>{" "}
            is a dynamic educational institution dedicated to fostering academic
            excellence, character development, and a lifelong love of learning.
            It is located in the heart of a thriving satellite town.
          </p>

          <p>
            Our school though relatively new, is designed to be a cornerstone of
            quality education.
          </p>

          <p className="py-1">
            Our commitment to excellence and innovation makes us a place where
            young minds flourish. With our knowledge and expertise, we are able
            to provide the most efficient, effective, and environmentally
            friendly online platform for every child within the age bracket of
            5-12 years in subjects such as Mathematics, English Language, and
            Science in our home country and anywhere in the world which is in
            line with Sustainable Development Goal 4 which is Quality Education.
          </p>
        </div>
        <div className="hidden md:block w-2/3 shadow-lg">
          <Image
            src={littleGirl}
            width={200}
            height={200}
            alt="little girl reading"
            className="w-full rounded-md"
          />
        </div>
      </section>

      <Button className="mt-4 bg-lightPink text-white hover:text-lightBlue w-1/2 md:w-40">
        <Link href={"/register"}>Get Started</Link>
      </Button>

      {/* <section className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 ">
        {services.map((item) => (
          <Card key={item.id}>
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
        ))}
      </section> */}
    </main>
  );
};

export default AboutPage;
