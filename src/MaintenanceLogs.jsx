"use client"

import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { FileText, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import Loader from "./components/loader"

export function MaintenanceLogs() {
  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const maintenanceActivities = [
    { train: "KM-001", type: "Scheduled", date: "2024-01-15", status: "Completed" },
    { train: "KM-003", type: "Emergency", date: "2024-01-14", status: "In Progress" },
    { train: "KM-005", type: "Preventive", date: "2024-01-13", status: "Scheduled" },
  ]
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
    return <Loader fullscreen message="Loading maintenance logs..." />
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
          "--success": "142 72% 37%",
        }
      }
      className="space-y-6 animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">Maintenance Logs</h1>
          <p className="text-muted-foreground mt-1">Track maintenance activities and schedules</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 border border-border animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Maintenance Activities</h3>
            <Button
              variant="outline"
              size="sm"
              className="border-[hsl(var(--success))] text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10 bg-transparent"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          <div className="space-y-4">
            {maintenanceActivities.map((log, index) => {
              const isEmergency = log.type === "Emergency"
              const isPreventive = log.type === "Preventive"
              const chipBg = isEmergency
                ? "hsl(var(--destructive) / 0.10)"
                : isPreventive
                  ? "hsl(var(--success) / 0.10)"
                  : "hsl(var(--chart-4) / 0.10)"
              const chipIcon = isEmergency
                ? "text-destructive"
                : isPreventive
                  ? "text-[hsl(var(--success))]"
                  : "text-chart-4"

              const badgeVariant =
                log.status === "Completed" ? "outline" : log.status === "In Progress" ? "secondary" : "outline"
              const badgeClass =
                log.status === "Completed"
                  ? "border-[hsl(var(--success))] text-[hsl(var(--success))]"
                  : log.status === "In Progress"
                    ? ""
                    : "border-[hsl(var(--chart-4))] text-chart-4"

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: chipBg }}
                    >
                      <Wrench className={`h-4 w-4 ${chipIcon}`} />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{log.train}</p>
                      <p className="text-sm text-muted-foreground">{log.type} Maintenance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-card-foreground">{log.date}</p>
                    <Badge variant={badgeVariant} className={badgeClass}>
                      {log.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}