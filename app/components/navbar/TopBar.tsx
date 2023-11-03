"use client";
import React, { useEffect, useState } from "react";
import GamesIcon from "@/app/components/navbar/GamesIcon";
import Logo from "@/app/components/navbar/Logo";
import SearchBox from "@/app/components/navbar/SearchBox";
import SocialIcons from "@/app/components/navbar/SocialIcons";
import TextItems from "@/app/components/navbar/TextItems";
import Hamburger from "@/app/components/navbar/Hamburger";
import IconButton from "@mui/material/IconButton";

import { getAllMatches } from "@/database/client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GamesSheet from "../GamesSheet";
import MenuIcon from "@mui/icons-material/Menu";

// import { UserButton } from "@clerk/nextjs";
// import {
//   SignInButton,
//   SignOutButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// CHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE    eeeeeeeeeeeeeeeeeeeeeeeeeeeee start

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
        <div className="md:order-2 shrink-0 md:ml-4">
          {/* <GamesIcon onClick={handleDrawerOpen} className="" /> */}
          <Sheet>
            <SheetTrigger asChild>
              <GamesIcon className="" />
            </SheetTrigger>
            <SheetContent className=" w-[350px] h-full p-0 flex flex-col bg-neutral-50  shadow-lg shadow-neutral-500">
              <GamesSheet />
            </SheetContent>
          </Sheet>
        </div>

        {/* --- LOGO --- */}
        <div className="md:flex-shrink-0 md:grow md:order-first shrink-0">
          <Logo className="" />
        </div>

        {/* --- HAMBURGER MENU --- */}
        <div className="md:hidden shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <IconButton
                size="large"
                className="w-12 h-12 "
                sx={{
                  boxShadow: 1,
                  borderRadius: 1,
                }}
              >
                <MenuIcon
                  fontSize="large"
                  sx={{}}
                  className="transition-all dark:text-neutral-300 "
                />
              </IconButton>
              {/* <Hamburger
                onHamburgerClick={handleHamburgerClick}
                navbar={navbar}
                className="invert dark:invert-0 "
              /> */}
            </SheetTrigger>
            <SheetContent className=" w-[350px] h-full p-0 flex flex-col bg-neutral-50  shadow-lg shadow-neutral-500">
            <div
            className={`transition-all flex flex-row justify-between items-center w-full space-x-3
            ${navbar ? "py-4 " : "  "} `}
          >
       
            <SearchBox
              className={`${navbar ? " grow " : "  "}`}
              onSearch={handleSearch}
            />
         
            <SocialIcons className=" shrink-0 " />
       
          </div>

            </SheetContent>
          </Sheet>
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
