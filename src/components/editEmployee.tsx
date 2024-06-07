import { Modal, Cascader, DatePicker } from 'antd';
import { Pencil } from 'lucide-react';
import { EmployeeFormData, options } from './newEmployee';
import { EmployeeProps } from './employee';
import { useState, ChangeEvent, FormEvent } from 'react';
import dayjs from 'dayjs';

interface EditEmployeeProps extends EmployeeProps {
  onEmployeeUpdated: (updatedData: EmployeeFormData) => void;
}

export function EditEmployee({
  employee,
  onEmployeeUpdated,
}: EditEmployeeProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    status: employee.status,
    employeeSince: employee.employeeSince,
  });

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

  const handleSaveEmployee = (event: FormEvent) => {
    event.preventDefault();
    if (formData.name === '') {
      console.log('input empty');
      return;
    }

    onEmployeeUpdated(formData);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row" onClick={showModal}>
        <Pencil className="mr-2" />
        <p>Edit Employee</p>
      </div>
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
