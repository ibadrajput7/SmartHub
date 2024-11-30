import React from 'react';
import Link from 'next/link';
import ButtonSvg from "../assets/svg/ButtonSvg";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  href, 
  onClick, 
  children, 
  px, 
  white 
}): JSX.Element => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => {
    // Internal links (starting with '/') use Next.js Link
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={classes}>
          <span className={spanClasses}>{children}</span>
          {ButtonSvg(white)}
        </Link>
      );
    }
    
    // External links use regular anchor tag
    return (
      <a href={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </a>
    );
  };

  return href ? renderLink() : renderButton();
};

export default Button;