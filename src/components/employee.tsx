import { EllipsisVertical, Trash2 } from 'lucide-react';
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
      label: 'Edit Employee',
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
      <div className="w-full bg-opacity-45 rounded-lg border-2 flex flex-row justify-around items-center">
        <ViewEmployee employee={employee} />
        <div className="w-5/6 grid grid-cols-4 items-center h-[80px] rounded-md">
          <div className="grid gap-8">
            <div className="grid grid-cols-2 items-center w-36">
              <div className="w-[60px] h-[60px] bg-gray-500 rounded-full"></div>
              <div>
                <h3 className="text-2xl text-black font-semibold w-36">
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
          <div>
            <th className="opacity-60">Email</th>
            <p>{employee.email}</p>
          </div>
          <div>
            <th className="opacity-60">Role</th>
            <p>{employee.role}</p>
          </div>
          <div>
            <th className="opacity-60">Department</th>
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
              <EllipsisVertical className="stroke-gray-600 cursor-pointer" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
