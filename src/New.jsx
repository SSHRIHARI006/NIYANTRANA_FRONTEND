import React, { useState } from 'react';
import AddTrain from './AddTrain';
import TrainListPage from './TrainListPage';
import AssignService from './AssignService';
import StablingGeometry from './StablingGeometry';
import { AlertsNotifications } from './AlertNotifications';
import { DashboardOverview } from './DashboardOverview';
import { MaintenanceLogs } from './MaintenanceLogs';
import { PerformanceAnalytics} from "./PerformanceAnalytics"

function ManualInterventionsPage() {
  return <div className="p-4 text-green-700 text-lg font-semibold">Manual Interventions Content</div>;
}

function FleetStatusPage() {
  return <div className="p-4 text-purple-700 text-lg font-semibold">Fleet Status Content</div>;
}

function SLACompliancePage() {
  return <div className="p-4 text-indigo-700 text-lg font-semibold">SLA Compliance Content</div>;
}

function MaintenanceLogsPage() {
  return <MaintenanceLogs />
}

function SubmitDataPage() {
  return <div className="p-4 text-pink-700 text-lg font-semibold">Submit Data Content</div>;
}

export default function MetroDashboardTabs({ onNavigateToLanding }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setsearch] = useState( " ");
  // Mapping from tab id to component
  const tabComponents = {
    "Add Train": <AddTrain />,
    "Dashboard" : <DashboardOverview />,

    "alerts": <AlertsNotifications />,
    "Train List": <TrainListPage />,
   "maintenance": <MaintenanceLogsPage />,
    "Assign Service" :<AssignService />,
    "Performance Analytics" :<PerformanceAnalytics />,
    "Stabling Geometry": <StablingGeometry />
  };

  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Add Train', label: 'Add Train' },
    { id: 'Train List', label: 'Train List' },
    { id: 'Assign Service', label: 'Assign Service' },
    { id: 'Performance Analytics', label: 'Performance Analytics' },
  { id: 'Stabling Geometry', label: 'Stabling Geometry' },
    { id: 'maintenance', label: 'Maintenance Logs' },
    { id: 'alerts', label: 'Alerts & Notifications' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-blue-50 flex">
      {/* Fixed Sidebar navigation */}
      <nav className="shadow-lg w-64 border-r fixed left-0 top-0 h-full overflow-y-auto z-10 flex flex-col" style={{ backgroundColor: '#F8F8FF' }}>
        <div className="flex-1">
          {/* Logo - Full size touching all borders */}
          <div className="w-full bg-white/50" style={{ height: '200px' }}>
            <img className="w-full h-full object-cover" src="/MetroLogo.png" alt="Logo"/>
          </div>
          
          <div className="px-4 mt-6">
            {navigationItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full text-left mb-2 px-4 py-3 rounded-lg font-semibold transition
                  ${activeTab === tab.id
                    ? 'shadow-md'
                    : ''
                  }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#0E7AE4' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = '#0E7AE4';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#374151'; // text-gray-700
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Back to Landing Button - Now at absolute bottom */}
        {onNavigateToLanding && (
          <div className="pt-4 border-t border-gray-200 mb-4 px-4">
            <button
              onClick={onNavigateToLanding}
              className="block w-full text-center px-4 py-3 rounded-lg font-semibold transition text-gray-700 hover:bg-orange-100 hover:text-orange-700"
              style={{ backgroundColor: '#E6E6FA' }}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </nav>

      {/* Main content container with left margin to account for fixed sidebar */}
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-6">
        {tabComponents[activeTab] || <div>Select a tab</div>}
      </main>
    </div>
  );
}
