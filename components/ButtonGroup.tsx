"use client";
import Link from "next/link";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { removeFromStore, isLogin } from "@/lib/storageFunctions";

type ButtonGroupProps = {
  children?: ReactNode;
  className?: string;
};
const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  const [user, loading] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOutUser = () => {
    removeFromStore();
    signOut(auth);
  };

  useEffect(() => {
    const checkLogin = isLogin();
    if (checkLogin) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className={className}>
      {children}

      {!user! && !isLoggedIn ? (
        <Fragment>
          <Button className=" text-white bg-blue rounded-md hover:bg-lightBlue">
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
          <Button className="text-lightPink border-2 bg-white rounded-md hover:bg-lightPink hover:text-white">
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </Fragment>
      ) : (
        <>
          <Button className="text-lightPink border-2 bg-white rounded-md hover:bg-lightPink hover:text-white">
            <Link href={"/profile"}>profile</Link>
          </Button>
          <Button
            onClick={() => signOutUser()}
            className="text-lightPink border-2 bg-white rounded-md hover:bg-lightPink hover:text-white"
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default ButtonGroup;
