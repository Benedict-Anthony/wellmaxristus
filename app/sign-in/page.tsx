"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import Button from "@/components/Button";
import loginSvg from "@/assets/svg/signup.svg";
import Oauth from "@/components/Oauth";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { saveToStore } from "@/lib/storageFunctions";
type Form = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setError,
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      reset();
      saveToStore();
      router.back();
    } catch (error) {
      setError("email", { message: "Invalid email or password" });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) return router.back();
  }, []); // eslint-disable-line

  return (
    <section className="max-w-full md:max-w-[900px] mx-auto flex md:flex-row justify-between items-center mt-[6.5rem] px-5 md:space-x-7">
      <div className="md:w-3/5 w-full shadow drop-shadow-md px-3 py-2">
        <Oauth />
        <p className="text-center text-lightBlue text-sm py-2 my-3">
          Or Login up with your email
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <p className="text-sm text-pink-500 py-2">
              {errors.email?.message}
            </p>
            <div className="input_field">
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <FaRegEnvelope />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <p className="text-sm text-pink-500 py-2">
              {errors.password?.message}
            </p>
            <div className="input_field">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <CiLock />
            </div>
          </div>

          <Button
            className="text-white mt-5  border-2 bg-lightPink rounded-md hover:bg-darkPink hover:text-white w-full"
            type="submit"
          >
            {!isSubmitting ? "Sign In" : <Spinner />}
          </Button>
        </form>
      </div>

      <div className="w-3/5 hidden md:block">
        <h1 className="md:text-xl py-4 font-semibold text-blue ">
          Welcome to WellMax-Ristus School
        </h1>
        <div className="w-full">
          <Image
            src={loginSvg}
            width={100}
            height={100}
            alt="Sign In Image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
