import { GroupIcon, DocsIcon, CalenderIcon, UserIcon, ArrowUpIcon, ArrowDownIcon, } from "../../../icons";
import Badge from "../../ui/badge/Badge";
export default function HRMetrics() {
    return (<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90"/>
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total Staff
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            150
                        </h4>
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        2.5%
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <UserIcon className="text-gray-800 size-6 dark:text-white/90"/>
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Teachers present
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            85
                        </h4>
                    </div>

                    <Badge color="success">
                        <ArrowUpIcon />
                        98%
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <CalenderIcon className="text-gray-800 size-6 dark:text-white/90"/>
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Staff on Leave
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            4
                        </h4>
                    </div>

                    <Badge color="warning">
                        <ArrowDownIcon />
                        Low
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <DocsIcon className="text-gray-800 size-6 dark:text-white/90"/>
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Job Applications
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            12
                        </h4>
                    </div>

                    <Badge color="success">
                        <ArrowUpIcon />
                        5.0%
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
        </div>);
}
