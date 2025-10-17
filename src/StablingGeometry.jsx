import React, { useEffect, useState } from 'react'
import Loader from './components/loader'

export default function StablingGeometry() {
  const [slotMap, setSlotMap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  // fetchSlots defined so it can be called on demand (Refresh button)
  const fetchSlots = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://niyantrana-backend-ss4o.onrender.com/api/get_stabling_geometry')
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch stabling geometry')
      }
      setSlotMap(data)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  if (loading) return <Loader fullscreen={false} message="Loading stabling geometry..." />
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!slotMap || Object.keys(slotMap).length === 0) return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Stabling Geometry</h1>
        <div>
          <button
            onClick={fetchSlots}
            disabled={loading}
            className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
      </div>
      <div>No stabling geometry available.</div>
    </div>
  )

  // slotMap is expected to be { slot: train_id }
  const entries = Object.entries(slotMap)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Stabling Geometry</h1>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <div className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleString()}</div>
          )}
          <button
            onClick={fetchSlots}
            disabled={loading}
            className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([slot, train]) => (
          <div key={slot} className="p-4 bg-white rounded-lg shadow transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:ring-6 hover:ring-blue-300/70">
            <div className="text-sm text-gray-500">Slot</div>
            <div className="text-lg font-semibold">{slot}</div>
            <div className="mt-2 text-sm text-gray-600">Assigned Train</div>
            <div className="text-xl font-bold">{train === null ? '-' : train}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
