"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Activity, Settings, Bell, Search, Trash, Edit, X, BarChart } from "lucide-react"
import axios from "axios"
import { ChartPage } from "./chart-page"

interface User {
  id: number
  username: string
  email: string
}

interface ActivityItem {
  id: number
  user_id: number
  activity_type: string
  source_type: string
  details: string
  created_at: string
  status: string
}

// Set the base URL for Axios
axios.defaults.baseURL = "http://127.0.0.1:5000"

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [activitySearchTerm, setActivitySearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [activeView, setActiveView] = useState<"users" | "activities" | "chart">("users")

  useEffect(() => {
    fetchUsers()
    fetchActivities()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users")
      setUsers(response.data.users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchActivities = async () => {
    try {
      const response = await axios.get("/admin/activities")
      setActivities(response.data.activities)
    } catch (error) {
      console.error("Error fetching activities:", error)
    }
  }

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`/admin/users/${userId}`)
      fetchUsers()
      setSelectedUser(null)
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const updateUser = async (userId: number, updatedData: Partial<User>) => {
    try {
      await axios.put(`/admin/users/${userId}`, {
        username: updatedData.username,
        email: updatedData.email,
      })
      fetchUsers()
      setSelectedUser(null)
      setIsEditingUser(false)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const filterActivities = (activity: ActivityItem) => {
    const searchLower = activitySearchTerm.toLowerCase()
    return (
      (typeof activity.details === "string" && activity.details.toLowerCase().includes(searchLower)) ||
      (typeof activity.activity_type === "string" && activity.activity_type.toLowerCase().includes(searchLower)) ||
      (typeof activity.status === "string" && activity.status.toLowerCase().includes(searchLower)) ||
      (typeof activity.user_id === "number" && activity.user_id.toString().includes(searchLower))
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E14] via-[#1a1c25] to-[#0B0E14] relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_100px,#3D1259,transparent)]"></div>
      <div className="absolute inset-0 backdrop-blur-[118px]"></div>

      {/* Main Content */}
      <div className="relative min-h-screen p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="mt-2 text-gray-400">Welcome back, Administrator</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="rounded-full bg-purple-900/40 p-2 text-purple-400 hover:bg-purple-800/50 transition-colors">
                <Bell size={20} />
              </button>
              <button className="rounded-full bg-purple-900/40 p-2 text-purple-400 hover:bg-purple-800/50 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </motion.div>

          {/* View Toggle Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveView("users")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeView === "users"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/50 scale-105"
                  : "bg-purple-900/40 text-purple-400 hover:bg-purple-800/50"
              }`}
            >
              <Users size={20} />
              Users
            </button>
            <button
              onClick={() => setActiveView("activities")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeView === "activities"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/50 scale-105"
                  : "bg-purple-900/40 text-purple-400 hover:bg-purple-800/50"
              }`}
            >
              <Activity size={20} />
              Recent Activities
            </button>
            <button
              onClick={() => setActiveView("chart")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeView === "chart"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/50 scale-105"
                  : "bg-purple-900/40 text-purple-400 hover:bg-purple-800/50"
              }`}
            >
              <BarChart size={20} />
              User Activity Chart
            </button>
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeView === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border-2 border-purple-800/30 bg-[#1A1F2B]/90 p-6 backdrop-blur-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Users</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-800/30 text-left">
                        <th className="pb-3 text-sm font-medium text-gray-400">ID</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Username</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Email</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(
                          (user) =>
                            user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(userSearchTerm.toLowerCase()),
                        )
                        .map((user) => (
                          <tr key={user.id} className="border-b border-purple-800/10">
                            <td className="py-4 text-sm text-gray-400">{user.id}</td>
                            <td className="py-4 text-sm text-white">{user.username}</td>
                            <td className="py-4 text-sm text-gray-400">{user.email}</td>
                            <td className="py-4 flex gap-2">
                              <button
                                className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Users size={16} />
                              </button>
                              <button
                                className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Trash size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeView === "activities" && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border-2 border-purple-800/30 bg-[#1A1F2B]/90 p-6 backdrop-blur-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search activities..."
                      className="rounded-xl border-2 border-purple-700/50 bg-[#1A1F2B]/60 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400"
                      value={activitySearchTerm}
                      onChange={(e) => setActivitySearchTerm(e.target.value)}
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-800/30 text-left">
                        <th className="pb-3 text-sm font-medium text-gray-400">Time</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">User</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Action</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.filter(filterActivities).map((activity, index) => (
                        <tr key={index} className="border-b border-purple-800/10">
                          <td className="py-4 text-sm text-gray-400">{activity.created_at}</td>
                          <td className="py-4 text-sm text-white">{activity.user_id}</td>
                          <td className="py-4 text-sm text-gray-400">{activity.activity_type}</td>
                          <td className="py-4">
                            <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400">
                              {activity.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {activeView === "chart" && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border-2 border-purple-800/30 bg-[#1A1F2B]/90 p-6 backdrop-blur-xl"
              >
                <ChartPage users={users} activities={activities} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#1A1F2B] rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">User Details</h3>
                <button
                  onClick={() => {
                    setSelectedUser(null)
                    setIsEditingUser(false)
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {isEditingUser ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const updatedData = {
                      username: formData.get("username") as string,
                      email: formData.get("email") as string,
                    }
                    updateUser(selectedUser.id, updatedData)
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      defaultValue={selectedUser.username}
                      className="w-full px-3 py-2 bg-[#2A2F3B] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={selectedUser.email}
                      className="w-full px-3 py-2 bg-[#2A2F2B] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingUser(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-gray-300 mb-2">ID: {selectedUser.id}</p>
                  <p className="text-gray-300 mb-2">Username: {selectedUser.username}</p>
                  <p className="text-gray-300 mb-4">Email: {selectedUser.email}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingUser(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(selectedUser.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

