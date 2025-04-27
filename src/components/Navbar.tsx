import React from "react";
import UserButton from "./UserButton";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  return (
    <div className="bg-background sticky top-0 left-0 z-50 border border-b">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-3 sm:gap-y-0">
        <div className="text-primary text-3xl font-bold">
          <Link href="/">Gandhinagar University</Link>
        </div>
        <div className="order-2 ms-auto flex items-center gap-10 sm:order-3">
          <ThemeToggler />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
