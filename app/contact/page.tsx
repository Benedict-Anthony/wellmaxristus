"use client";
import Button from "@/components/Button";
import SocialIcons from "@/components/SocialIcons";
import { Spinner } from "@/components/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

type ContactForm = {
  email: string;
  subject: string;
  body: string;
};

const schema = yup.object({
  email: yup.string().required("This field is required"),
  subject: yup.string().required("This field is required"),
  body: yup.string().required("This field is required"),
});

const ContactPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Message sent succefully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="container px-2">
      <section className="max-w-[500px] px-4 py-3 drop-shadow-lg shadow-lg mt-4 mx-auto">
        <p className="text-xl font-semibold py-3 text-lightPink ">
          {" "}
          Send us an email
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="form-control w-full">
            <label
              htmlFor="name"
              className="label-text label text-md text-lightBlue md:font-semibold"
            >
              Subject
            </label>
            <p className="text-error text-md">{errors.subject?.message}</p>
            <input
              className="input input-primary resize-none focus:outline-none w-full"
              type="name"
              {...register("subject")}
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
            {isSubmitting ? <Spinner /> : "SEND"}
          </Button>
        </form>
      </section>
      <div className="bg-white mt-7 px-2 py-4 max-w-[500px] mx-auto rounded-sm">
        <SocialIcons />
      </div>
    </main>
  );
};

export default ContactPage;
