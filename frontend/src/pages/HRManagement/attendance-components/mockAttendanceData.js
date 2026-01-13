export const employees = [
  { id: 1, name: "John Doe", department: "IT", role: "Developer" },
  { id: 2, name: "Jane Smith", department: "HR", role: "Manager" },
  { id: 3, name: "Robert Johnson", department: "Marketing", role: "Specialist" },
  { id: 4, name: "Emily Davis", department: "Finance", role: "Analyst" },
  { id: 5, name: "Michael Wilson", department: "IT", role: "DevOps" },
  { id: 6, name: "Sarah Brown", department: "Operations", role: "Coordinator" },
];

export const generateMockAttendance = () => {
  const data = [];
  const statuses = ["Present", "Present", "Present", "Absent", "Late", "Half Day", "Leave"];
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-12-31");

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const dateStr = d.toISOString().split("T")[0];

    employees.forEach((emp) => {
      // Random status
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      let checkIn = "-";
      let checkOut = "-";

      if (status === "Present" || status === "Late" || status === "Half Day") {
        checkIn = status === "Late" ? "09:45 AM" : "09:00 AM";
        checkOut = status === "Half Day" ? "01:00 PM" : "06:00 PM";
      }

      data.push({
        id: `${dateStr}-${emp.id}`,
        employeeId: emp.id,
        name: emp.name,
        department: emp.department,
        date: dateStr,
        status,
        checkIn,
        checkOut,
      });
    });
  }
  return data;
};

export const mockAttendanceData = generateMockAttendance();

export const getAttendanceByDate = (date) => {
  return mockAttendanceData.filter((record) => record.date === date);
};

export const getAttendanceByMonth = (monthStr) => {
  // monthStr format: "YYYY-MM"
  return mockAttendanceData.filter((record) => record.date.startsWith(monthStr));
};

export const getEmployeeAttendance = (employeeId, monthStr) => {
  return mockAttendanceData.filter(
    (record) =>
      record.employeeId === parseInt(employeeId) &&
      (!monthStr || record.date.startsWith(monthStr))
  );
};
