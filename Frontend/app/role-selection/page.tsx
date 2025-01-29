"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ServerIcon as AdminIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RoleSelection() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null)

  const handleContinue = () => {
    if (selectedRole === "admin") {
      router.push("/admin-login")
    } else if (selectedRole === "user") {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E14] via-[#1a1c25] to-[#0B0E14] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#2D1259,transparent)]"></div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl space-y-10"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Welcome to Smart Hub
            </h1>
            <p className="text-lg text-gray-400">
              Please select your role to continue
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {["user", "admin"].map((role) => (
              <motion.div
                key={role}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`cursor-pointer border-2 bg-[#1A1F2B]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-700/20 ${
                    selectedRole === role 
                      ? "border-purple-700 bg-purple-800/10" 
                      : "border-gray-800 hover:border-purple-700/50"
                  }`}
                  onClick={() => setSelectedRole(role as "admin" | "user")}
                >
                  <CardContent className="flex flex-col items-center p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-6 rounded-full bg-purple-800/10 p-5 ring-2 ring-purple-700/20"
                    >
                      {role === "user" ? (
                        <UserIcon className="h-10 w-10 text-purple-700" />
                      ) : (
                        <AdminIcon className="h-10 w-10 text-purple-700" />
                      )}
                    </motion.div>
                    <h2 className="mb-3 text-2xl font-semibold text-white capitalize">
                      {role}
                    </h2>
                    <p className="text-center text-gray-400">
                      {role === "user" 
                        ? "Access your notes, quizzes, and learning materials"
                        : "Manage users, view analytics, and control system settings"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`
                  px-8 py-6 text-lg font-semibold
                  bg-gradient-to-r from-purple-800 to-purple-900
                  hover:from-purple-900 hover:to-purple-950
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 ease-out
                  shadow-lg shadow-purple-700/25 hover:shadow-purple-700/40
                  rounded-xl
                `}
              >
                Continue as {selectedRole || "..."}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}