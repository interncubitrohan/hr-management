import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { getAttendanceByDate } from "./mockAttendanceData";

export default function DailyAttendance() {
    const [selectedDate, setSelectedDate] = useState(new Date("2024-01-24"));

    const dateStr = selectedDate.toISOString().split("T")[0];
    const attendanceData = getAttendanceByDate(dateStr);

    const stats = {
        total: attendanceData.length,
        present: attendanceData.filter((r) => r.status === "Present" || r.status === "Late" || r.status === "Half Day").length,
        absent: attendanceData.filter((r) => r.status === "Absent").length,
        onLeave: attendanceData.filter((r) => r.status === "Leave").length,
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
            {/* Date Picker & Stats */}
            <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl font-semibold text-black dark:text-white">Daily Attendance</h3>
                    <div className="w-full sm:w-48">
                        <Flatpickr
                            value={selectedDate}
                            onChange={([date]) => setSelectedDate(date)}
                            options={{ dateFormat: "Y-m-d", maxDate: "today" }}
                            className="w-full rounded border border-stroke bg-transparent py-2 px-3 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="rounded border border-stroke p-4 text-center dark:border-strokedark">
                        <span className="block text-sm font-medium text-gray-500">Total Employees</span>
                        <span className="text-xl font-bold text-black dark:text-white">{stats.total || "6"}</span>
                    </div>
                    <div className="rounded border border-stroke p-4 text-center dark:border-strokedark bg-green-50 dark:bg-green-900/20">
                        <span className="block text-sm font-medium text-green-600">Present</span>
                        <span className="text-xl font-bold text-green-600">{stats.present}</span>
                    </div>
                    <div className="rounded border border-stroke p-4 text-center dark:border-strokedark bg-red-50 dark:bg-red-900/20">
                        <span className="block text-sm font-medium text-red-600">Absent</span>
                        <span className="text-xl font-bold text-red-600">{stats.absent}</span>
                    </div>
                    <div className="rounded border border-stroke p-4 text-center dark:border-strokedark bg-yellow-50 dark:bg-yellow-900/20">
                        <span className="block text-sm font-medium text-yellow-600">On Leave</span>
                        <span className="text-xl font-bold text-yellow-600">{stats.onLeave}</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-2 text-left dark:bg-meta-4">
                                <TableCell isHeader className="font-medium text-black dark:text-white">Employee</TableCell>
                                <TableCell isHeader className="font-medium text-black dark:text-white">Department</TableCell>
                                <TableCell isHeader className="font-medium text-black dark:text-white">Check In</TableCell>
                                <TableCell isHeader className="font-medium text-black dark:text-white">Check Out</TableCell>
                                <TableCell isHeader className="font-medium text-black dark:text-white">Status</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.length > 0 ? (
                                attendanceData.map((record) => (
                                    <TableRow key={record.id} className="border-b border-stroke dark:border-strokedark">
                                        <TableCell><p className="font-medium text-black dark:text-white">{record.name}</p></TableCell>
                                        <TableCell><p className="text-black dark:text-white">{record.department}</p></TableCell>
                                        <TableCell><p className="text-black dark:text-white">{record.checkIn}</p></TableCell>
                                        <TableCell><p className="text-black dark:text-white">{record.checkOut}</p></TableCell>
                                        <TableCell><Badge color={getStatusColor(record.status)}>{record.status}</Badge></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">No records found for this date.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
