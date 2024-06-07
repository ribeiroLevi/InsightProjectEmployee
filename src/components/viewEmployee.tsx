import { useState } from 'react';
import Modal from 'antd/es/modal/Modal';
import { NotebookTabs } from 'lucide-react';

interface EmployeePropsView {
  employee: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    employeeSince: string;
  };
}

export function ViewEmployee({ employee }: EmployeePropsView) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <NotebookTabs
        onClick={showModal}
        className="stroke-gray-400 cursor-pointer"
      />
      <Modal
        title={'id: ' + employee.id}
        open={open}
        centered
        onOk={closeModal}
      >
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-4xl font-bold ">{employee.name}</h1>
            <p className="text-2xl font-light">{employee.role}</p>
          </div>
          <div className="flex flex-row gap-11">
            <div>
              <p>Employee since</p>
              <p className="text-3xl">{employee.employeeSince.slice(4, 16)}</p>
            </div>
            <div>
              <p>Department</p>
              <p className="text-3xl">{employee.department}</p>
            </div>
          </div>
          <div className="flex flex-row gap-11 mb-3">
            <div>
              <p>Email</p>
              <p className="text-3xl">{employee.email}</p>
            </div>
            <div>
              <p>Status</p>
              <p className="text-3xl">{employee.status}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
