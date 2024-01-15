"use client";
import React from "react";
import { FaGooglePlus } from "react-icons/fa";
import Button from "./Button";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { saveToStore } from "@/lib/storageFunctions";

const Oauth = () => {
  const router = useRouter();
  const OauthLoging = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      saveToStore();
      router.back();
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  return (
    <Button
      onClick={OauthLoging}
      className="flex flex-row justify-start items-center space-x-3 pr-6 py-1 border border-lightPink rounded-md bg-white text-lightBlue oauth  mx-auto hover:opacity-90"
    >
      <FaGooglePlus />
      <span>Continue with Google</span>
    </Button>
  );
};

export default Oauth;
