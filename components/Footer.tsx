import React from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { navItems } from "@/constants/navItems";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import Button from "./Button";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="pb-4 md:pt-1 bg-blue mt-3 text-[#fff]">
      <div className="container ">
        <div className="flex flex-col-reverse space-y-10 md:space-y-0 gap-4 md:gap-0 md:flex-row justify-between items-center">
          <div className="logo">
            <Image src={logo} width={70} height={70} alt="wellmaxristus" />
          </div>

          <ul className="space-y-2 text-center grid grid-cols-3 justify-center items-center">
            {navItems.map((item) => (
              <li className="nav_items capitalize" key={item.id}>
                <Link href={item.path} className="text-white ">
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="nav_items capitalize">
              <Link href={"/register"} className="text-white ">
                Resgister
              </Link>
            </li>
          </ul>
          <SocialIcons />

          <form>
            <div className="form-group">
              <div className="input_field">
                <input type="email" />
                <FaRegEnvelope />
              </div>
              <Button className="text-sm bg-lightPink text-white rounded-sm w-full mt-3">
                Subscribe for our news letter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
