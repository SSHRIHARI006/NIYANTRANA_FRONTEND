import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Loader from "./components/loader"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

export function AlertsNotifications() {
  const [isLoading, setIsLoading] = useState(true)

  // ===== STATIC DATA - REPLACE WITH BACKEND API CALLS =====
  const alertStats = {
    criticalAlerts: 2,
    warnings: 5,
    info: 12,
  }

  const metroAlerts = [
    {
      type: "Critical",
      message: "HVAC system failure detected on Metro KM-403",
      time: "15 minutes ago",
      train: "KM-403",
      route: "Blue Line",
    },
    {
      type: "Warning",
      message: "High passenger load detected at Ernakulam South",
      time: "1 hour ago",
      train: "KM-205",
      route: "Blue Line",
    },
    {
      type: "Warning",
      message: "Branding SLA deadline approaching for Coca-Cola",
      time: "2 hours ago",
      train: "KM-301",
      route: "Blue Line",
    },
    {
      type: "Info",
      message: "Scheduled maintenance completed successfully",
      time: "3 hours ago",
      train: "KM-107",
      route: "Blue Line",
    },
  ]
  // ===== END STATIC DATA =====

  useEffect(() => {
    const loadData = async () => {
      // TODO: Replace with actual API calls
      // const [stats, alerts] = await Promise.all([
      //   fetchAlertStats(),
      //   fetchRecentAlerts()
      // ])

      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <Loader fullscreen message="Loading alerts and notifications..." />
  }

  return (
    <div
      style={{
        "--primary": "221 83% 53%", // blue (primary)
        "--secondary": "38 92% 50%", // amber (warnings)
        "--destructive": "0 72% 50%", // red (critical)
        "--chart-1": "221 83% 53%", // service/info where needed
        "--chart-2": "0 72% 50%", // maintenance
        "--chart-4": "215 20% 45%", // neutral/info
        "--success": "142 72% 37%",
      }}
      className="space-y-6 animate-fade-in"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Real-time system alerts and notifications</p>
        </div>
        <Button
          variant="outline"
          className="border-[hsl(var(--success))] text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10 bg-transparent"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="border border-border animate-slide-in border-t-4"
          style={{ borderTopColor: "hsl(var(--destructive))" }}
        >
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{alertStats.criticalAlerts}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card
          className="border border-border animate-slide-in border-t-4"
          style={{ borderTopColor: "hsl(var(--secondary))" }}
        >
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{alertStats.warnings}</div>
            <p className="text-sm text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card
          className="border border-border animate-slide-in border-t-4"
          style={{ borderTopColor: "hsl(var(--success))" }}
        >
          <CardHeader>
            <CardTitle className="text-lg text-[hsl(var(--success))]">Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--success))]">{alertStats.info}</div>
            <p className="text-sm text-muted-foreground">General notifications</p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-slide-in">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Alerts</CardTitle>
          <CardDescription>Latest system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metroAlerts.map((alert, index) => {
              const rail =
                alert.type === "Critical"
                  ? "hsl(var(--destructive))"
                  : alert.type === "Warning"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--success))"
              const iconClass =
                alert.type === "Critical"
                  ? "text-destructive"
                  : alert.type === "Warning"
                    ? "text-secondary"
                    : "text-[hsl(var(--success))]"
              const badgeClass =
                alert.type === "Critical"
                  ? ""
                  : alert.type === "Warning"
                    ? ""
                    : "border-[hsl(var(--success))] text-[hsl(var(--success))]"
              const badgeVariant =
                alert.type === "Critical" ? "destructive" : alert.type === "Warning" ? "secondary" : "outline"

              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors border-l-4"
                  style={{ borderLeftColor: rail }}
                >
                  <div className="mt-1">
                    {alert.type === "Critical" ? (
                      <AlertTriangle className={`h-5 w-5 ${iconClass}`} />
                    ) : alert.type === "Warning" ? (
                      <AlertCircle className={`h-5 w-5 ${iconClass}`} />
                    ) : (
                      <CheckCircle className={`h-5 w-5 ${iconClass}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant={badgeVariant} className={badgeClass}>
                        {alert.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="mt-2">
                      <div className="font-semibold text-card-foreground">{alert.message}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Train: {alert.train} • Route: {alert.route}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
