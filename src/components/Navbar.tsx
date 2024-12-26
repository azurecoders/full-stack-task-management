"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Menu } from "lucide-react";

const Navbar = () => {
  const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false);

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-3 py-5 flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="text-lg md:text-3xl font-bold text-white">
              Task Management
            </h1>
          </Link>
        </div>
        <ul className="hidden md:flex items-center space-x-4 ">
          <li className="text-white font-normal text-lg cursor-pointer hover:text-gray-200 duration-300 transition-all">
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link href="/sign-up">
              <button className="bg-white text-black font-normal text-lg px-5 py-1 rounded hover:bg-gray-200 duration-300 transition-all">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
        <div className="flex md:hidden">
          <div>
            <Menu
              onClick={() => setResponsiveMenu(true)}
              size={30}
              className="text-white font-bold cursor-pointer"
            />
          </div>
        </div>
      </nav>
      <Sheet open={responsiveMenu} onOpenChange={setResponsiveMenu}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="sm:text-lg md:text-3xl font-bold">
              🔥 Task Management
            </SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-4 my-5">
            <li className="font-bold text-lg">
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
