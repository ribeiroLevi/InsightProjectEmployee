import { EllipsisVertical, Trash2, User } from 'lucide-react';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { ViewEmployee } from './viewEmployee';
import { EditEmployee } from './editEmployee';
import { EmployeeFormData } from './newEmployee';
export interface EmployeeProps {
  employee: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    employeeSince: string;
  };
  onEmployeeRemove?: (id: string) => void;
  onEmployeeUpdated: (updatedData: EmployeeFormData) => void;
}

export function Employee({
  employee,
  onEmployeeRemove,
  onEmployeeUpdated,
}: EmployeeProps) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '',
      icon: (
        <EditEmployee
          employee={employee}
          onEmployeeRemove={onEmployeeRemove}
          onEmployeeUpdated={onEmployeeUpdated}
        />
      ),
    },
    {
      key: '2',
      danger: true,
      label: 'Remove Employee',
      icon: <Trash2 />,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == '1') {
      <EditEmployee
        employee={employee}
        onEmployeeRemove={onEmployeeRemove}
        onEmployeeUpdated={onEmployeeUpdated}
      />;
    } else {
      onEmployeeRemove && onEmployeeRemove(employee.id);
    }
  };

  return (
    <div className="mt-3">
      <div className="md:w-full bg-opacity-45 rounded-lg border-2 flex flex-row justify-around items-center md:px-0 px-3">
        <ViewEmployee employee={employee} />
        <div className="md:grid-cols-4 md:gap-3 grid-cols-2 sm:grid-cols-3 w-5/6 grid items-center h-full py-2 rounded-md flex-wrap">
          <div className="grid gap-8">
            <div className="flex flex-row gap-3 items-center w-full">
              <div className="w-[60px] h-[60px] border-gray-200 border-2 rounded-full">
                <User className="size-full rounded-full" />
              </div>
              <div>
                <h3 className="text-2xl text-black font-semibold w-full">
                  {employee.name}
                </h3>
                <p
                  className={
                    employee.status == 'Active'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {employee.status}
                </p>
              </div>
            </div>
          </div>
          <div className=" hidden md:block">
            <th className="opacity-60">Email</th>
            <p>{employee.email}</p>
          </div>
          <div>
            <th className="opacity-60">Role</th>
            <p>{employee.role}</p>
          </div>
          <div className="hidden sm:block">
            <th className="opacity-60 ">Department</th>
            <p>{employee.department}</p>
          </div>
        </div>
        <Dropdown
          menu={{ items, onClick }}
          placement="bottomRight"
          className="font-bold"
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()} className="w-2">
            <Space>
              <EllipsisVertical className="stroke-gray-600 cursor-pointer " />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
