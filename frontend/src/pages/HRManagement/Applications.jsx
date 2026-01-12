import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Link } from "react-router";
import { useState } from "react";
import Select from "../../components/form/Select";
import Badge from "../../components/ui/badge/Badge";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import applications from "../../data/applications";

export default function Applications() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const categoryOptions = [
        { value: "All", label: "All Categories" },
        { value: "Teaching", label: "Teaching" },
        { value: "Non-Teaching", label: "Non-Teaching" },
        { value: "Management", label: "Management" },
    ];

    const statusOptions = [
        { value: "All", label: "All Statuses" },
        { value: "Pending", label: "Pending" },
        { value: "Shortlisted", label: "Shortlisted" },
        { value: "Hired", label: "Hired" },
        { value: "Rejected", label: "Rejected" },
    ];

    const filteredApplications = applications.filter((app) => {
        const categoryMatch = selectedCategory === "All" || app.category === selectedCategory;
        const statusMatch = selectedStatus === "All" || app.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    const getBadgeColor = (status) => {
        switch (status) {
            case "Hired":
                return "success";
            case "Pending":
                return "warning";
            case "Rejected":
                return "error";
            case "Shortlisted":
                return "info";
            default:
                return "light";
        }
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Applications" />

            {/* Filter Section */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-full sm:w-48">
                    <Select
                        options={categoryOptions}
                        placeholder="Select Category"
                        onChange={setSelectedCategory}
                        defaultValue="All"
                    />
                </div>
                <div className="w-full sm:w-48">
                    <Select
                        options={statusOptions}
                        placeholder="Select Status"
                        onChange={setSelectedStatus}
                        defaultValue="All"
                    />
                </div>
            </div>

            {/* Job Application Section */}
            <div className="mb-6 grid grid-cols-1 gap-6">
                <ComponentCard title="Job Application Management">
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Share this public link with candidates to allow them to apply directly.
                            </p>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-600 focus:outline-hidden focus:ring-4 focus:ring-brand-500/20"
                            >
                                Apply for Job (Public Link)
                            </a>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-medium text-gray-800 dark:text-white/90">
                                Live Form Responses (Google Sheets)
                            </h4>
                            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                <iframe
                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vPlaceholder/pubhtml?widget=true&headers=false"
                                    className="w-full h-[400px]"
                                    title="Google Sheets Embed"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Application ID
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Role
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Category
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {app.id}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90 font-medium">
                                            {app.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {app.role}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {app.category}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            <Badge size="sm" color={getBadgeColor(app.status)}>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            <Link to={`/hr/applications/${app.id}`} className="text-brand-500 hover:text-brand-600 text-theme-sm font-medium">
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No applications found matching your filters.
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
