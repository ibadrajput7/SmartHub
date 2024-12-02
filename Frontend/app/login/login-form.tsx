// // login-form.tsx
// 'use client'

// import React, { useState } from 'react'
// import { Mail, Eye, EyeOff } from 'lucide-react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { login, signup } from './actions'
// import { useFormState } from 'react-dom'

// interface LoginFormProps {
//   message?: string
// }

// interface ErrorResponse {
//   loc: (string | number)[]
//   msg: string
//   type: string
// }

// const formatError = (error: string | ErrorResponse[] | null | undefined): string => {
//   if (!error) return ''
//   if (typeof error === 'string') return error
//   if (Array.isArray(error)) {
//     return error.map(err => err.msg).join(', ')
//   }
//   return 'An error occurred'
// }

// const LoginForm: React.FC<LoginFormProps> = ({ message }) => {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [focusedInput, setFocusedInput] = useState<string | null>(null)
//   const [loginState, loginAction] = useFormState(login, null)
//   const [signupState, signupAction] = useFormState(signup, null)

//   const errorMessage = formatError(message || loginState || signupState)

//   return (
//     // <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
//     //   <div className="relative w-full max-w-md overflow-hidden rounded-3xl">
//     //     <div className="relative rounded-2xl bg-gray-900 p-8">
//           <div className="relative">
//             <div className="mb-10 text-center">
//               <h2 className="mb-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
//                 Welcome Back
//               </h2>
//               <p className="text-gray-400">Sign in to continue your journey</p>
//             </div>

//             {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

//             <form action={async (formData: FormData) => {
//             await loginAction(formData)
//             }} className="space-y-6">
//               <div className="relative">
//                 <label 
//                   className={`absolute left-3 transition-all duration-200 ${
//                     focusedInput === 'email' ? '-top-2.5 text-sm text-purple-600' : 'top-3.5 text-gray-400'
//                   }`}
//                 >
//                   Email Address
//                 </label>
//                 <Mail 
//                   size={20} 
//                   className={`absolute right-3 top-3.5 transition-colors ${
//                     focusedInput === 'email' ? 'text-purple-200' : 'text-purple-600'
//                   }`}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   className="h-14 w-full rounded-xl border border-gray-200 bg-gray-900 px-4 pt-4 outline-none transition-all focus:border-purple-600 focus:ring-2 focus:ring-black"
//                   onFocus={() => setFocusedInput('email')}
//                   onBlur={() => setFocusedInput(null)}
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <label 
//                   className={`absolute left-3 transition-all duration-200 ${
//                     focusedInput === 'password' ? '-top-2.5 text-sm text-purple-600' : 'top-3.5 text-gray-400'
//                   }`}
//                 >
//                   Password
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className={`absolute right-3 top-3.5 transition-colors ${
//                     focusedInput === 'password' ? 'text-purple-200' : 'text-purple-600'
//                   }`}
//                 >
//                   {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   className="h-14 w-full rounded-xl border border-gray-200 bg-gray-900 px-4 pt-4 outline-none transition-all focus:border-purple-600 focus:ring-2 focus:ring-black"
//                   onFocus={() => setFocusedInput('password')}
//                   onBlur={() => setFocusedInput(null)}
//                   required
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex cursor-pointer items-center">
//                   <div className="relative inline-flex">
//                     <input 
//                       type="checkbox"
//                       name="remember"
//                       className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-purple-600 checked:bg-purple-600"
//                     />
//                     <svg
//                       className="pointer-events-none absolute left-1 top-1 h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polyline points="20 6 9 17 4 12"></polyline>
//                     </svg>
//                   </div>
//                   <span className="ml-2 text-sm text-gray-400">Remember me</span>
//                 </label>
//                 <Link
//                   href="/forgot-password"
//                   className="text-sm text-purple-600 hover:text-purple-700"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
//               >
//                 <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 transition-all group-hover:bg-transparent">
//                   <span className="relative flex items-center justify-center text-white">
//                     Sign In
//                     <svg
//                       className="ml-2 h-5 w-5 -rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//               </button>
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-gray-400">
//                 Don't have an account?{' '}
//                 <Link
//                   href="/register"
//                   className="font-medium text-purple-600 hover:text-purple-700"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </div>
//     //     </div>
//     //   </div>
//     // </div>
//   )
// }

// export default LoginForm