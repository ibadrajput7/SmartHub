// 'use client';
// import { CircleUser, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { LogOut } from "lucide-react";
// import { logout } from "@/app/login/actions";
// import { useState } from "react";

// function DashboardHeader({ user }: { user: { email: string } }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <header className="fixed top-0 right-0 flex h-14 w-full z-10 items-end justify-end gap-4 px-4 lg:h-[60px] lg:px-6">
//       <div className="w-full flex-1">
//         {/* Content */}
//       </div>
//       <div className="hidden md:block">
//         <DropdownMenu open={open} onOpenChange={setOpen}>
//           <DropdownMenuTrigger asChild>
//             <Button variant="secondary" size="icon" className="rounded-full">
//               <CircleUser className="h-6 w-6" />
//               <span className="sr-only">Toggle user menu</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem className="hover:bg-gray-200" onClick={() => setOpen(!open)}>
//               <Link href="/settings" className="flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 My Profile
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="h-8 hover:bg-gray-200">
//               <form action={logout}>
//                 <Button
//                   variant="ghost"
//                   type="submit"
//                   className="text-red-600 text-start p-0 hover:bg-forth-background hover:text-red-600"
//                 >
//                   <LogOut className="h-5 w-5 mr-2" />
//                   Log Out
//                 </Button>
//               </form>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

// // export default DashboardHeader;