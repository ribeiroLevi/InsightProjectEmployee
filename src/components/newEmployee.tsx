import { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, DatePicker, Cascader } from 'antd';
import dayjs from 'dayjs';

interface NewEmployeeProps {
  onNewEmployeeCreated: (
    name: string,
    email: string,
    role: string,
    department: string,
    status: string,
    employeeSince: string
  ) => void;
}

export interface Option {
  value: string;
  label: string;
}

export const options: Option[] = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
];

export interface EmployeeFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  employeeSince: string;
}

export function NewEmployee({ onNewEmployeeCreated }: NewEmployeeProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    id: '',
    name: '',
    email: '',
    role: '',
    department: '',
    status: '',
    employeeSince: '',
  });
  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSaveEmployee = (event: FormEvent) => {
    event.preventDefault();

    const { name, email, role, department, status, employeeSince } = formData;

    if (formData.name === '') {
      console.log('input empty');
      return;
    }

    onNewEmployeeCreated(name, email, role, department, status, employeeSince);
    setFormData({
      id: '',
      name: '',
      email: '',
      role: '',
      department: '',
      status: '',
      employeeSince: '',
    });

    setOpen(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (dateString: string) => {
    console.log('Selected Date:', dateString);
    setFormData({
      ...formData,
      employeeSince: dateString.toString(),
    });
  };

  const handleStatusChange = (value: string[]) => {
    setFormData({
      ...formData,
      status: value[0],
    });
  };

  return (
    <div>
      <button
        className="bg-green-500 w-[140px] h-11 rounded-md text-white font-bold"
        onClick={showModal}
      >
        New Employees
      </button>
      <Modal
        title="New Employee"
        open={open}
        onCancel={closeModal}
        centered
        width={1000}
        onOk={handleSaveEmployee}
      >
        <form action="" className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="First and Last name"
            className="w-full h-10 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
            onChange={handleContentChanged}
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full h-10 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
            onChange={handleContentChanged}
          />
          <div className="flex gap-11">
            <input
              type="text"
              name="role"
              value={formData.role}
              placeholder="Role"
              className="w-full h-10 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
              onChange={handleContentChanged}
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              placeholder="Department"
              className="w-full h-10 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
              onChange={handleContentChanged}
            />
          </div>
          <div className="flex w-1/2  justify-between">
            <div className="flex flex-col">
              <p>Employee Since</p>
              <DatePicker
                format={'DD/MM/YYYY'}
                size="large"
                onChange={handleDateChange}
                maxDate={dayjs()}
                defaultOpenValue={dayjs()}
              />
            </div>
            <div className="flex flex-col mr-6">
              <p>Status</p>
              <Cascader
                options={options}
                className="h-[100%]"
                size="large"
                placeholder="Active"
                onChange={handleStatusChange}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
