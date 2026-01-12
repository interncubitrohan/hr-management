import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import Applications from "./pages/HRManagement/Applications";
import Employees from "./pages/HRManagement/Employees";
import AddEmployee from "./pages/HRManagement/AddEmployee";
import Documents from "./pages/HRManagement/Documents";
import Attendance from "./pages/HRManagement/Attendance";
import Leaves from "./pages/HRManagement/Leaves";
import Payroll from "./pages/HRManagement/Payroll";
import Reimbursements from "./pages/HRManagement/Reimbursements";
import Incidents from "./pages/HRManagement/Incidents";
import Performance from "./pages/HRManagement/Performance";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* HR Management */}
            <Route path="/hr/applications" element={<Applications />} />
            <Route path="/hr/employees" element={<Employees />} />
            <Route path="/hr/employees/add" element={<AddEmployee />} />
            <Route path="/hr/documents" element={<Documents />} />
            <Route path="/hr/attendance" element={<Attendance />} />
            <Route path="/hr/leaves" element={<Leaves />} />
            <Route path="/hr/payroll" element={<Payroll />} />
            <Route path="/hr/reimbursements" element={<Reimbursements />} />
            <Route path="/hr/incidents" element={<Incidents />} />
            <Route path="/hr/performance" element={<Performance />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}


