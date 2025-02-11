"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ChartTooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
  Cell,
} from "@/components/ui/Chart"

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

interface ChartPageProps {
  users: User[]
  activities: ActivityItem[]
}

const colorPalette = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#82E0AA",
  "#F1948A",
  "#85C1E9",
]

export function ChartPage({ users, activities }: ChartPageProps) {
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar")

  const userActivityData = users.map((user, index) => ({
    name: user.username,
    activities: activities.filter((activity) => activity.user_id === user.id).length,
    color: colorPalette[index % colorPalette.length],
  }))

  const activityTypeData = Object.entries(
    activities.reduce(
      (acc, activity) => {
        acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value], index) => ({ name, value, color: colorPalette[index % colorPalette.length] }))

  const renderChart = (data: any[], dataKey: string) => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey={dataKey}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2}>
              {data.map((entry, index) => (
                <Line key={`line-${index}`} type="monotone" dataKey={dataKey} stroke={entry.color} />
              ))}
            </Line>
          </LineChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={<ChartTooltip />} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="url(#colorGradient)" />
          </AreaChart>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Activity Charts</h2>
        <Select 
  onValueChange={(value) => setChartType(value as "bar" | "line" | "area")} 
  defaultValue={chartType}
>
  <SelectTrigger className="w-[180px] bg-[#1A1F2B]/90 border-2 border-purple-800/30 hover:border-purple-600/50 text-white transition-all duration-200">
    <SelectValue placeholder="Select chart type" />
  </SelectTrigger>
  <SelectContent className="bg-[#1A1F2B]/90 border-2 border-purple-800/30 backdrop-blur-xl">
    <SelectItem 
      value="bar" 
      className="text-white hover:bg-purple-600/20 focus:bg-purple-600/30 focus:text-white transition-colors"
    >
      Bar Chart
    </SelectItem>
    <SelectItem 
      value="line" 
      className="text-white hover:bg-purple-600/20 focus:bg-purple-600/30 focus:text-white transition-colors"
    >
      Line Chart
    </SelectItem>
    <SelectItem 
      value="area" 
      className="text-white hover:bg-purple-600/20 focus:bg-purple-600/30 focus:text-white transition-colors"
    >
      Area Chart
    </SelectItem>
  </SelectContent>
</Select>
      </div>

      <Card className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">User Activity</CardTitle>
          <CardDescription className="text-gray-300">Number of activities per user</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(userActivityData, "activities")}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Activity Types</CardTitle>
          <CardDescription className="text-gray-300">Distribution of activity types</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(activityTypeData, "value")}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

