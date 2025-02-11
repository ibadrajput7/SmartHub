'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Crown, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitButton } from '@/components/ui/submit-button';
import FailedNotification from '@/components/failed-notification';
import { adminLogin } from './action';

export default function AdminLogin({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E14] via-[#1a1c25] to-[#0B0E14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_100px,#3D1259,transparent)]"></div>
      <div className="absolute inset-0 backdrop-blur-[118px]"></div>

      <motion.div
        className="fixed left-6 top-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Link href="/role-selection" className="group flex items-center gap-2 rounded-xl border-2 border-purple-700/30 bg-purple-900/20 px-4 py-2.5 text-sm text-purple-400 transition-all duration-200 hover:border-purple-600/50 hover:bg-purple-800/30 hover:text-purple-300">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Selection</span>
        </Link>
      </motion.div>

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[380px]"
        >
          <Card className="relative overflow-hidden rounded-2xl border-2 border-purple-800/30 bg-[#1A1F2B]/90 backdrop-blur-xl">
            <CardHeader className="relative space-y-2 text-center pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto mb-3"
              >
                <div className="relative inline-flex">
                  <div className="absolute -inset-2 rounded-full bg-purple-500/20 blur-md"></div>
                  <div className="relative rounded-full bg-purple-900/40 p-3">
                    <Shield className="h-8 w-8 text-purple-400" />
                    <Crown className="absolute -top-1 -right-1 h-4 w-4 text-purple-500" />
                  </div>
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
              <p className="text-sm text-gray-400">Secure administrative access</p>
            </CardHeader>

            <CardContent className="pb-8">
              <form action={adminLogin} className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <Label
                      htmlFor="adminId"
                      className={`absolute left-3 z-10 transition-all duration-200 ${
                        focusedInput === 'adminId'
                          ? '-top-2.5 text-xs text-purple-500'
                          : 'top-3 text-sm text-gray-400'
                      }`}
                    >
                      Admin ID
                    </Label>
                    <Input
                      type="number"
                      name="adminId"
                      id="adminId"
                      className="h-12 rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 pt-3 text-sm text-white"
                      onFocus={() => setFocusedInput('adminId')}
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
                    <div 
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} className="text-purple-500" /> : <EyeOff size={18} className="text-purple-500" />}
                    </div>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="h-12 rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 pt-3 text-sm text-white"
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
                      className="h-4 w-4 rounded border-purple-500 text-purple-600" 
                    />
                    <label htmlFor="remember" className="text-gray-400">
                      Keep me signed in
                    </label>
                  </div>
                </div>

               <div className="space-y-3 pt-2">
               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
               <SubmitButton
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-3 font-semibold text-white text-sm transition-all duration-300 ease-out hover:from-purple-800 hover:via-purple-900 hover:to-purple-950 shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40"
                formAction={adminLogin}
                pendingText="Accessing..."
                >
                Access Admin Portal
                </SubmitButton>
                </motion.div>
                  </div>
              </form>

              {searchParams?.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <FailedNotification message={searchParams.message} />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}