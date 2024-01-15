"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import Button from "@/components/Button";
import { FaRegUser } from "react-icons/fa";
import loginSvg from "@/assets/svg/signup.svg";
import Oauth from "@/components/Oauth";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, database, storage } from "@/config/firebase";
import { Spinner } from "@/components/Spinner";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { saveToStore } from "@/lib/storageFunctions";

type Form = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  image: string;
};

const SignUpPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    register,
  } = useForm<Form>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const image = acceptedFiles[0];
        // Do something with the files
        const imageRef = ref(storage, `profile/${uuidv4()}`);

        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        setValue("image", url);
      } catch (err) {
        console.log(err);
      }
    },
    [setValue]
  );
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const onSubmit = async (data: Form) => {
    const { email, password, name, image } = data;
    const collectonRef = collection(database, "profile");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = response;

      const userProfile = {
        user_id: user.uid,
        displayName: name,
        photoUrl: image ? image : "/images/avata.jpg",
      };

      await addDoc(collectonRef, userProfile);
      await signInWithEmailAndPassword(auth, email, password);
      reset();
      saveToStore();
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) return router.back();
  }, []); // eslint-disable-line
  return (
    <section className="max-w-full w-full md:max-w-[900px] mx-auto flex md:flex-row justify-between items-center mt-[6.5rem] px-5 md:space-x-7">
      <div className="md:w-3/5 w-full drop-shadow-md shadow rounded-md px-3 py-2">
        <Oauth />
        <p className="text-center text-lightBlue text-sm py-2 my-3">
          Or Sign up with your email
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <p className="text-sm text-pink-500 py-2">{errors.name?.message}</p>
            <div className="input_field">
              <input
                type="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <FaRegUser />
            </div>
          </div>
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
                  validate: {
                    password: (value) => {
                      if (value.length < 5) {
                        return "Password must be at least six charaters";
                      }
                      return true;
                    },
                  },
                })}
              />
              <CiLock />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password_confirm">Confirm Password</label>
            <p className="text-sm text-pink-500 py-2">
              {errors.confirm_password?.message}
            </p>
            <div className="input_field">
              <input
                type="password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },

                  validate: {
                    confirm_password: (value) => {
                      const password = getValues("password");
                      if (value.length < 5)
                        return "Password must be at least six charaters";
                      if (password != value) return "Password does not match";
                      return true;
                    },
                  },
                })}
              />
              <CiLock />
            </div>
          </div>
          <div
            className="file-input w-full mt-4 text-sm md:text-md  flex flex-row justify-start gap-3 items-center"
            {...getRootProps()}
          >
            {acceptedFiles.length === 0 && (
              <p className="bg-lightBlue text-white text-left w-1/2 h-full pt-3 pl-2">
                Choose a file
              </p>
            )}
            <input
              {...getInputProps({
                min: 1,
                max: 1,
                type: "file",
                accept: "image/*",
                size: 100,
              })}
            />
            {acceptedFiles.length > 0 ? (
              <p>{acceptedFiles[0]?.name}</p>
            ) : (
              <p>No file selected</p>
            )}
          </div>
          <div className="flex flex-row space-x-2 mt-4">
            <input type="checkbox" readOnly />
            <label htmlFor="agreement" className="tex-sm text-lightBlue">
              Agree to the terms and conditions
            </label>
          </div>

          <Button
            className="text-white mt-5  border-2 bg-lightPink rounded-md hover:bg-darkPink hover:text-white w-full"
            type="submit"
          >
            {!isSubmitting ? "Sign up" : <Spinner />}
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

export default SignUpPage;
