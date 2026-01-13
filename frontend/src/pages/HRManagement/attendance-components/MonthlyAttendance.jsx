import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "../../../components/form/Select";
import { getAttendanceByMonth } from "./mockAttendanceData";

export default function MonthlyAttendance() {
    const [selectedMonth, setSelectedMonth] = useState("2024-01");

    const monthOptions = [
        { value: "2024-01", label: "January 2024" },
        { value: "2024-02", label: "February 2024" },
        { value: "2024-03", label: "March 2024" },
    ];

    const attendanceData = getAttendanceByMonth(selectedMonth);

    // Group by date for chart
    const dates = [...new Set(attendanceData.map((d) => d.date))].sort();
    const presentCounts = dates.map(
        (date) => attendanceData.filter((d) => d.date === date && (d.status === "Present" || d.status === "Late")).length
    );
    const absentCounts = dates.map(
        (date) => attendanceData.filter((d) => d.date === date && d.status === "Absent").length
    );
    const leaveCounts = dates.map(
        (date) => attendanceData.filter((d) => d.date === date && d.status === "Leave").length
    );

    const chartOptions = {
        chart: { type: "bar", height: 350, stacked: true },
        plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
        dataLabels: { enabled: false },
        xaxis: { categories: dates.map(d => d.split("-")[2]) },
        legend: { position: "top", horizontalAlign: "left" },
        colors: ["#10B981", "#EF4444", "#F59E0B"],
        fill: { opacity: 1 },
    };

    const series = [
        { name: "Present", data: presentCounts },
        { name: "Absent", data: absentCounts },
        { name: "On Leave", data: leaveCounts },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-black dark:text-white">Monthly Overview</h3>
                    <div className="w-48">
                        <Select
                            options={monthOptions}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            placeholder="Select Month"
                            className="bg-white dark:bg-boxdark"
                        />
                    </div>
                </div>

                <div id="chart">
                    <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
}
