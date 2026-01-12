import { useState } from "react";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../../icons";
export default function EmployeeDemographics() {
    const [isOpen, setIsOpen] = useState(false);
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    function closeDropdown() {
        setIsOpen(false);
    }
    return (<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="flex justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Employee Distribution
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Headcount by Department
                    </p>
                </div>
                <div className="relative inline-block">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6"/>
                    </button>
                    <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
                        <DropdownItem onItemClick={closeDropdown} className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                            View Reports
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                            T
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                                Teaching Staff
                            </p>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                85 Employees
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[140px] items-center gap-3">
                        <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                            <div className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white" style={{ width: "57%" }}></div>
                        </div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            57%
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-xs">
                            A
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                                Administration
                            </p>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                25 Employees
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[140px] items-center gap-3">
                        <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                            <div className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white" style={{ width: "17%" }}></div>
                        </div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            17%
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
                            S
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                                Support Staff
                            </p>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                30 Employees
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[140px] items-center gap-3">
                        <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                            <div className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white" style={{ width: "20%" }}></div>
                        </div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            20%
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-xs">
                            M
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                                Management
                            </p>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                10 Employees
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[140px] items-center gap-3">
                        <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                            <div className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white" style={{ width: "6%" }}></div>
                        </div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            6%
                        </p>
                    </div>
                </div>
            </div>
        </div>);
}
