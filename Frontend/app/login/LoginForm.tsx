// LoginForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { login, signup } from './actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitButton } from '@/components/ui/submit-button';
import FailedNotification from '@/components/failed-notification';

export default function LoginForm({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-black/95 p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl border-0 bg-gray-900/95">
        <CardHeader className="mb-10 space-y-2 text-center">
          <h2 className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Welcome
          </h2>
          <p className="text-gray-400">Sign in to continue your journey</p>
        </CardHeader>

        <CardContent>
          <form action={login} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Label
                htmlFor="email"
                className={`absolute left-3 transition-all duration-200 ${
                  focusedInput === 'email'
                    ? '-top-2.5 text-sm text-purple-600'
                    : 'top-3.5 text-gray-400'
                }`}
              >
                Email Address
              </Label>
              <Mail
                size={20}
                className={`absolute right-3 top-3.5 transition-colors ${
                  focusedInput === 'email'
                    ? 'text-purple-200'
                    : 'text-purple-600'
                }`}
              />
              <Input
                type="email"
                name="email"
                className="h-14 rounded-xl border-gray-200 bg-gray-900 px-4 pt-4 transition-all focus:border-purple-600 focus:ring-2 focus:ring-purple-600"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Label
                htmlFor="password"
                className={`absolute left-3 transition-all duration-200 ${
                  focusedInput === 'password'
                    ? '-top-2.5 text-sm text-purple-600'
                    : 'top-3.5 text-gray-400'
                }`}
              >
                Password
              </Label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3.5 transition-colors ${
                  focusedInput === 'password'
                    ? 'text-purple-200'
                    : 'text-purple-600'
                }`}
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="h-14 rounded-xl border-gray-200 bg-gray-900 px-4 pt-4 transition-all focus:border-purple-600 focus:ring-2 focus:ring-purple-600"
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  className="border-gray-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </Label>
              </div>
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Buttons */}
            <div className="space-y-4">
              <SubmitButton
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                formAction={login}
                pendingText="Signing in..."
              >
                <span className="relative flex items-center justify-center text-white">
                  Sign In
                  <svg
                    className="ml-2 h-5 w-5 -rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </SubmitButton>

              <SubmitButton
                variant="outline"
                className="w-full"
                formAction={signup}
                pendingText="Creating account..."
              >
                Create Account
              </SubmitButton>
            </div>
          </form>

          {searchParams?.message && (
            <FailedNotification message={searchParams.message} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}