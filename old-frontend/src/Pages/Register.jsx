import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email.split('@')[0], // Extract username
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // Show success message
        navigate("/Login"); // Redirect to login
      } else {
        console.error("Signup failed:", result); // Log error response
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Network or server error:", error); // Log network errors
      setError("Unable to register. Please try again later.");
    }
  };
  

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl">
        <div className="relative rounded-2xl bg-gray-900 p-8">
          <div className="relative">
            {/* Header */}
            <div className="mb-6 text-center sm:mb-8 md:mb-10">
              <h2 className="mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:mb-3">
                Create Account
              </h2>
              <p className="text-sm text-gray-400 sm:text-base">Join us and start your journey</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Email Input */}
              <div className="relative">
                <label 
                  className={`absolute left-3 transition-all duration-200 ${
                    focusedInput === 'email' || formData.email 
                      ? '-top-2.5 text-xs text-purple-600 sm:text-sm' 
                      : 'top-3 text-gray-400 sm:top-3.5'
                  }`}
                >
                  Email Address
                </label>
                <Mail 
                  size={20} 
                  className={`absolute right-3 top-3 transition-colors sm:top-3.5 ${
                    focusedInput === 'email' ? 'text-purple-200' : 'text-purple-600'
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-900 px-4 pt-3 outline-none transition-all focus:border-purple-600 focus:ring-2 focus:ring-black sm:h-14 sm:pt-4"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label 
                  className={`absolute left-3 transition-all duration-200 ${
                    focusedInput === 'password' || formData.password 
                      ? '-top-2.5 text-xs text-purple-600 sm:text-sm' 
                      : 'top-3 text-gray-400 sm:top-3.5'
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  className={`absolute right-3 top-3 transition-colors sm:top-3.5 ${
                    focusedInput === 'password' ? 'text-purple-200' : 'text-purple-600'
                  }`}
                >
                  {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-900 px-4 pt-3 outline-none transition-all focus:border-purple-600 focus:ring-2 focus:ring-black sm:h-14 sm:pt-4"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <label 
                  className={`absolute left-3 transition-all duration-200 ${
                    focusedInput === 'confirmPassword' || formData.confirmPassword 
                      ? '-top-2.5 text-xs text-purple-600 sm:text-sm' 
                      : 'top-3 text-gray-400 sm:top-3.5'
                  }`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                  className={`absolute right-3 top-3 transition-colors sm:top-3.5 ${
                    focusedInput === 'confirmPassword' ? 'text-purple-200' : 'text-purple-600'
                  }`}
                >
                  {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-900 px-4 pt-3 outline-none transition-all focus:border-purple-600 focus:ring-2 focus:ring-black sm:h-14 sm:pt-4"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="relative inline-flex pt-1">
                  <input 
                    type="checkbox" 
                    required
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-purple-600 checked:bg-purple-600 sm:h-5 sm:w-5" 
                  />
                  <svg
                    className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 sm:left-1 sm:top-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-xs text-gray-400 sm:text-sm">
                  I agree to the{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-600">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-600">Privacy Policy</button>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 sm:mt-3"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2.5 transition-all group-hover:bg-transparent sm:px-6 sm:py-3">
                  <span className="relative flex items-center justify-center text-sm text-white sm:text-base">
                    Create Account
                    <svg
                      className="ml-2 h-4 w-4 -rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1 sm:h-5 sm:w-5"
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
                </div>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center sm:mt-7 md:mt-8">
              <p className="text-xs text-gray-400 sm:text-sm">
                Already have an account?{' '}
                <button
                  onClick={handleLoginClick}
                  className="font-medium text-purple-600 hover:text-purple-600"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;