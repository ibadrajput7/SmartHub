'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { login, signup } from './actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitButton } from '@/components/ui/submit-button';
import FailedNotification from '@/components/failed-notification';
import { useAuthProtection } from '@/hooks/useAuthProtection';
export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const { isLoading } = useAuthProtection(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E14] via-[#1a1c25] to-[#0B0E14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_100px,#2D1259,transparent)]"></div>
      <div className="absolute inset-0 backdrop-blur-[118px]"></div>

      {/* Back Button - Outside Card */}
      <motion.div
        className="fixed left-6 top-5 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/role-selection">
            <div className="group flex items-center gap-2 rounded-xl border-2 border-purple-700/30 bg-purple-900/20 px-4 py-2.5 text-sm text-purple-400 transition-all duration-200 hover:border-purple-600/50 hover:bg-purple-800/30 hover:text-purple-300 backdrop-blur-sm">
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>Back to Selection</span>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-[380px]"
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Card className="relative overflow-hidden rounded-2xl border-2 border-purple-700/20 bg-[#1A1F2B]/90 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50"></div>
              
              <CardHeader className="relative mb-6 space-y-2 text-center pt-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-3 rounded-full bg-purple-800/20 p-2.5 w-fit"
                >
                  <ShieldCheck className="h-6 w-6 text-purple-500" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white tracking-tight"
                >
                  Welcome 
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-400"
                >
                  Sign in to continue your journey
                </motion.p>
              </CardHeader>

              <CardContent className="relative pb-6">
                <form action={login} className="space-y-4">
                  <div className="space-y-3">
                    <div className="relative">
                      <Label
                        htmlFor="email"
                        className={`absolute left-3 z-10 transition-all duration-200 ${
                          focusedInput === 'email'
                            ? '-top-2.5 text-xs text-purple-500'
                            : 'top-3 text-sm text-gray-400'
                        }`}
                      >
                        Email
                      </Label>
                      <Mail
                        size={18}
                        className={`absolute right-3 top-3 transition-colors duration-200 ${
                          focusedInput === 'email' ? 'text-purple-500' : 'text-purple-700'
                        }`}
                      />
                      <Input
                        type="email"
                        name="email"
                        className="h-12 rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 pt-3 text-sm text-white transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 hover:border-purple-600"
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        required
                      />
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="password"
                        className={`absolute left-3 z-10 transition-all duration-200 ${
                          focusedInput === 'password'
                            ? '-top-2.5 text-xs text-purple-500'
                            : 'top-3 text-sm text-gray-400'
                        }`}
                      >
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-3 z-10 transition-colors duration-200 ${
                          focusedInput === 'password' ? 'text-purple-500' : 'text-purple-700'
                        }`}
                      >
                        {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="h-12 rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 pt-3 text-sm text-white transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 hover:border-purple-600"
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        name="remember" 
                        className="h-4 w-4 border-2 border-purple-700/50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600" 
                      />
                      <Label htmlFor="remember" className="text-gray-400 hover:text-gray-300 cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Link href="#" className="text-purple-500 hover:text-purple-400 transition-colors duration-200">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="space-y-3 pt-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <SubmitButton
                        className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-3 font-semibold text-white text-sm transition-all duration-300 ease-out hover:from-purple-800 hover:via-purple-900 hover:to-purple-950 shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40"
                        formAction={login}
                        pendingText="Signing in..."
                      >
                        Sign In
                      </SubmitButton>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <SubmitButton
                        variant="outline"
                        className="relative w-full overflow-hidden rounded-xl bg-transparent p-3 font-semibold text-white text-sm border-2 border-purple-700/50 hover:bg-purple-900/20 transition-all duration-300 ease-out"
                        formAction={signup}
                        pendingText="Creating account..."
                      >
                        Create Account
                      </SubmitButton>
                    </motion.div>
                  </div>
                </form>

                {searchParams?.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FailedNotification message={searchParams.message} />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}