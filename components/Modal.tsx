"use client";
import React from "react";
import Button from "./Button";

const Modal = () => {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  return (
    <section className="container h-80 flex justify-center items-center flex-col">
      <div className="modal-box w-full">
        <h3 className="font-bold text-lg text-lightBlue mb-4">Hello!</h3>
        <p className="py-">
          Thanks for registering at WellMax-Ristus School. Please click on the
          link below to join the official WhatsApp group
        </p>
        <div className="flex justify-end items-end">
          <Button className="bg-lightBlue text-white mt-4 hover:text-dark">
            <a href={whatsappUrl} target="_blank">
              JOIN
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
