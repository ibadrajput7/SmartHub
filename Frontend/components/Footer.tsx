import React from "react";
import Image from 'next/image';
import Section from "./Section";
import { socials } from "../constants";

interface SocialItem {
  id: string;
  url: string;
  iconUrl: string;
  title: string;
}

const Footer: React.FC = (): JSX.Element => {
  return (
    <Section 
      crosses={true}
      className="!px-0 !py-10 bg-black mt-6"
      id="footer"
      crossesOffset=""
      customPaddings={false}
    >
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col bg-black">
        <p className="caption text-n-4 lg:block text-white">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item: SocialItem) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full transition-colors hover:bg-black"
            >
              <Image 
                src={item.iconUrl} 
                width={16} 
                height={16} 
                alt={item.title}
              />
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;