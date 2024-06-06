import { EllipsisVertical } from 'lucide-react';

interface EmployeeProps {
  employee: {
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    employeeSince: string;
  };
}
export function Employee({ employee }: EmployeeProps) {
  return (
    <div className="mt-5">
      <div className="w-full  bg-opacity-45 rounded-lg border-2">
        <div className="flex flex-row justify-around items-center h-[80px] rounded-md">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-gray-500 rounded-full"></div>
            <div>
              <h3 className="text-2xl text-black font-semibold">
                {employee.name}
              </h3>
              <p className="text-green-600">{employee.status}</p>
            </div>
          </div>
          <div>
            <p className="opacity-60">Email</p>
            <p>{employee.email}</p>
          </div>
          <div>
            <p className="opacity-60">Role</p>
            <p>{employee.role}</p>
          </div>
          <div>
            <p className="opacity-60">Department</p>
            <p>{employee.department}</p>
          </div>
          <EllipsisVertical className="stroke-gray-600" />
        </div>
      </div>
    </div>
  );
}
