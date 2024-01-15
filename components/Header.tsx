"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import ButtonGroup from "./ButtonGroup";
import { navItems } from "@/constants/navItems";

const Header = () => {
  const pathname = usePathname();
  const [isToggled, setIsToggled] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  useEffect(() => {
    setIsToggled(false);
  }, [pathname]);

  // window.addEventListener("scroll", () => {
  //   setIsToggled(false);
  // });
  return (
    <header className="pt-1 bg-[#fff] shadow drop-shadow-lg fixed top-0 right-0 left-0 z-20 w-full">
      <div className="max-w-[1200px] mx-auto flex flex-row justify-between items-center ">
        <div className="logo z-12">
          <Link href={"/"} className="w-full">
            <Image
              src={logo}
              height={70}
              width={70}
              alt="wellmaxristus"
              className="w-full"
            />
          </Link>
        </div>
        <nav className="nav">
          <ul className={`nav_list ${isToggled && "active"}`}>
            {navItems.map((item) => (
              <li className="nav_items capitalize" key={item.id}>
                <Link
                  href={item.path}
                  className={
                    pathname === item.path
                      ? "text-lightPink border-b border-lightPink "
                      : "text-lightBlue"
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <ButtonGroup className="md:hidden space-x-6" />
          </ul>
        </nav>

        <ButtonGroup className="hidden md:flex flex-col space-between  items-center md:space-x-6 md:flex-row" />
      </div>
      <Button
        className="open-menu md:hidden fixed top-2 py-1 right-0 z-12 mr-1"
        onClick={toggleMenu}
      >
        {isToggled ? <IoMdClose /> : <CiMenuFries />}
      </Button>
    </header>
  );
};

export default Header;
