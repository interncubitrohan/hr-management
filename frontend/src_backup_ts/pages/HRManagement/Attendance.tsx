import { useState } from "react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Select from "../../components/form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface AttendanceRecord {
  id: number;
  name: string;
  department: string;
  gender: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Late" | "Half Day";
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: 1,
    name: "John Doe",
    department: "IT",
    gender: "Male",
    date: "2024-01-24",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "HR",
    gender: "Female",
    date: "2024-01-24",
    checkIn: "09:15 AM",
    checkOut: "06:00 PM",
    status: "Late",
  },
  {
    id: 3,
    name: "Robert Johnson",
    department: "Marketing",
    gender: "Male",
    date: "2024-01-24",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Finance",
    gender: "Female",
    date: "2024-01-24",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    status: "Half Day",
  },
  {
    id: 5,
    name: "Michael Wilson",
    department: "IT",
    gender: "Male",
    date: "2024-01-24",
    checkIn: "08:55 AM",
    checkOut: "06:10 PM",
    status: "Present",
  },
  {
    id: 6,
    name: "Sarah Brown",
    department: "Operations",
    gender: "Female",
    date: "2024-01-24",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
];

export default function Attendance() {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredData = mockAttendance.filter((record) => {
    const matchDept = departmentFilter ? record.department === departmentFilter : true;
    const matchGender = genderFilter ? record.gender === genderFilter : true;
    return matchDept && matchGender;
  });

  const getStatusColor = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "Present":
        return "success";
      case "Absent":
        return "error";
      case "Late":
        return "warning";
      case "Half Day":
        return "info";
      default:
        return "light";
    }
  };

  const departmentOptions = [
    { value: "", label: "All Departments" },
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Operations", label: "Operations" },
  ];

  const genderOptions = [
    { value: "", label: "All Genders" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Daily Attendance" />

      <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Attendance Records
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-48">
              <Select
                options={departmentOptions}
                placeholder="Filter by Department"
                onChange={setDepartmentFilter}
                className="bg-white dark:bg-boxdark"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={genderOptions}
                placeholder="Filter by Gender"
                onChange={setGenderFilter}
                className="bg-white dark:bg-boxdark"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-2 text-left dark:bg-meta-4">
                <TableCell isHeader className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Employee
                </TableCell>
                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Department
                </TableCell>
                <TableCell isHeader className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Gender
                </TableCell>
                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Check In
                </TableCell>
                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Check Out
                </TableCell>
                <TableCell isHeader className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <TableRow key={record.id} className="border-b border-stroke dark:border-strokedark">
                    <TableCell className="py-5 px-4">
                      <p className="font-medium text-black dark:text-white">
                        {record.name}
                      </p>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <p className="text-black dark:text-white">
                        {record.department}
                      </p>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <p className="text-black dark:text-white">
                        {record.gender}
                      </p>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <p className="text-black dark:text-white">
                        {record.checkIn}
                      </p>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <p className="text-black dark:text-white">
                        {record.checkOut}
                      </p>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <Badge color={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-5 px-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No attendance records found matching your filters.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
