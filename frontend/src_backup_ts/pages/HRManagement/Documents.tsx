import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import Select from "../../components/form/Select";

interface Document {
  id: number;
  name: string;
  category: string;
  size: string;
  type: "image" | "file";
  status: "Verified" | "Pending" | "Rejected";
  uploadDate: string;
  preview?: string;
}

const initialDocs: Document[] = [
  {
    id: 1,
    name: "PAN_Card.jpg",
    category: "PAN Card",
    size: "1.2 MB",
    type: "image",
    status: "Verified",
    uploadDate: "2024-01-15",
    preview: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Aadhar_Front.pdf",
    category: "Aadhar Card",
    size: "2.4 MB",
    type: "file",
    status: "Verified",
    uploadDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Bank_Passbook.jpg",
    category: "Bank Details",
    size: "1.8 MB",
    type: "image",
    status: "Pending",
    uploadDate: "2024-01-20",
    preview: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Salary_Slip_Dec.pdf",
    category: "Previous Salary Slip",
    size: "0.8 MB",
    type: "file",
    status: "Rejected",
    uploadDate: "2024-01-18",
  },
];

const documentTypes = [
  { value: "PAN Card", label: "PAN Card" },
  { value: "Bank Details", label: "Bank Details" },
  { value: "Aadhar Card", label: "Aadhar Card" },
  { value: "Previous Salary Slip", label: "Previous Salary Slip" },
  { value: "Relieving Letter", label: "Relieving Letter" },
  { value: "Other", label: "Other" },
];

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [selectedType, setSelectedType] = useState("PAN Card");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocs: Document[] = acceptedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      category: selectedType,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type.startsWith("image/") ? "image" : "file",
      status: "Pending", // New uploads start as Pending
      uploadDate: new Date().toISOString().split("T")[0],
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setDocs((prev) => [...newDocs, ...prev]);
  }, [selectedType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
  });

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      docs.forEach((doc) => {
        if (doc.preview && doc.preview.startsWith("blob:")) {
          URL.revokeObjectURL(doc.preview);
        }
      });
    };
  }, [docs]);

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "Verified":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "light";
    }
  };

  const getFileIcon = (type: string) => {
    if (type === "image") {
      return (
        <svg
          className="fill-current text-brand-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
        </svg>
      );
    }
    return (
      <svg
        className="fill-current text-gray-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" />
      </svg>
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Documents" />

      {/* Upload Section */}
      <div className="mb-6 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
          Upload New Document
        </h3>

        {/* Document Type Selector */}
        <div className="mb-4 max-w-md">
          <label className="mb-2.5 block text-black dark:text-white">
            Document Type
          </label>
          <Select
            options={documentTypes}
            onChange={(val) => setSelectedType(val)}
            className="bg-white dark:bg-boxdark"
            defaultValue={selectedType}
          />
        </div>

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 outline-none transition-colors ${isDragActive
            ? "border-brand-500 bg-brand-50/50 dark:border-brand-400 dark:bg-brand-900/10"
            : "border-gray-300 hover:border-brand-500 dark:border-form-strokedark dark:hover:border-brand-400"
            }`}
        >
          <input {...getInputProps()} />
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-brand-500 dark:bg-meta-4">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-black dark:text-white">
            <span className="text-brand-500">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Uploading as: <span className="font-semibold text-brand-500">{selectedType}</span>
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            My Documents ({docs.length})
          </h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col gap-4 rounded-lg border border-stroke bg-gray-50 p-4 transition hover:bg-gray-100 dark:border-strokedark dark:bg-meta-4/20 dark:hover:bg-meta-4/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* File Preview/Icon */}
                  <div className="relative h-14 w-14 min-w-[56px] overflow-hidden rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark sm:h-16 sm:w-16">
                    {doc.preview ? (
                      <img
                        src={doc.preview}
                        alt={doc.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        {getFileIcon(doc.type)}
                      </div>
                    )}
                  </div>

                  {/* File Details */}
                  <div>
                    <h4 className="font-medium text-black dark:text-white">
                      {doc.category}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {doc.size} • Uploaded on {doc.uploadDate}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <Badge color={getStatusColor(doc.status)}>{doc.status}</Badge>

                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-white">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.99981 8.78906C10.1245 8.78906 11.0361 7.87754 11.0361 6.75281C11.0361 5.62808 10.1245 4.71655 8.99981 4.71655C7.87508 4.71655 6.96356 5.62808 6.96356 6.75281C6.96356 7.87754 7.87508 8.78906 8.99981 8.78906Z" />
                        <path d="M8.99981 13.9997C12.3999 13.9997 15.352 12.0003 16.7143 8.99971C15.352 5.99908 12.3999 3.99971 8.99981 3.99971C5.59972 3.99971 2.64761 5.99908 1.28534 8.99971C2.64761 12.0003 5.59972 13.9997 8.99981 13.9997ZM8.99981 5.25283C9.82823 5.25283 10.4998 5.92441 10.4998 6.75283C10.4998 7.58125 9.82823 8.25283 8.99981 8.25283C8.17138 8.25283 7.49981 7.58125 7.49981 6.75283C7.49981 5.92441 8.17138 5.25283 8.99981 5.25283Z" />
                      </svg>
                    </button>
                    <button
                      className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-400"
                      onClick={() => {
                        const newDocs = docs.filter(d => d.id !== doc.id);
                        setDocs(newDocs);
                      }}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.75 3.5H10.75V2.75C10.75 2.0625 10.1875 1.5 9.5 1.5H8.5C7.8125 1.5 7.25 2.0625 7.25 2.75V3.5H4.25C3.8125 3.5 3.5 3.8125 3.5 4.25V5H14.5V4.25C14.5 3.8125 14.1875 3.5 13.75 3.5ZM5 15.5C5 16.3125 5.6875 17 6.5 17H11.5C12.3125 17 13 16.3125 13 15.5V6H5V15.5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {docs.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
