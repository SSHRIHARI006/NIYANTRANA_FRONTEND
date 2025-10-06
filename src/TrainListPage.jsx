import { useState, useEffect } from "react"
import Loader from "./components/loader"

// Map status to badge color
const statusStyles = {
  UNASSIGNED: "bg-gray-300 text-gray-800",
  STANDBY: "bg-yellow-300 text-yellow-900",
  SERVICE: "bg-green-300 text-green-900",
  MAINTENANCE: "bg-red-300 text-red-900",
}

export default function TrainListPage() {
  const [trainData, setTrainData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4001/api/get_trains", { method: "GET" })
        const data = await response.json()
        setTrainData(data)
      } catch (err) {
        // optional: handle errors, but do not modify backend behavior
        console.error("Error loading trains:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  const unassignAll = () => {
    const updatedData = trainData.map((train) => ({
      ...train,
      status: "UNASSIGNED",
    }))
    setTrainData(updatedData)
    fetch("http://127.0.0.1:4001/api/resetstatus")
  }

  if (isLoading) {
    return <Loader fullscreen message="Loading trains..." />
  }

  return (
    <div className="p-8 max-w-full overflow-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">Train List</h1>
        <button
          onClick={unassignAll}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
        >
          Unassign All
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Train ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Mileage (KM This Month)
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Has Branding
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Branding Days Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Branding Days Required
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Branding Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trainData.map((train, idx) => (
              <tr key={train.train_id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.train_id}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700`}>
                  {train.is_fit_for_service ? "OK" : "Maintenance"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.mileage_kms_this_month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {train.has_branding ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.branding_days_completed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.branding_days_required}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {train.branding_expiry_date || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-center ${statusStyles[train.status] || statusStyles["UNASSIGNED"]}`}
                  >
                    {train.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
