'use client';

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StaticImageData } from 'next/image';

import SH from '../assets/SH.png';
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";

interface NavigationItem {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}

const Header: React.FC = (): JSX.Element => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);

  const toggleNavigation = (): void => {
    if (openNavigation) {
      setOpenNavigation(false);
      document.body.style.overflow = 'unset';
    } else {
      setOpenNavigation(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClick = (): void => {
    if (!openNavigation) return;
    document.body.style.overflow = 'unset';
    setOpenNavigation(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link href="/" className="block w-[12rem] xl:mr-8">
          <Image 
            src={SH as StaticImageData} 
            width={190} 
            height={40} 
            alt="Brainwave" 
            priority
          />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item: NavigationItem) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <Button className="hidden lg:flex" href="/login">
          Limited
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </header>
  );
};

export default Header;