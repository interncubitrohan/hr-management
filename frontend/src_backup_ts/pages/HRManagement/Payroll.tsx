import PageBreadCrumb from "../../components/common/PageBreadCrumb";

export default function Payroll() {
  const salaryDetails = {
    basic: 45000,
    hra: 18000,
    conveyance: 5000,
    medical: 2000,
    special: 5000,
    pf: 3600,
    tax: 2500,
    insurance: 1500,
  };

  const totalEarnings =
    salaryDetails.basic +
    salaryDetails.hra +
    salaryDetails.conveyance +
    salaryDetails.medical +
    salaryDetails.special;

  const totalDeductions =
    salaryDetails.pf + salaryDetails.tax + salaryDetails.insurance;

  const netPay = totalEarnings - totalDeductions;

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Payroll" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              My Payslip
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Month: January 2024</p>
          </div>

          <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            <span>
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16669 13.0208C9.16669 13.0208 9.16669 13.0208 9.16669 13.0208C9.09836 12.9867 9.03002 12.9183 8.99586 12.85C8.96169 12.7817 8.96169 12.6792 8.96169 12.575V3.33333C8.96169 2.87333 9.33502 2.5 9.79502 2.5C10.255 2.5 10.6284 2.87333 10.6284 3.33333V12.575C10.6284 12.6792 10.6284 12.7817 10.5942 12.85C10.56 12.9183 10.4917 12.9867 10.4234 13.0208C10.355 13.055 10.2525 13.055 10.1484 13.055H9.44086C9.33669 13.055 9.23419 13.055 9.16669 13.0208Z"
                  fill=""
                />
                <path
                  d="M14.8333 9.16667C14.3733 9.16667 14 9.54001 14 10V15H5.66667V10C5.66667 9.54001 5.29334 9.16667 4.83334 9.16667C4.37334 9.16667 4 9.54001 4 10V15.8333C4 16.2933 4.37334 16.6667 4.83334 16.6667H14.8333C15.2933 16.6667 15.6667 16.2933 15.6667 15.8333V10C15.6667 9.54001 15.2933 9.16667 14.8333 9.16667Z"
                  fill=""
                />
                <path
                  d="M13.6092 11.2375C13.935 11.5625 14.4608 11.5625 14.7867 11.2375C15.1125 10.9125 15.1125 10.3867 14.7867 10.0608L10.3842 5.65834C10.0583 5.33251 9.53251 5.33251 9.20667 5.65834L4.80417 10.0608C4.47834 10.3867 4.47834 10.9125 4.80417 11.2375C5.13001 11.5625 5.65584 11.5625 5.98167 11.2375L9.79501 7.42417L13.6092 11.2375Z"
                  fill=""
                  transform="rotate(180 9.795 8.448)"
                />
              </svg>
            </span>
            Download Payslip
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Earnings */}
          <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">Earnings</h4>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Basic Pay</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.basic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">HRA</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.hra.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Conveyance Allowance</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.conveyance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Medical Allowance</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.medical.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Special Allowance</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.special.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-bold">
                <span className="text-black dark:text-white">Total Earnings</span>
                <span className="text-success-600 dark:text-success-500">₹{totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">Deductions</h4>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Provident Fund (PF)</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.pf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Professional Tax</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stroke pb-2 dark:border-strokedark">
                <span className="text-gray-600 dark:text-gray-400">Medical Insurance</span>
                <span className="font-medium text-black dark:text-white">₹{salaryDetails.insurance.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-bold">
                <span className="text-black dark:text-white">Total Deductions</span>
                <span className="text-error-600 dark:text-error-500">₹{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="mt-8 rounded-sm bg-gray-100 p-6 text-center dark:bg-meta-4">
          <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Net Pay</h3>
          <p className="text-4xl font-bold text-brand-500">₹{netPay.toLocaleString()}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">(Seventy-Five Thousand Nine Hundred Only)</p>
        </div>

        <div className="mt-8 pt-6 border-t border-stroke dark:border-strokedark">
          <h4 className="mb-4 font-semibold text-black dark:text-white">Recent Payslips</h4>
          <div className="flex flex-wrap gap-4">
            {['December 2023', 'November 2023', 'October 2023'].map((month, idx) => (
              <button key={idx} className="rounded border border-stroke bg-gray-50 py-2 px-4 text-sm hover:bg-white hover:shadow-md dark:border-strokedark dark:bg-boxdark dark:hover:bg-meta-4">
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
