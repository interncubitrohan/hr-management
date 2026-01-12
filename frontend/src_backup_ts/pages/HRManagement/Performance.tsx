import PageBreadCrumb from "../../components/common/PageBreadCrumb";

interface Review {
  id: number;
  reviewer: string;
  role: string;
  date: string;
  rating: number;
  feedback: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    reviewer: "Dr. Sarah Connor",
    role: "Principal",
    date: "2023-12-28",
    rating: 5,
    feedback: "Excellent classroom management during the Annual Science Fair. Students were highly engaged.",
  },
  {
    id: 2,
    reviewer: "Mr. Kyle Reese",
    role: "HOD - Science Dept",
    date: "2023-10-15",
    rating: 4,
    feedback: "Great lesson planning for Grade 10 Physics. Needs to incorporate more practical lab sessions.",
  },
  {
    id: 3,
    reviewer: "Mrs. Jane Smith",
    role: "Senior Coordinator",
    date: "2023-06-30",
    rating: 5,
    feedback: "Outstanding contribution to the curriculum development committee.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? "fill-warning text-warning" : "fill-gray-300 text-gray-300"
            }`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Performance() {
  const averageRating = 4.7;

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadCrumb pageTitle="Performance Tracking" />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-2 text-lg font-medium text-black dark:text-white">Average Rating</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-brand-500">{averageRating}</span>
            <span className="mb-1 text-sm text-gray-500">/ 5.0</span>
          </div>
          <div className="mt-2">
            <StarRating rating={5} />
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-2 text-lg font-medium text-black dark:text-white">Reviews Received</h3>
          <span className="text-3xl font-bold text-black dark:text-white">12</span>
          <p className="mt-2 text-sm text-success-500">+2 from last quarter</p>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-2 text-lg font-medium text-black dark:text-white">Annual Appraisal</h3>
          <span className="text-2xl font-bold text-black dark:text-white">March 2024</span>
          <p className="mt-2 text-sm text-gray-500">Annual Teacher Evaluation</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Performance Reviews
          </h3>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {mockReviews.map(review => (
            <div key={review.id} className="border-b border-stroke last:border-0 pb-6 last:pb-0 dark:border-strokedark">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-black dark:text-white">{review.reviewer}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{review.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
