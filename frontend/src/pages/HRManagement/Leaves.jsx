import { useState } from "react";
import { Tab } from "@headlessui/react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import InputField from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import Badge from "../../components/ui/badge/Badge";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const mockRequests = [
  {
    id: 1,
    employeeName: "John Doe",
    leaveType: "Health Leave",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    reason: "Severe flu and fever",
    status: "Pending",
    requestDate: "2024-01-25",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    leaveType: "Casual Leave",
    startDate: "2024-02-10",
    endDate: "2024-02-11",
    reason: "Personal family function",
    status: "Approved",
    requestDate: "2024-01-20",
  },
  {
    id: 3,
    employeeName: "Robert Johnson",
    leaveType: "Paid Leave",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    reason: "Planned vacation",
    status: "Rejected",
    requestDate: "2024-01-15",
  },
];
export default function Leaves() {
  const [requests, setRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState(0);
  // Form State
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const leaveTypes = [
    { value: "Health Leave", label: "Health Leave" },
    { value: "Casual Leave", label: "Casual Leave" },
    { value: "Paid Leave", label: "Paid Leave" },
    { value: "Unpaid Leave", label: "Unpaid Leave" },
  ];
  const handleApplySubmit = (e) => {
    e.preventDefault();
    console.log("Leave Applied:", formData);
    // Reset form and typically show success message
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    setActiveTab(1); // Switch to requests tab to "view" it (simulation)
  };
  const handleAction = (id, status) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status } : req)));
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "success";
      case "Rejected": return "error";
      default: return "warning";
    }
  };
  return (<div className="mx-auto max-w-7xl">
    <PageBreadCrumb pageTitle="Leave Management" />

    <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
      <Tab.List className="mb-6 flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-meta-4">
        <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 ring-offset-brand-500 focus:outline-none focus:ring-2", selected
          ? "bg-white text-brand-500 shadow-sm dark:bg-boxdark dark:text-white"
          : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700 dark:text-gray-400 dark:hover:text-white")}>
          Apply for Leave
        </Tab>
        <Tab className={({ selected }) => classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 ring-offset-brand-500 focus:outline-none focus:ring-2", selected
          ? "bg-white text-brand-500 shadow-sm dark:bg-boxdark dark:text-white"
          : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700 dark:text-gray-400 dark:hover:text-white")}>
          Leave Requests
        </Tab>
      </Tab.List>

      <Tab.Panels>
        {/* Apply Tab */}
        <Tab.Panel className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-5 text-lg font-medium text-black dark:text-white animate-fade-in">
            New Leave Request
          </h3>
          <form onSubmit={handleApplySubmit}>
            <div className="mb-5.5 grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <Label htmlFor="leaveType">Leave Type <span className="text-error-500">*</span></Label>
                <Select options={leaveTypes} placeholder="Select Type" className="bg-transparent" onChange={(val) => setFormData({ ...formData, leaveType: val })} />
              </div>
              <div className="hidden sm:block"></div> {/* Spacer */}

              <div>
                <Label htmlFor="startDate">Start Date <span className="text-error-500">*</span></Label>
                <InputField type="date" id="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="endDate">End Date <span className="text-error-500">*</span></Label>
                <InputField type="date" id="endDate" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="reason">Reason <span className="text-error-500">*</span></Label>
              <TextArea id="reason" rows={4} placeholder="Enter reason for leave..." className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-brand-500" value={formData.reason} onChange={(val) => setFormData({ ...formData, reason: val })} />
            </div>

            <div className="flex justify-end gap-4.5">
              <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button" onClick={() => setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" })}>
                Cancel
              </button>
              <button className="flex justify-center rounded bg-brand-500 py-2 px-6 font-medium text-white hover:bg-opacity-90" type="submit">
                Submit Request
              </button>
            </div>
          </form>
        </Tab.Panel>

        {/* Requests Tab (Approval) */}
        <Tab.Panel className="space-y-4">
          {requests.map((req) => (<div key={req.id} className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark animate-fade-in-up">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Info */}
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between md:justify-start md:gap-4">
                  <h4 className="text-lg font-semibold text-black dark:text-white">
                    {req.employeeName}
                  </h4>
                  <Badge color={getStatusColor(req.status)}>{req.status}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Request Date: {req.requestDate}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <span className="block text-xs font-medium uppercase text-gray-500">
                      Leave Type
                    </span>
                    <span className="text-black dark:text-white">
                      {req.leaveType}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium uppercase text-gray-500">
                      Duration
                    </span>
                    <span className="text-black dark:text-white">
                      {req.startDate} to {req.endDate}
                    </span>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <span className="block text-xs font-medium uppercase text-gray-500">
                      Reason
                    </span>
                    <p className="text-sm text-black dark:text-white">
                      {req.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions & Timeline Status */}
              <div className="flex flex-col items-end gap-6">
                {/* Visual Status Line */}
                <div className="flex items-center gap-2 text-xs">
                  <div className={`flex items-center gap-1 ${['Pending', 'Approved', 'Rejected'].includes(req.status) ? 'text-brand-500' : 'text-gray-400'}`}>
                    <div className="h-2 w-2 rounded-full bg-current"></div>
                    Applied
                  </div>
                  <div className="h-0.5 w-6 bg-gray-300 dark:bg-gray-600"></div>
                  <div className={`flex items-center gap-1 ${req.status !== 'Pending' ? (req.status === 'Approved' ? 'text-success-500' : 'text-error-500') : 'text-gray-400'}`}>
                    <div className={`h-2 w-2 rounded-full ${req.status === 'Pending' ? 'border border-gray-400' : 'bg-current'}`}></div>
                    {req.status === 'Pending' ? 'Reviewing' : req.status}
                  </div>
                </div>

                {req.status === "Pending" && (<div className="flex gap-2">
                  <button onClick={() => handleAction(req.id, "Rejected")} className="rounded border border-error-500 py-1.5 px-4 text-sm font-medium text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10">
                    Reject
                  </button>
                  <button onClick={() => handleAction(req.id, "Approved")} className="rounded bg-success-500 py-1.5 px-4 text-sm font-medium text-white hover:bg-opacity-90">
                    Approve
                  </button>
                </div>)}
              </div>
            </div>
          </div>))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>);
}
