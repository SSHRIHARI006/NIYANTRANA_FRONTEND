import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, RefreshCw, Upload } from "lucide-react"

export function A() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [trainFormData, setTrainFormData] = useState({
    is_fit_for_service: false,
    has_branding: false,
  })
  const trainFormRef = useRef(null)

  useEffect(() => {
    if (submitMessage || submitError) {
      const timer = setTimeout(() => {
        setSubmitMessage("")
        setSubmitError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitMessage, submitError])

  const resetTrainForm = () => {
    if (trainFormRef.current) {
      trainFormRef.current.reset()
    }
    setTrainFormData({
      is_fit_for_service: false,
      has_branding: false,
    })
  }

  const handleTrainDataSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitMessage("")

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        train_id: formData.get('train_id'),
        model: formData.get('model'),
        mileage_kms_this_month: formData.get('mileage_kms_this_month'),
        is_fit_for_service: trainFormData.is_fit_for_service,
        has_branding: trainFormData.has_branding,
        branding_days_completed: formData.get('branding_days_completed'),
        branding_days_required: formData.get('branding_days_required'),
        branding_expiry_date: formData.get('branding_expiry_date'),
      }

      const response = await fetch('/api/trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const result = await response.json()
      if (result.message) {
        setSubmitMessage(result.message)
        resetTrainForm()
      } else {
        setSubmitError('Unexpected response format')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? `Error: ${error.message}` : 'Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-serif">Submit Data</h2>
          <p className="text-muted-foreground mt-1">Submit train data and maintenance information</p>
        </div>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <div className="p-8">
          {submitMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <p className="text-sm font-medium">{submitMessage}</p>
              </div>
            </div>
          )}
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm font-medium">{submitError}</p>
              </div>
            </div>
          )}

          <form
            ref={trainFormRef}
            className="space-y-8"
            onSubmit={handleTrainDataSubmit}
          >
            <div className="space-y-6">
              <div className="border-b border-border/40 pb-3">
                <h3 className="text-lg font-semibold text-foreground font-serif">Basic Information</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Essential train identification and model details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="train_id" className="text-sm font-medium text-foreground">
                    Train ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="train_id"
                    name="train_id"
                    type="number"
                    placeholder="Enter train ID"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="model" className="text-sm font-medium text-foreground">
                    Model <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="model"
                    name="model"
                    type="text"
                    placeholder="Enter train model"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-border/40 pb-3">
                <h3 className="text-lg font-semibold text-foreground font-serif">Operational Status</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current operational state and service readiness
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="mileage_kms_this_month" className="text-sm font-medium text-foreground">
                    Mileage (KMs This Month) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="mileage_kms_this_month"
                    name="mileage_kms_this_month"
                    type="number"
                    step="0.01"
                    placeholder="Enter mileage in kilometers"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 border border-border/30">
                <h4 className="text-sm font-medium text-foreground mb-4">
                  Service Readiness <span className="text-destructive">*</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-background rounded-md border border-border/60 shadow-sm">
                    <div className="space-y-1">
                      <Label
                        htmlFor="is_fit_for_service"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Fit for Service
                      </Label>
                      <p className="text-xs text-muted-foreground/80">Train is operational and safe</p>
                    </div>
                    <Switch
                      id="is_fit_for_service"
                      name="is_fit_for_service"
                      checked={trainFormData.is_fit_for_service}
                      onCheckedChange={(checked) => 
                        setTrainFormData(prev => ({ ...prev, is_fit_for_service: checked }))
                      }
                      className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-md border border-border/60 shadow-sm">
                    <div className="space-y-1">
                      <Label
                        htmlFor="has_branding"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Has Branding
                      </Label>
                      <p className="text-xs text-muted-foreground/80">Train has current branding applied</p>
                    </div>
                    <Switch
                      id="has_branding"
                      name="has_branding"
                      checked={trainFormData.has_branding}
                      onCheckedChange={(checked) => 
                        setTrainFormData(prev => ({ ...prev, has_branding: checked }))
                      }
                      className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-border/40 pb-3">
                <h3 className="text-lg font-semibold text-foreground font-serif">Branding Information</h3>
                <p className="text-sm text-muted-foreground mt-1">Branding schedule and expiry details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="branding_days_completed" className="text-sm font-medium text-foreground">
                    Days Completed <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="branding_days_completed"
                    name="branding_days_completed"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="branding_days_required" className="text-sm font-medium text-foreground">
                    Days Required <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="branding_days_required"
                    name="branding_days_required"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="branding_expiry_date" className="text-sm font-medium text-foreground">
                    Expiry Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="branding_expiry_date"
                    name="branding_expiry_date"
                    type="date"
                    className="h-11 border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                className="h-11 px-6 border-border/60 hover:bg-muted/50 bg-transparent"
                onClick={resetTrainForm}
              >
                Reset Form
              </Button>
              <Button 
                type="submit" 
                className="h-11 px-6 bg-primary hover:bg-primary/90 shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Data
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
