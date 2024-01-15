"use client";
import Button from "@/components/Button";
import SocialIcons from "@/components/SocialIcons";
import { Metadata } from "next/types";
import React from "react";
import { useForm } from "react-hook-form";

type ContactForm = {
  email: string;
  name: string;
  body: string;
};

export const metadata: Metadata = {
  title: "Contact | WellMax-Ristus",
  description: "About WellMax-Ristus school",
};
const Contact = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log(1234);
  };
  return (
    <main className="container px-2">
      <section className="max-w-[500px] px-4 py-3 drop-shadow-lg shadow-lg mt-4 mx-auto">
        <p className="text-xl font-semibold py-3 text-lightPink ">
          {" "}
          Send us an email
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label
              htmlFor="name"
              className="label-text label text-md text-lightBlue md:font-semibold"
            >
              Name
            </label>
            <p className="text-error text-md">{errors.name?.message}</p>
            <input
              className="input input-primary resize-none focus:outline-none w-full"
              type="name"
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="email"
              className="label-text label text-md text-lightBlue md:font-semibold"
            >
              Your email
            </label>
            <p className="text-error text-md">{errors.email?.message}</p>
            <input
              type="email"
              className="input input-primary resize-none focus:outline-none"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="body"
              className="label-text label text-md text-lightBlue md:font-semibold"
            >
              Body
            </label>
            <p className="text-error text-md">{errors.body?.message}</p>

            <textarea
              className="textarea textarea-primary resize-none  focus:outline-none"
              {...register("body")}
            ></textarea>
          </div>
          <Button
            className="text-white mt-5  border-2 bg-lightPink rounded-md hover:bg-darkPink hover:text-white w-full"
            type="submit"
          >
            Send
          </Button>
        </form>
      </section>
      <div className="bg-white mt-7 px-2 py-4 max-w-[500px] mx-auto rounded-sm">
        <SocialIcons />
      </div>
    </main>
  );
};

export default Contact;
