import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from '../services/adminService'
export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("today");
  const [stats, setStats] = useState({})

  useEffect(() => { 
      async function fetchData() { 
          try { 
              const res = await getDashboard(); 
              setStats(res.data || {}); 
          } catch (err) { 
              console.error("Error fetching dashboard:", err); 
          } 
      } 
      fetchData(); 
  }, []); 

  const data = stats[view] || {
      tutors: 0, 
      students: 0, 
      sessions: 0, 
      amount: 0, 
  };

  const formattedRevenue =
    `₹${Number(data.amount || 0).toLocaleString("en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;

  return (
    <div className="p-6 space-y-8">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📊 Dashboard</h2>

        {/* Toggle */}
        <div className="flex bg-gray-200 rounded-full overflow-hidden">
          {["today", "weekly", "monthly", "yearly"].map((option) => (
            <button
              key={option}
              onClick={() => setView(option)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                view === option
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Tutors" value={data.tutors} color="bg-indigo-500" />
        <Card title="Students" value={data.students} color="bg-green-500" />
        <Card title="Sessions" value={data.sessions} color="bg-purple-500" />
        <Card title="Revenue" value={formattedRevenue} color="bg-yellow-500" />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📈 Sessions & Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Replace with LineChart later */}
            Line Chart Placeholder
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">🟢 Active vs Inactive</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Replace with DonutChart later */}
            Donut Chart Placeholder
          </div>
        </div>
      </div>

      {/* Row 3: Upcoming Sessions + Top Tutors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📅 Upcoming Sessions</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Math - 3 PM with John Doe</li>
            <li>Science - 5 PM with Jane Smith</li>
            <li>English - 7 PM with Alex Brown</li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">⭐ Top Tutors</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>John Doe - 120 sessions</li>
            <li>Jane Smith - 98 sessions</li>
            <li>Alex Brown - 75 sessions</li>
          </ul>
        </div>
      </div>

      {/* Row 4: Alerts & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">⚠️ Alerts</h3>
          <ul className="space-y-2 text-sm text-red-600">
            <li>Pending tutor verification: 3</li>
            <li>Unpaid invoices: 5</li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/tutors")} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              + Add Tutor
            </button>
            <button onClick={() => navigate("/student")} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
              + Add Student
            </button>
            <button onClick={() => navigate("/tutors")} className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
              + New Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card
function Card({ title, value, color }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold text-lg mb-3`}
      >
        {title[0]}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
