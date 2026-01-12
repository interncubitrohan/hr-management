import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import InputField from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import FileInput from "../../components/form/input/FileInput";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddEmployee() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Track touched fields for validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",

    // Employment Details
    employeeId: "",
    department: "",
    position: "",
    hireDate: "",
    reportingTo: "",

    // Documents
    resume: null as File | null,
    idProof: null as File | null,
    photo: null as File | null,
  });

  const tabs = ["Personal Info", "Employment", "Documents"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files![0],
      }));
    }
  };



  const isFieldInvalid = (field: keyof typeof formData) => {
    // Basic validation: field is required and empty
    // Note: Documents are optional in this basic check, adjust as needed
    const optionalFields = ["address", "reportingTo", "dob", "resume", "idProof", "photo"];
    if (optionalFields.includes(field)) return false;

    return touched[field] && !formData[field];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    navigate("/hr/employees");
  };

  const departmentOptions = [
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Operations", label: "Operations" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Add Employee" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Employee Information
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6.5">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex mb-6 border-b border-stroke dark:border-strokedark">
              {tabs.map((tab, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      "py-2 px-4 text-sm font-medium focus:outline-none",
                      selected
                        ? "border-b-2 border-brand-500 text-brand-500"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-2">
              {/* Personal Info Tab */}
              <Tab.Panel className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">
                      First Name <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={isFieldInvalid("firstName")}
                    //   onBlur={() => handleBlur("firstName")} // InputField doesn't expose onBlur, adding directly or via wrapper would be better but keeping it simple for now or using onChange to trigger tracked if needed. 
                    //   Ideally InputField should accept onBlur.
                    //   Workaround: tracking touch on change is aggressive. 
                    //   Let's check if InputField passes through other props? Yes, standard props are not passed in InputField implementation fully, checking InputField definition again...
                    //   Wait, InputField definition is: const Input: FC<InputProps> = ... 
                    //   It does NOT spread ...props. It only accepts specific props. 
                    //   So onBlur won't work unless I updated InputField too or just rely on "error" prop logic controlled by submit or just "empty && touched" logic if I could.
                    //   Since I can't pass onBlur, I will just show error if empty for now without onBlur tracking, or I'll implement a stricter validation on "Next" button click.
                    //   Let's stick to the request: "Visual validation only".
                    //   Actually, let's enable onBlur in InputField later if needed, but for now I'll just use the "error" prop based on simple logic (e.g. always show if empty? No that's annoying).
                    //   Let's just pass `error={!formData.firstName && touched.firstName}` and since I can't pass onBlur, I will set touched on Change as well? No, that shows error while typing.
                    //   I will just assume the user wants visual feedback. The InputField component has an `error` prop. 
                    //   I'll set `error` based on a "submitted" state or if I can add onBlur.
                    //   Let's update InputField to accept onBlur? No, strictly following plan. Plan said "Implement a simple touched state".
                    //   I will wrap the onChange to set touched = true? No, that's immediate error.
                    //   I'll add a onFocus/onBlur if InputField supports... it DOES NOT support onBlur in the props interface.
                    //   Okay, I will just omit onBlur for now and rely on "Next" button validation to set "touched" for all fields in current tab.
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">
                      Last Name <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={isFieldInvalid("lastName")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={isFieldInvalid("email")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      Phone <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={isFieldInvalid("phone")}
                    />
                  </div>
                </div>
              </Tab.Panel>

              {/* Employment Tab */}
              <Tab.Panel className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="employeeId">
                      Employee ID <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="text"
                      name="employeeId"
                      id="employeeId"
                      placeholder="e.g. EMP-001"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      error={isFieldInvalid("employeeId")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">
                      Department <span className="text-error-500">*</span>
                    </Label>
                    <Select
                      options={departmentOptions}
                      placeholder="Select Department"
                      onChange={(val) => handleSelectChange("department", val)}
                      className={isFieldInvalid("department") ? "border-error-500 focus:border-error-500" : ""}
                    // Select component doesn't have an error prop, so passing generic className might help if it appends.
                    // Looking at Select.tsx: `... ${className}` is at the end. Good.
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">
                      Position <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="text"
                      name="position"
                      id="position"
                      placeholder="e.g. Software Engineer"
                      value={formData.position}
                      onChange={handleInputChange}
                      error={isFieldInvalid("position")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hireDate">
                      Hire Date <span className="text-error-500">*</span>
                    </Label>
                    <InputField
                      type="date"
                      name="hireDate"
                      id="hireDate"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                      error={isFieldInvalid("hireDate")}
                    />
                  </div>
                </div>
              </Tab.Panel>

              {/* Documents Tab */}
              <Tab.Panel className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="resume">Resume (PDF, DOC, DOCX)</Label>
                    <FileInput
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="idProof">ID Proof (PDF, JPG, PNG)</Label>
                    <FileInput
                      name="idProof"
                      id="idProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="photo">Profile Photo (JPG, PNG)</Label>
                    <FileInput
                      name="photo"
                      id="photo"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (activeTab > 0) {
                  setActiveTab(activeTab - 1);
                } else {
                  navigate("/hr/employees");
                }
              }}
              className="flex items-center gap-2 rounded border border-stroke bg-gray-100 py-2 px-4.5 font-medium text-black hover:bg-opacity-90 dark:border-strokedark dark:bg-meta-4 dark:text-white"
            >
              {activeTab === 0 ? "Cancel" : "Back"}
            </button>

            <div className="flex gap-2">
              {activeTab < tabs.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    // Mark all fields in validation as touched when moving next
                    // Simple logic: just mark everything touched to trigger errors if empty
                    const allKeys = Object.keys(formData);
                    const newTouched = allKeys.reduce((acc, key) => {
                      acc[key] = true;
                      return acc;
                    }, {} as Record<string, boolean>);
                    setTouched(prev => ({ ...prev, ...newTouched }));

                    // In a real app we'd block navigation if invalid, but request was "visual validation only"
                    setActiveTab(activeTab + 1);
                  }}
                  className="flex items-center gap-2 rounded bg-brand-500 py-2 px-4.5 font-medium text-white hover:bg-opacity-90"
                >
                  Next
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded bg-brand-500 py-2 px-4.5 font-medium text-white hover:bg-opacity-90"
                >
                  Submit
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
