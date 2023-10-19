"use client";
import React, { useState } from "react";
import GamesIcon from "@/components/navbar/GamesIcon";
import Logo from "@/components/navbar/Logo";
import SearchBox from "@/components/navbar/SearchBox";
import SocialIcons from "@/components/navbar/SocialIcons";
import TextItems from "@/components/navbar/TextItems";
import Hamburger from "@/components/navbar/Hamburger";
import { ThemeSwitcher } from "@/components/navbar/ThemeSwitcher";

// import { UserButton } from "@clerk/nextjs";
// import {
//   SignInButton,
//   SignOutButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

type Props = {};

const TopBar = (props: Props) => {
  const [navbar, setNavbar] = useState(false);
  const handleSearch = (query: string) => {};
  const handleHamburgerClick = () => {
    setNavbar(!navbar);
  };

  return (
    <>
      <div
        className="
        flex justify-between items-center md:flex-row px-4
        mx-auto max-w-5xl w-full md:flex-nowrap flex-wrap mt-2
        "
      >
        {/* --- GAMES ICON --- */}
        <div className="md:order-2 shrink-0">
          <GamesIcon className="" />
        </div>

        {/* --- LOGO --- */}
        <div className="md:flex-shrink-0 md:grow md:order-first shrink-0">
          <Logo className="" />
        </div>

        {/* --- HAMBURGER MENU --- */}
        <div className="md:hidden shrink-0">
          <Hamburger
            onHamburgerClick={handleHamburgerClick}
            navbar={navbar}
            className="invert dark:invert-0 "
          />
        </div>

        <div
          className={`
          transition-all md:flex md:flex-row justify-between md:items-center  w-full md:w-auto flex-nowrap 
            ${
              navbar ? "flex flex-col justify-between items-center" : "hidden "
            }`}
        >
          <div
            className={`transition-all flex flex-row justify-between items-center w-full space-x-3
            ${navbar ? "py-4 " : "  "} `}
          >
            {/* SEARCHBOX */}
            <SearchBox
              className={`${navbar ? " grow " : "  "}`}
              onSearch={handleSearch}
            />
            {/* SOCIALS */}
            <SocialIcons className=" shrink-0 " />
            {/* THEMETOGGLE */}

            {/* <SignedOut>
              <SignInButton mode="modal">
                <Button variant="usericon" size="rounded" className="shrink-0 group">
                  <User className="group-hover:invert transition p-[1px]" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn> */}
            {/* USERBUTTON */}
            {/* <div className="ml-2 shrink-0">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn> */}
          </div>

          {/* TEXT MENU */}
          <TextItems
            classNameDiv={`${
              navbar
                ? "hidden "
                : "order-last md:order-first md:flex md:flex-row md:flex-nowrap font-semibold "
            }`}
            classNameUL={""}
            classNameLI={""}
          />
        </div>
      </div>
    </>
  );
};

export default TopBar;
