import { useParams, Link } from "react-router";
import applications from "../../data/applications";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label"; // Assuming we want consistency, but plain HTML is fine too inside Card
import Badge from "../../components/ui/badge/Badge";

export default function ApplicationView() {
    const { id } = useParams();
    const application = applications.find((app) => app.id === id);

    if (!application) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Application not found</h2>
                <Link to="/hr/applications" className="mt-4 inline-block text-brand-500 hover:underline">
                    &larr; Back to Applications
                </Link>
            </div>
        );
    }

    const getBadgeColor = (status) => {
        switch (status) {
            case "Hired": return "success";
            case "Pending": return "warning";
            case "Rejected": return "error";
            case "Shortlisted": return "info";
            default: return "light";
        }
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Application Details" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Personal Details */}
                <ComponentCard title="Personal Details">
                    <div className="space-y-4">
                        <div>
                            <Label>Full Name</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.name}</p>
                        </div>
                        <div>
                            <Label>Email Address</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.email}</p>
                        </div>
                        <div>
                            <Label>Phone Number</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.phone}</p>
                        </div>
                    </div>
                </ComponentCard>

                {/* Job Details */}
                <ComponentCard title="Job Information">
                    <div className="space-y-4">
                        <div>
                            <Label>Application ID</Label>
                            <p className="text-gray-800 dark:text-white/90 font-mono">{application.id}</p>
                        </div>
                        <div>
                            <Label>Role Applied For</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.role}</p>
                        </div>
                        <div>
                            <Label>Category</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.category}</p>
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.experience}</p>
                        </div>
                        <div>
                            <Label>Date Applied</Label>
                            <p className="text-gray-800 dark:text-white/90">{application.appliedDate}</p>
                        </div>
                    </div>
                </ComponentCard>

                {/* Status and Actions - Spanning full width on mobile, or taking up space in grid */}
                <ComponentCard title="Application Status & Actions" className="xl:col-span-2">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <Label>Current Status</Label>
                            <div>
                                <Badge size="md" color={getBadgeColor(application.status)}>
                                    {application.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            {/* Status Dropdown - UI Only */}
                            <div className="w-full sm:w-48">
                                <select className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:outline-hidden dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-500">
                                    <option>Change Status...</option>
                                    <option>Pending</option>
                                    <option>Shortlisted</option>
                                    <option>Hired</option>
                                    <option>Rejected</option>
                                </select>
                            </div>

                            {/* Resume Button */}
                            <button className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                                Download Resume ({application.resume})
                            </button>
                        </div>
                    </div>
                </ComponentCard>
            </div>

            <div className="mt-6">
                <Link
                    to="/hr/applications"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600 focus:outline-hidden focus:ring-4 focus:ring-brand-500/20"
                >
                    Back to Applications List
                </Link>
            </div>
        </>
    );
}
