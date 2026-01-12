import { useState } from "react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import InputField from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import Badge from "../../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface Incident {
  id: number;
  type: string;
  severity: "High" | "Medium" | "Low";
  date: string;
  description: string;
  status: "Open" | "Resolved" | "Investigating";
}

const mockIncidents: Incident[] = [
  {
    id: 1,
    type: "Workplace Injury",
    severity: "High",
    date: "2024-01-10",
    description: "Employee slipped on wet floor near cafeteria.",
    status: "Investigating",
  },
  {
    id: 2,
    type: "Equipment Malfunction",
    severity: "Medium",
    date: "2023-12-15",
    description: "AC unit in server room stopped working.",
    status: "Resolved",
  },
  {
    id: 3,
    type: "Software Outage",
    severity: "Low",
    date: "2023-11-20",
    description: "Intermittent internet connectivity for 1 hour.",
    status: "Resolved",
  },
];

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [formData, setFormData] = useState({
    type: "",
    severity: "",
    date: "",
    description: "",
  });

  const incidentTypes = [
    { value: "Workplace Injury", label: "Workplace Injury" },
    { value: "Equipment Malfunction", label: "Equipment Malfunction" },
    { value: "Harassment", label: "Harassment" },
    { value: "Security Breach", label: "Security Breach" },
    { value: "Other", label: "Other" },
  ];

  const severityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncident: Incident = {
      id: Date.now(),
      type: formData.type || "Other",
      severity: (formData.severity as Incident["severity"]) || "Low",
      date: formData.date,
      description: formData.description,
      status: "Open",
    };
    setIncidents([newIncident, ...incidents]);
    setFormData({ type: "", severity: "", date: "", description: "" });
  };

  const getSeverityColor = (severity: Incident["severity"]) => {
    switch (severity) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "light";
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Incident Reporting" />

      <div className="grid grid-cols-1 gap-9 xl:grid-cols-2">
        {/* Report Form */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Report New Incident
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <Label htmlFor="type">
                    Incident Type <span className="text-meta-1">*</span>
                  </Label>
                  <Select
                    options={incidentTypes}
                    placeholder="Select Type"
                    className="bg-transparent"
                    onChange={(val) => setFormData({ ...formData, type: val })}
                  />
                </div>

                <div className="mb-4.5">
                  <Label htmlFor="severity">
                    Severity <span className="text-meta-1">*</span>
                  </Label>
                  <Select
                    options={severityOptions}
                    placeholder="Select Severity"
                    className="bg-transparent"
                    onChange={(val) => setFormData({ ...formData, severity: val })}
                  />
                </div>

                <div className="mb-4.5">
                  <Label htmlFor="date">
                    Date of Incident <span className="text-meta-1">*</span>
                  </Label>
                  <InputField
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="mb-6">
                  <Label htmlFor="description">
                    Description <span className="text-meta-1">*</span>
                  </Label>
                  <TextArea
                    id="description"
                    rows={4}
                    placeholder="Describe the incident details..."
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-brand-500"
                    value={formData.description}
                    onChange={(val) => setFormData({ ...formData, description: val })}
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-brand-500 p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History List */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Recent Incidents
              </h3>
            </div>
            <div className="max-w-full overflow-x-auto p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-2 text-left dark:bg-meta-4">
                    <TableHeader className="py-4 px-4 font-medium text-black dark:text-white">
                      Type
                    </TableHeader>
                    <TableHeader className="py-4 px-4 font-medium text-black dark:text-white">
                      Severity
                    </TableHeader>
                    <TableHeader className="py-4 px-4 font-medium text-black dark:text-white">
                      Date
                    </TableHeader>
                    <TableHeader className="py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </TableHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id} className="border-b border-stroke dark:border-strokedark">
                      <TableCell className="py-5 px-4">
                        <p className="text-black dark:text-white">{incident.type}</p>
                      </TableCell>
                      <TableCell className="py-5 px-4">
                        <Badge color={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5 px-4">
                        <p className="text-black dark:text-white">{incident.date}</p>
                      </TableCell>
                      <TableCell className="py-5 px-4">
                        <p className="text-sm">{incident.status}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
