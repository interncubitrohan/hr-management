import { Table, TableBody, TableCell, TableHeader, TableRow, } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { useState } from "react";
import { Link } from "react-router-dom";
const employees = [
    {
        id: 101,
        name: "John Doe",
        email: "john.doe@school.edu",
        department: "Administration",
        role: "Registrar",
        gender: "Male",
        status: "Active",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=3C50E0&color=fff"
    },
    {
        id: 102,
        name: "Jane Smith",
        email: "jane.smith@school.edu",
        department: "Teaching",
        role: "Math Teacher",
        gender: "Female",
        status: "Active",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=10B981&color=fff"
    },
    {
        id: 103,
        name: "Alice Johnson",
        email: "alice.j@school.edu",
        department: "Teaching",
        role: "Science Teacher",
        gender: "Female",
        status: "Inactive",
        avatar: null
    },
    {
        id: 104,
        name: "Bob Brown",
        email: "bob.b@school.edu",
        department: "Support",
        role: "Counselor",
        gender: "Male",
        status: "Active",
        avatar: null
    },
];
export default function Employees() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredEmployees = employees.filter(emp => Object.values(emp).some(val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())));
    return (<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Employees List
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <input type="text" placeholder="Search employees..." className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-brand-500 focus-visible:shadow-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-brand-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <span className="absolute right-4 top-2.5">
              <svg className="fill-current text-gray-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill=""/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill=""/>
              </svg>
            </span>
          </div>
          <Link to="/hr/employees/add" className="flex items-center gap-2 rounded bg-brand-500 px-4 py-2 font-medium text-white hover:bg-opacity-90">
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""/>
            </svg>
            Add Employee
          </Link>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-stroke dark:border-strokedark">
              <TableCell isHeader className="min-w-[220px] py-4.5 px-4 font-semibold text-black dark:text-white xl:pl-11">
                NAME
              </TableCell>
              <TableCell isHeader className="min-w-[150px] py-4.5 px-4 font-semibold text-black dark:text-white">
                ROLE
              </TableCell>
              <TableCell isHeader className="min-w-[120px] py-4.5 px-4 font-semibold text-black dark:text-white">
                DEPARTMENT
              </TableCell>
              <TableCell isHeader className="min-w-[120px] py-4.5 px-4 font-semibold text-black dark:text-white">
                STATUS
              </TableCell>
              <TableCell isHeader className="py-4.5 px-4 font-semibold text-black dark:text-white">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((emp) => (<TableRow key={emp.id} className="border-b border-stroke dark:border-strokedark">
                <TableCell className="min-w-[220px] py-4.5 px-4 pl-9 xl:pl-11">
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <div className="flex-shrink-0">
                      {emp.avatar ? (<img src={emp.avatar} alt="avatar" className="h-10 w-10 rounded-full"/>) : (<div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta-2 text-brand-500 dark:bg-meta-4">
                          {emp.name.charAt(0)}
                        </div>)}
                    </div>
                    <div className="hidden text-black dark:text-white sm:block">
                      <h5 className="font-medium text-black dark:text-white">{emp.name}</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[150px] py-4.5 px-4">
                  <p className="text-black dark:text-white">{emp.role}</p>
                  <p className="text-xs text-gray-500">{emp.gender}</p>
                </TableCell>
                <TableCell className="min-w-[120px] py-4.5 px-4">
                  <span className="inline-block rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-black dark:bg-meta-4 dark:text-white">
                    {emp.department}
                  </span>
                </TableCell>
                <TableCell className="min-w-[120px] py-4.5 px-4">
                  <Badge color={emp.status === "Active" ? "success" : "error"}>
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4.5 px-4">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-brand-500">
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99981 9.00016C9.99392 9.00016 10.7998 8.19427 10.7998 7.20016C10.7998 6.20605 9.99392 5.40015 8.99981 5.40015C8.0057 5.40015 7.1998 6.20605 7.1998 7.20016C7.1998 8.19427 8.0057 9.00016 8.99981 9.00016Z" fill=""/>
                        <path d="M8.99981 13.9999C12.3135 13.9999 15.352 12.0001 16.7143 8.99992C15.352 5.99971 12.3135 4.00008 8.99981 4.00008C5.68612 4.00008 2.64761 5.99971 1.28534 8.99992C2.64761 12.0001 5.68612 13.9999 8.99981 13.9999ZM8.99981 5.25008C9.96631 5.25008 10.7498 6.03358 10.7498 7.00008C10.7498 7.96658 9.96631 8.75008 8.99981 8.75008C8.03331 8.75008 7.24981 7.96658 7.24981 7.00008C7.24981 6.03358 8.03331 5.25008 8.99981 5.25008Z" fill=""/>
                      </svg>
                    </button>
                    <button className="hover:text-brand-500">
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.481262 10.0691 0.481262H7.90352C7.05977 0.481262 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.79727 2.47502 3.42539 2.80002 3.42539 3.2219C3.42539 3.64377 3.79727 3.96877 4.21914 3.96877H13.7535C14.1754 3.96877 14.5473 3.64377 14.5473 3.2219C14.5473 2.80002 14.1754 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.78164 1.74377 7.90352 1.74377H10.0691C10.191 1.74377 10.2941 1.85627 10.2941 1.9969V2.47502H7.67852V1.9969Z" fill=""/>
                        <path d="M12.9688 4.97815H5.00314C4.69377 4.97815 4.54064 5.37815 4.70002 5.56565L5.78752 15.65C5.81564 15.9313 6.05939 16.1438 6.34064 16.1438H11.6219C11.9031 16.1438 12.1469 15.9313 12.175 15.65L13.2625 5.56565C13.4313 5.37815 13.2781 4.97815 12.9688 4.97815ZM10.5188 13.6125C10.5188 13.8406 10.3344 14.025 10.1063 14.025C9.87814 14.025 9.69376 13.8406 9.69376 13.6125V6.75C9.69376 6.52188 9.87814 6.3375 10.1063 6.3375C10.3344 6.3375 10.5188 6.52188 10.5188 6.75V13.6125ZM8.38439 13.6125C8.38439 13.8406 8.2 14.025 7.97189 14.025C7.74376 14.025 7.55939 13.8406 7.55939 13.6125V6.75C7.55939 6.52188 7.74376 6.3375 7.97189 6.3375C8.2 6.3375 8.38439 6.52188 8.38439 6.75V13.6125Z" fill=""/>
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </div>
    </div>);
}
