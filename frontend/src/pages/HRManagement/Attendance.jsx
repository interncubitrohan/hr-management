import { useState } from "react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import AttendanceOverview from "./attendance-components/AttendanceOverview";
import DailyAttendance from "./attendance-components/DailyAttendance";
import MonthlyAttendance from "./attendance-components/MonthlyAttendance";
import EmployeeAttendance from "./attendance-components/EmployeeAttendance";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "daily", label: "Daily View" },
    { id: "monthly", label: "Monthly View" },
    { id: "employee", label: "Employee View" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Attendance Management" />

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-stroke dark:border-strokedark">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium hover:text-primary ${activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "overview" && <AttendanceOverview />}
        {activeTab === "daily" && <DailyAttendance />}
        {activeTab === "monthly" && <MonthlyAttendance />}
        {activeTab === "employee" && <EmployeeAttendance />}
      </div>
    </div>
  );
}
