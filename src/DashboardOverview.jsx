"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import Loader from "./components/loader"
import { Train, Search, Plus, AlertTriangle, TrendingUp, Activity, Wrench, Info } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts"

export function DashboardOverview({ searchTerm, setSearchTerm }) {
  const [isLoading, setIsLoading] = useState(true)

  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const dashboardStats = {
    trainsDeployed: 18,
    maintenanceCycles: 7,
    brandingMissions: 12,
    fleetStatus: {
      standby: 3,
      backlog: 2,
      active: 18,
      sla: 95,
    },
  }

  const chartData = [
    { day: "Mon", service: 18, maintenance: 4, standby: 3 },
    { day: "Tue", service: 20, maintenance: 3, standby: 2 },
    { day: "Wed", service: 19, maintenance: 5, standby: 1 },
    { day: "Thu", service: 21, maintenance: 2, standby: 2 },
    { day: "Fri", service: 22, maintenance: 2, standby: 1 },
    { day: "Sat", service: 17, maintenance: 6, standby: 2 },
    { day: "Sun", service: 16, maintenance: 7, standby: 2 },
  ]

  const pieChartData = [
    { name: "Service", value: 18, fill: "hsl(var(--chart-1))" },
    { name: "Standby", value: 3, fill: "hsl(var(--chart-4))" },
    { name: "Maintenance", value: 4, fill: "hsl(var(--chart-2))" },
  ]

  const rosterData = [
    {
      rank: 1,
      trainId: "KM-301",
      status: "Service",
      jobCardStatus: "Closed",
      certificateStatus: "Valid",
      mileage: 45234,
      route: "Aluva - Pettah",
      branding: "Coca-Cola / 3 hours remaining",
      aiReason: "Optimal for peak hour service on Blue Line.",
      conflict: null,
      efficiency: 98.2,
      lastMaintenance: "2025-09-10",
      nextMaintenance: "2025-09-25",
      passengerLoad: "High",
      aiDecision: {
        finalScore: 85.5,
        breakdown: [
          { objective: "Mileage Score", score: 95, description: "Very low kms", weight: 40, contribution: 38.0 },
          { objective: "Branding SLA Score", score: 70, description: "Approaching", weight: 30, contribution: 21.0 },
          { objective: "Shunting Cost Score", score: 90, description: "Tier 1 Bay", weight: 20, contribution: 18.0 },
          { objective: "Predictive Health Score", score: 85, description: "Low risk", weight: 10, contribution: 8.5 }
        ]
      }
    },
    {
      rank: 2,
      trainId: "KM-205",
      status: "Service",
      jobCardStatus: "Closed",
      certificateStatus: "Valid",
      mileage: 38890,
      route: "Palarivattom - Ernakulam South",
      branding: null,
      aiReason: "High efficiency, balanced mileage distribution.",
      conflict: null,
      efficiency: 97.8,
      lastMaintenance: "2025-09-12",
      nextMaintenance: "2025-09-27",
      passengerLoad: "Medium",
      aiDecision: {
        finalScore: 82.3,
        breakdown: [
          { objective: "Mileage Score", score: 88, description: "Moderate kms", weight: 40, contribution: 35.2 },
          { objective: "Branding SLA Score", score: 95, description: "Excellent", weight: 30, contribution: 28.5 },
          { objective: "Shunting Cost Score", score: 75, description: "Tier 2 Bay", weight: 20, contribution: 15.0 },
          { objective: "Predictive Health Score", score: 92, description: "Very low risk", weight: 10, contribution: 9.2 }
        ]
      }
    },
    {
      rank: 16,
      trainId: "KM-108",
      status: "Standby",
      jobCardStatus: "Open",
      certificateStatus: "Valid",
      mileage: 52500,
      route: "Depot Standby",
      branding: null,
      aiReason: "Pending non-critical brake inspection.",
      conflict: {
        type: "MAINTENANCE_WARNING",
        details: "Job card J-5892 (Brake System Check) is open.",
      },
      efficiency: 89.4,
      lastMaintenance: "2025-08-28",
      nextMaintenance: "2025-09-20",
      passengerLoad: "N/A",
      aiDecision: {
        finalScore: 62.8,
        breakdown: [
          { objective: "Mileage Score", score: 72, description: "High kms", weight: 40, contribution: 28.8 },
          { objective: "Branding SLA Score", score: 85, description: "Good", weight: 30, contribution: 25.5 },
          { objective: "Shunting Cost Score", score: 45, description: "Tier 3 Bay", weight: 20, contribution: 9.0 },
          { objective: "Predictive Health Score", score: 55, description: "Medium risk", weight: 10, contribution: 5.5 }
        ]
      }
    },
    {
      rank: 25,
      trainId: "KM-403",
      status: "Maintenance",
      jobCardStatus: "Open",
      certificateStatus: "Expiring",
      mileage: 48750,
      route: "Maintenance Bay",
      branding: null,
      aiReason: "Critical HVAC system maintenance required.",
      conflict: {
        type: "MAINTENANCE_CRITICAL",
        details: "Safety certificate expires in 2 days.",
      },
      efficiency: 76.2,
      lastMaintenance: "2025-08-15",
      nextMaintenance: "2025-09-18",
      passengerLoad: "N/A",
      aiDecision: {
        finalScore: 38.2,
        breakdown: [
          { objective: "Mileage Score", score: 80, description: "Acceptable kms", weight: 40, contribution: 32.0 },
          { objective: "Branding SLA Score", score: 25, description: "Critical", weight: 30, contribution: 7.5 },
          { objective: "Shunting Cost Score", score: 30, description: "Maintenance Bay", weight: 20, contribution: 6.0 },
          { objective: "Predictive Health Score", score: 15, description: "High risk", weight: 10, contribution: 1.5 }
        ]
      }
    },
  ]
  // ===== END STATIC DATA =====

const filteredRosterData = rosterData.filter(
  (train) =>
    train.trainId.toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    train.route.toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    (train.conflict?.details || "").toLowerCase().includes((searchTerm || "").toLowerCase()),
)

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <Loader fullscreen message="Loading dashboard data..." />
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
      className="space-y-4 lg:space-y-6 animate-fade-in"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border border-border animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Metro Trains Deployed</CardTitle>
            <Train className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-primary">{dashboardStats.trainsDeployed}</div>
            <p className="text-xs text-muted-foreground">Currently in service</p>
          </CardContent>
        </Card>

        <Card className="border border-border animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Maintenance Cycles</CardTitle>
            <Wrench className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-secondary">{dashboardStats.maintenanceCycles}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card className="border border-border animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Branding Missions</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-chart-2">{dashboardStats.brandingMissions}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="border border-border animate-slide-in">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-card-foreground">Fleet Status</CardTitle>
            <Activity className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-card-foreground">
                <span>Standby: {dashboardStats.fleetStatus.standby}</span>
                <span>Backlog: {dashboardStats.fleetStatus.backlog}</span>
              </div>
              <div className="flex justify-between text-sm text-card-foreground">
                <span>Active: {dashboardStats.fleetStatus.active}</span>
                <span>SLA: {dashboardStats.fleetStatus.sla}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <Card className="xl:col-span-2 animate-slide-in">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl text-card-foreground">Daily Fleet Performance</CardTitle>
            <CardDescription>Metro service runs completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
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
            <CardTitle className="text-lg lg:text-xl text-card-foreground">Fleet Status Breakdown</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Roster Table */}
      <Card className="animate-slide-in">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg lg:text-xl text-card-foreground">Today's Operational Roster</CardTitle>
              <CardDescription>Real-time metro train assignments and status</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trains..."
                  className="pl-8 w-full sm:w-64 bg-input border-border text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Manual Intervention</span>
                <span className="sm:hidden">Override</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="service" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 min-w-max bg-muted">
                <TabsTrigger
                  value="service"
                  className="text-xs lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Service Roster
                </TabsTrigger>
                <TabsTrigger
                  value="branding"
                  className="text-xs lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Branding Schedule
                </TabsTrigger>
                <TabsTrigger
                  value="entering"
                  className="text-xs lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Entering Maintenance
                </TabsTrigger>
                <TabsTrigger
                  value="exiting"
                  className="text-xs lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Exiting Maintenance
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="service" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="min-w-[80px] text-muted-foreground">Train ID</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Status</TableHead>
                      <TableHead className="min-w-[120px] hidden sm:table-cell text-muted-foreground">
                        Job Card
                      </TableHead>
                      <TableHead className="min-w-[120px] hidden md:table-cell text-muted-foreground">
                        Certificate
                      </TableHead>
                      <TableHead className="min-w-[100px] hidden lg:table-cell text-muted-foreground">
                        Mileage
                      </TableHead>
                      <TableHead className="min-w-[150px] hidden xl:table-cell text-muted-foreground">
                        Branding
                      </TableHead>
                      <TableHead className="min-w-[200px] text-muted-foreground">AI Reason</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Alerts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRosterData.map((train) => (
                      <TableRow key={train.trainId} className="hover:bg-muted/50 border-border">
                        <TableCell className="font-medium text-card-foreground">{train.trainId}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              train.status === "Service"
                                ? "default"
                                : train.status === "Standby"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {train.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={train.jobCardStatus === "Closed" ? "outline" : "destructive"}>
                            {train.jobCardStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant={train.certificateStatus === "Valid" ? "outline" : "destructive"}>
                            {train.certificateStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-card-foreground">
                          {train.mileage.toLocaleString()} km
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-sm text-card-foreground">
                          {train.branding || "None"}
                        </TableCell>
                        <TableCell className="text-sm max-w-[200px] text-card-foreground">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate">{train.aiReason}</span>
                            <HoverCard openDelay={200} closeDelay={100}>
                              <HoverCardTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground transition-colors" />
                              </HoverCardTrigger>
                              <HoverCardContent className="w-96">
                                <div className="space-y-3">
                                  <div className="border-b pb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Info className="h-4 w-4" />
                                      <h4 className="text-sm font-semibold">Decision Breakdown for Train {train.trainId}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      This train was ranked #{train.rank} for induction. The final score is a weighted sum of its performance across key objectives.
                                    </p>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground border-b pb-1">
                                      <div>Objective</div>
                                      <div className="text-center">Score (out of 100)</div>
                                      <div className="text-center">Weight</div>
                                      <div className="text-center">Contribution</div>
                                    </div>
                                    
                                    {train.aiDecision?.breakdown.map((item, index) => (
                                      <div key={index} className="grid grid-cols-4 gap-2 text-xs py-1">
                                        <div className="flex items-center gap-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <span className="font-medium">{item.objective}</span>
                                        </div>
                                        <div className="text-center">
                                          <span className="font-mono">{item.score}</span>
                                          <span className="text-muted-foreground ml-1">({item.description})</span>
                                        </div>
                                        <div className="text-center font-mono">{item.weight}%</div>
                                        <div className="text-center font-mono">+{item.contribution}</div>
                                      </div>
                                    ))}
                                    
                                    <div className="border-t pt-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold">Final Score:</span>
                                        <span className="text-lg font-bold text-blue-600">{train.aiDecision?.finalScore}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-2 border-t">
                                    <p className="text-xs text-muted-foreground">
                                      [View Raw Data]
                                    </p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </TableCell>
                        <TableCell>
                          {train.conflict && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Alert
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}