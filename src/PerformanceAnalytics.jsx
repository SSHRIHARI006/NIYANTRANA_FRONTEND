"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useState, useEffect } from "react"
import Loader from "./components/loader"

export function PerformanceAnalytics() {
  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const chartData = [
    { day: "Mon", service: 18, maintenance: 4, standby: 3 },
    { day: "Tue", service: 20, maintenance: 3, standby: 2 },
    { day: "Wed", service: 19, maintenance: 5, standby: 1 },
    { day: "Thu", service: 21, maintenance: 2, standby: 2 },
    { day: "Fri", service: 22, maintenance: 2, standby: 1 },
    { day: "Sat", service: 17, maintenance: 6, standby: 2 },
    { day: "Sun", service: 16, maintenance: 7, standby: 2 },
  ]

  const performanceStats = {
    averageEfficiency: 94.2,
    onTimePerformance: 97.8,
    passengerSatisfaction: 4.6,
  }
  // ===== END STATIC DATA =====

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <Loader fullscreen message="Loading performance analytics..." />
  }

  return (
    <div
      style={
        {
          "--primary": "221 83% 53%",
          "--secondary": "38 92% 50%",
          "--destructive": "0 72% 50%",
          "--chart-1": "221 83% 53%",
          "--chart-2": "0 72% 50%",
          "--chart-4": "215 20% 45%",
        }
      }
      className="space-y-6 animate-fade-in"
    >
      <div>
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">Performance Analytics</h1>
        <p className="text-muted-foreground">Detailed performance metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="text-card-foreground">Weekly Fleet Performance</CardTitle>
            <CardDescription>Service runs completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Bar dataKey="service" fill="hsl(var(--chart-1))" />
                <Bar dataKey="maintenance" fill="hsl(var(--chart-2))" />
                <Bar dataKey="standby" fill="hsl(var(--chart-4))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="text-card-foreground">Fleet Efficiency Trend</CardTitle>
            <CardDescription>Average efficiency over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Line type="monotone" dataKey="service" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="text-card-foreground">Average Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{performanceStats.averageEfficiency}%</div>
            <p className="text-sm text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="text-card-foreground">On-Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-4">{performanceStats.onTimePerformance}%</div>
            <p className="text-sm text-muted-foreground">Above 95% target</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="text-card-foreground">Passenger Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{performanceStats.passengerSatisfaction}/5</div>
            <p className="text-sm text-muted-foreground">Based on 1,247 reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}