// Step 2: Use the Notification Component
// In your pages or other components, import and use the Notification component.

// For example, in a page component:

// import Notification from './Notification';

// export default function PageComponent() {
//   const searchParams = new URLSearchParams(window.location.search);
//   const message = searchParams.get("message") || "Your payment was successful!";

//   return (
//     <div>
//       {searchParams.get("message") && (
//         <Notification message={message} />
//       )}
//       <p className="mt-4 w-auto bg-foreground/10 p-4 text-center text-foreground">
//         {searchParams.get("message")}
//       </p>
//     </div>
//   );
// }


// Notification.js
"use client";

import { useState, useEffect } from "react";

export default function Notification({ message }: { message: any }) {
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
      <div className="bg-green-500 text-white py-3 px-4 flex items-center rounded-lg shadow-lg">
        <CircleCheckIcon className="mr-2 h-6 w-6" />
        <p className="text-base font-medium">{message}</p>
      </div>
    </div>
  );
}

function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}