import ReactApexChart from "react-apexcharts";
import { mockAttendanceData } from "./mockAttendanceData";

export default function AttendanceOverview() {
    const currentMonth = "2024-01";
    const monthlyData = mockAttendanceData.filter((r) => r.date.startsWith(currentMonth));
    const todayDate = "2024-01-24";
    const todayData = mockAttendanceData.filter((r) => r.date === todayDate);

    const totalDays = monthlyData.length;
    const presentCount = monthlyData.filter((r) => r.status === "Present" || r.status === "Late").length;
    const absentCount = monthlyData.filter((r) => r.status === "Absent").length;
    const leaveCount = monthlyData.filter((r) => r.status === "Leave").length;

    const attendancePercentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;

    const pieOptions = {
        chart: { type: "donut" },
        labels: ["Present", "Absent", "On Leave"],
        colors: ["#10B981", "#EF4444", "#F59E0B"],
        legend: { position: "bottom" },
        dataLabels: { enabled: false },
    };

    const pieSeries = [presentCount, absentCount, leaveCount];

    return (
        <div className="flex flex-col gap-6">
            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">{attendancePercentage}%</h4>
                            <span className="text-sm font-medium text-gray-500">Avg. Attendance</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div>
                        <h4 className="text-title-md font-bold text-green-500">{presentCount}</h4>
                        <span className="text-sm font-medium text-gray-500">Total Present (Jan)</span>
                    </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div>
                        <h4 className="text-title-md font-bold text-red-500">{absentCount}</h4>
                        <span className="text-sm font-medium text-gray-500">Total Absent (Jan)</span>
                    </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div>
                        <h4 className="text-title-md font-bold text-yellow-500">{leaveCount}</h4>
                        <span className="text-sm font-medium text-gray-500">Total Leaves (Jan)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Attendance Distribution Chart */}
                <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">Attendance Distribution (Jan)</h3>
                    <div className="flex justify-center">
                        <ReactApexChart options={pieOptions} series={pieSeries} type="donut" height={350} />
                    </div>
                </div>

                {/* Today's Highlights */}
                <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">Today's Highlights ({todayDate})</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded bg-green-50 dark:bg-meta-4">
                            <span className="font-medium text-black dark:text-white">Present Today</span>
                            <span className="font-bold text-green-600">{todayData.filter(r => r.status === 'Present' || r.status === 'Late').length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-red-50 dark:bg-meta-4">
                            <span className="font-medium text-black dark:text-white">Absent Today</span>
                            <span className="font-bold text-red-600">{todayData.filter(r => r.status === 'Absent').length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-yellow-50 dark:bg-meta-4">
                            <span className="font-medium text-black dark:text-white">On Leave Today</span>
                            <span className="font-bold text-yellow-600">{todayData.filter(r => r.status === 'Leave').length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-orange-50 dark:bg-meta-4">
                            <span className="font-medium text-black dark:text-white">Late Arrivals</span>
                            <span className="font-bold text-orange-600">{todayData.filter(r => r.status === 'Late').length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
