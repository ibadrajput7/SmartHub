/**
 * v0 by Vercel.
 * @see https://v0.dev/t/R0ycYHfbv2E
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react";

export default function FailedNotification({ message }: { message: any }) {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-in-out ${
        showNotification ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{ transitionProperty: "transform, opacity" }}
    >
      <div className="bg-red-500 text-white py-3 px-4 flex items-center rounded-lg shadow-lg">
        <TriangleAlertIcon className="mr-2 h-6 w-6" />
        <p className="text-base font-medium">{message}</p>
      </div>
    </div>
  )
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}