"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Using usePathname
import {
  FcHome,
  FcSportsMode,
  FcManager,
  FcClock,
  FcNews,
  FcMenu,
} from "react-icons/fc";

const menuItems = [
  {
    label: "Home",
    href: "/",
    icon: <FcHome className="text-xl" />,
  },
  {
    label: "Live Matches",
    href: "/live",
    icon: <FcManager className="text-xl" />,
  },
  {
    label: "Upcoming Matches",
    href: "/fixtures",
    icon: <FcClock className="text-xl" />,
  },
  {
    label: "Football News",
    href: "/news",
    icon: <FcNews className="text-xl" />,
  },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="sticky top-0 z-10 bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6">
        <Link
          href="/"
          className="flex items-center text-3xl md:mx-auto font-bold text-blue-600"
        >
          <FcSportsMode className="text-3xl mr-2" />
          SF
        </Link>

        <button
          onClick={toggleMenu}
          className="sm:hidden text-3xl text-blue-600"
        >
          <FcMenu />
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:hidden absolute top-16 left-0 w-full bg-white shadow-md`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <Button
                variant={isActive(item.href) ? "filled" : "outlined"}
                color="blue"
                className="flex items-center gap-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-row gap-6 sm:mt-0 sm:justify-center py-4">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <Button
              variant={isActive(item.href) ? "filled" : "outline"}
              color="blue"
              className="flex items-center gap-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
