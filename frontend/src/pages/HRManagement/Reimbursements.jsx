import { useState } from "react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
const mockClaims = [
    {
        id: 1,
        type: "Travel Expense",
        amount: 2500,
        date: "2024-01-20",
        status: "Pending",
        description: "Taxi fare for client meeting",
    },
    {
        id: 2,
        type: "Internet Bill",
        amount: 1200,
        date: "2024-01-05",
        status: "Approved",
        description: "Monthly broadband reimbursement",
    },
    {
        id: 3,
        type: "Team Lunch",
        amount: 5000,
        date: "2023-12-28",
        status: "Paid",
        description: "Quarterly team bonding lunch",
    },
    {
        id: 4,
        type: "Office Supplies",
        amount: 800,
        date: "2023-12-15",
        status: "Rejected",
        description: "Personal stationery",
    },
];
export default function Reimbursements() {
    const [claims] = useState(mockClaims);
    const getStatusColor = (status) => {
        switch (status) {
            case "Paid":
            case "Approved":
                return "success";
            case "Pending":
                return "warning";
            case "Rejected":
                return "error";
            default:
                return "light";
        }
    };
    return (<div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Reimbursements"/>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            My Claims
          </h2>
          <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-brand-500 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""/>
            </svg>
            New Claim
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {claims.map((claim) => (<div key={claim.id} className="rounded-lg border border-stroke bg-gray-50 p-4 dark:border-strokedark dark:bg-meta-4/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-black dark:text-white">{claim.type}</h4>
                    <Badge color={getStatusColor(claim.status)}>{claim.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{claim.description}</p>
                  <p className="mt-1 text-xs text-gray-400">Date: {claim.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black dark:text-white">₹{claim.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
