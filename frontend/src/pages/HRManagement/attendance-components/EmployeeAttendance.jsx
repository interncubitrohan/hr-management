import { useState } from "react";
import Select from "../../../components/form/Select";
import { getEmployeeAttendance, employees } from "./mockAttendanceData";
import Badge from "../../../components/ui/badge/Badge";

export default function EmployeeAttendance() {
    const [selectedEmp, setSelectedEmp] = useState(employees[0].id.toString());
    const [selectedMonth, setSelectedMonth] = useState("2024-01");

    const empOptions = employees.map(e => ({ value: e.id.toString(), label: e.name }));
    const monthOptions = [
        { value: "2024-01", label: "January 2024" },
        { value: "2024-02", label: "February 2024" },
    ];

    const records = getEmployeeAttendance(selectedEmp, selectedMonth);

    const stats = {
        present: records.filter(r => r.status === 'Present' || r.status === 'Late').length,
        absent: records.filter(r => r.status === 'Absent').length,
        leaves: records.filter(r => r.status === 'Leave').length,
        late: records.filter(r => r.status === 'Late').length,
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Present": return "success";
            case "Absent": return "error";
            case "Late": return "warning";
            case "Half Day": return "info";
            default: return "light";
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="w-full sm:w-1/3">
                        <Select options={empOptions} value={selectedEmp} onChange={setSelectedEmp} placeholder="Select Employee" className="bg-white dark:bg-boxdark" />
                    </div>
                    <div className="w-full sm:w-1/3">
                        <Select options={monthOptions} value={selectedMonth} onChange={setSelectedMonth} placeholder="Select Month" className="bg-white dark:bg-boxdark" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded bg-gray-50 dark:bg-meta-4 text-center">
                        <h4 className="text-2xl font-bold text-black dark:text-white">{stats.present}</h4>
                        <p className="text-sm text-gray-500">Days Present</p>
                    </div>
                    <div className="p-4 rounded bg-gray-50 dark:bg-meta-4 text-center">
                        <h4 className="text-2xl font-bold text-red-500">{stats.absent}</h4>
                        <p className="text-sm text-gray-500">Days Absent</p>
                    </div>
                    <div className="p-4 rounded bg-gray-50 dark:bg-meta-4 text-center">
                        <h4 className="text-2xl font-bold text-yellow-500">{stats.leaves}</h4>
                        <p className="text-sm text-gray-500">Leaves Taken</p>
                    </div>
                    <div className="p-4 rounded bg-gray-50 dark:bg-meta-4 text-center">
                        <h4 className="text-2xl font-bold text-orange-500">{stats.late}</h4>
                        <p className="text-sm text-gray-500">Late Arrivals</p>
                    </div>
                </div>

                {/* Calendar Grid View */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                    {records.map(r => (
                        <div key={r.date} className="border border-stroke dark:border-strokedark p-2 rounded text-center">
                            <span className="block text-xs text-gray-500 mb-1">{r.date.split('-')[2]}</span>
                            <Badge color={getStatusColor(r.status)}>{r.status}</Badge>
                            <span className="block text-xs text-gray-400 mt-1">{r.checkIn} - {r.checkOut}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
