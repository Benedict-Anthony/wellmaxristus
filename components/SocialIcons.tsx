import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const SocialIcons = () => {
  return (
    <div className="flex justify-between items-center text-xl gap-4">
      <a href="mailto:wellmaxristusschool@gmail.com">
        <MdAlternateEmail />
      </a>

      <a
        href="https://instagram.com/wellmaxristusschools?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
        target="_blank"
      >
        <FaInstagram />
      </a>
      <a href="tel:08156681319">
        <FaPhone />
      </a>
      <a
        href=" https://chat.whatsapp.com/JeeHWJB6gmf2zNlVi2e65j"
        target="_blank"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default SocialIcons;
