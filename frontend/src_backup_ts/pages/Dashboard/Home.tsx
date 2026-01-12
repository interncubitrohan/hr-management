import HRMetrics from "../../components/hr/dashboard/HRMetrics";
import EmployeeDemographics from "../../components/hr/dashboard/EmployeeDemographics";
import RecentActivities from "../../components/hr/dashboard/RecentActivities";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="School Admin Dashboard | TailAdmin"
        description="School Administration Dashboard for managing teachers, staff, and school activities."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <HRMetrics />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentActivities />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <EmployeeDemographics />
        </div>
      </div>
    </>
  );
}
