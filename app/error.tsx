"use client";
import Button from "@/components/Button";
import React from "react";

type ErroHandlerProps = {
  error: string;
  reset: () => void;
};

const ErroHandler = ({ error, reset }: ErroHandlerProps) => {
  return (
    <div
      role="alert"
      className="alert alert-error container flex flex-col h-80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Error! {error}</span>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default ErroHandler;
