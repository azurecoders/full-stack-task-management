"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false);

  return (
    <header className="bg-black">
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
            <Link href="/sign-in">
              <Button className="border hover:bg-white hover:text-black">
                Sign In
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/sign-up">
              <Button className="bg-white text-black  hover:bg-gray-200 duration-300 transition-all">
                Sign Up
              </Button>
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
