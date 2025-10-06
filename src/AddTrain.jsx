import { useState, useEffect } from "react"
import Papa from "papaparse"
import Loader from "./components/loader"

const AddTrainWithTypedCsvUpload = () => {
  const [csvFile, setCsvFile] = useState(null)

  const [message, setMessage] = useState("")

  // Define fields to convert types
  const intFields = ["train_id", "mileage_kms_this_month", "branding_days_completed", "branding_days_required"]
  const boolFields = ["is_fit_for_service", "has_branding"]

  const convertTypes = (train) => {
    const converted = { ...train }
    Object.keys(converted).forEach((key) => {
      const val = converted[key]
      if (val === null || val === undefined) return

      if (intFields.includes(key)) {
        const n = Number.parseInt(val, 10)
        converted[key] = isNaN(n) ? null : n
      } else if (boolFields.includes(key)) {
        const normalized = String(val).toLowerCase()
        converted[key] = normalized === "true" || normalized === "1" || normalized === "yes"
      }
    })
    return converted
  }

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0])
    setMessage("")
  }

  const sendTrain = async (train) => {
    try {
      const response = await fetch("http://127.0.0.1:4001/api/addtrain", {
        // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(train),
      })
      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText || "Failed to send train data")
      }
    } catch (error) {
      throw error
    }
  }

  const handleUpload = () => {
    if (!csvFile) {
      setMessage("Please select a CSV file first")
      return
    }

    setMessage("Uploading...")

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const trains = results.data.map(convertTypes)
        let successCount = 0
        for (let i = 0; i < trains.length; i++) {
          const train = trains[i]

          try {
            await sendTrain(train)
            successCount++
          } catch (e) {
            setMessage(`Error uploading train at row ${i + 2}: ${e.message}`)
            break
          }
        }
        if (!message) {
          setMessage(`Successfully uploaded ${successCount} trains`)
        }
      },
      error: (error) => {
        setMessage("Failed to parse CSV file: " + error.message)
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Train via CSV Upload</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full mb-4 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="w-full py-3 rounded-lg font-semibold text-white bg-blue-700 hover:bg-blue-800"
      >
        Upload & Send
      </button>
      {message && <p className="mt-4 font-semibold text-center text-red-600">{message}</p>}
    </div>
  )
}

export default function AddTrain() {
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState({
    train_id: "",
    fit_status: "fit", // 'fit' or 'need_maintenance'
    mileage_kms_this_month: "",
    has_branding: false,
    branding_days_completed: "",
    branding_days_required: "",
    branding_expiry_date: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      // Simulate initial data loading
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <Loader fullscreen message="Loading add train page..." />
  }

  // Helper to ensure only digits for train_id input
  const handleTrainIdChange = (e) => {
    const val = e.target.value
    if (val === "" || /^\d+$/.test(val)) {
      setForm((prev) => ({
        ...prev,
        train_id: val,
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === "train_id") return // Handled separately

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.train_id.trim()) {
      setError("Train ID (integer) is required.")
      return
    }
    if (!form.mileage_kms_this_month.trim()) {
      setError("Mileage this month is required.")
      return
    }
    setError("")

    const payload = {
      train_id: Number.parseInt(form.train_id, 10),
      is_fit_for_service: form.fit_status == "fit",
      mileage_kms_this_month: Number.parseFloat(form.mileage_kms_this_month),
      has_branding: form.has_branding,
      branding_days_completed: form.has_branding ? Number.parseInt(form.branding_days_completed, 10) : 0,
      branding_days_required: form.has_branding ? Number.parseInt(form.branding_days_required, 10) : 0,
      branding_expiry_date: form.has_branding ? form.branding_expiry_date : null,
    }

    fetch("http://127.0.0.1:4001/api/addtrain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }

  return (
    <div>
      <div className="max-w-lg mx-auto mt-1 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Submit Train Info</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Train Code */}
          <div>{/* Placeholder for Train Code */}</div>

          {/* Train ID (integer only) */}
          <div>
            <label htmlFor="train_id" className="block text-gray-700 font-semibold mb-2">
              Train ID (Integer)
            </label>
            <input
              type="text"
              id="train_id"
              name="train_id"
              value={form.train_id}
              onChange={handleTrainIdChange}
              placeholder="Enter train ID"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fit Status as dropdown */}
          <div>
            <label htmlFor="fit_status" className="block text-gray-700 font-semibold mb-2">
              Fit for Service Status
            </label>
            <select
              id="fit_status"
              name="fit_status"
              value={form.fit_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fit">Fit for Service</option>
              <option value="need_maintenance">Need Maintenance</option>
            </select>
          </div>

          {/* Mileage */}
          <div>
            <label htmlFor="mileage_kms_this_month" className="block text-gray-700 font-semibold mb-2">
              Mileage This Month (kms)
            </label>
            <input
              type="number"
              step="0.01"
              id="mileage_kms_this_month"
              name="mileage_kms_this_month"
              value={form.mileage_kms_this_month}
              onChange={handleChange}
              placeholder="e.g., 3700.5"
              className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Has Branding */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="has_branding"
              name="has_branding"
              checked={form.has_branding}
              onChange={handleChange}
              className="accent-blue-600 w-5 h-5"
            />
            <label htmlFor="has_branding" className="font-semibold text-gray-700">
              Has Branding
            </label>
          </div>

          {/* Branding fields */}
          {form.has_branding && (
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="branding_days_completed" className="block text-gray-700 font-semibold mb-2">
                  Branding Days Completed
                </label>
                <input
                  type="number"
                  min="0"
                  id="branding_days_completed"
                  name="branding_days_completed"
                  value={form.branding_days_completed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="branding_days_required" className="block text-gray-700 font-semibold mb-2">
                  Branding Days Required
                </label>
                <input
                  type="number"
                  min="0"
                  id="branding_days_required"
                  name="branding_days_required"
                  value={form.branding_days_required}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="branding_expiry_date" className="block text-gray-700 font-semibold mb-2">
                  Branding Expiry Date
                </label>
                <input
                  type="date"
                  id="branding_expiry_date"
                  name="branding_expiry_date"
                  value={form.branding_expiry_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-600 text-sm mt-2 font-semibold">{error}</p>}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white py-3 font-semibold rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
      <AddTrainWithTypedCsvUpload />
    </div>
  )
}
