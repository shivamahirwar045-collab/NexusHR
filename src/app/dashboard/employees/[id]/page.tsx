import { initialEmployees } from "@/lib/mock-data/employees";
import { EmployeeProfileView } from "@/components/employee/EmployeeProfileView";

export function generateStaticParams() {
  return initialEmployees.map((emp) => ({
    id: emp.id,
  }));
}

export default function EmployeePage() {
  return <EmployeeProfileView />;
}
