import {
    UserIcon,
    CalenderIcon,
    FileIcon,
} from "../../../icons";

interface Activity {
    id: string;
    user: string;
    action: string;
    time: string;
    icon: React.ElementType;
    iconBg: string; // Tailwind class
    iconColor: string; // Tailwind class
}

const activities: Activity[] = [
    {
        id: "1",
        user: "Maria Rodriguez",
        action: "applied for Mathematics Teacher",
        time: "2 hours ago",
        icon: FileIcon,
        iconBg: "bg-blue-100 dark:bg-blue-500/10",
        iconColor: "text-blue-500",
    },
    {
        id: "2",
        user: "Robert Wilson",
        action: "requested sick leave",
        time: "4 hours ago",
        icon: CalenderIcon,
        iconBg: "bg-orange-100 dark:bg-orange-500/10",
        iconColor: "text-orange-500",
    },
    {
        id: "3",
        user: "New Hiring",
        action: "onboarding completed for Science Lab Assistant",
        time: "1 day ago",
        icon: UserIcon,
        iconBg: "bg-green-100 dark:bg-green-500/10",
        iconColor: "text-green-500",
    },
    {
        id: "4",
        user: "School Policy",
        action: "updated Exam Schedule 2024",
        time: "2 days ago",
        icon: FileIcon,
        iconBg: "bg-gray-100 dark:bg-gray-700",
        iconColor: "text-gray-500 dark:text-gray-400",
    },
];

export default function RecentActivities() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
                Recent Activities
            </h3>

            <div className="flex flex-col gap-6">
                {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="flex items-center gap-4">
                            <div
                                className={`flex h-11 w-full max-w-11 items-center justify-center rounded-full ${activity.iconBg} ${activity.iconColor}`}
                            >
                                <Icon size={20} />
                            </div>
                            <div className="flex w-full justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                                        <span className="text-gray-800 dark:text-white font-semibold">
                                            {activity.user}
                                        </span>{" "}
                                        {activity.action}
                                    </h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {activity.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
