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

    const regex = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    );

    if (
      formData.name === '' ||
      formData.role === '' ||
      formData.department === '' ||
      formData.status === '' ||
      formData.employeeSince === ''
    ) {
      alert('NOME VAZIO');
      console.log('input empty');
      return;
    }

    if (!regex.test(formData.email.trim()) || formData.email === '') {
      alert('EMAIL INVÁLIDO');
      console.log('input empty', regex.test(formData.email), formData.email);
      return;
    }

    onEmployeeUpdated(formData);
    setFormData({
      id: '',
      name: '',
      email: '',
      role: '',
      department: '',
      status: '',
      employeeSince: '',
    });

    console.log(employee.id, formData);
    setOpen(false);
    location.reload();
  };

  return (
    <div>
      <div className="flex flex-row" onClick={showModal}>
        <Pencil className="mr-2" />
        <p>Edit Employee</p>
      </div>
      <Modal
        title="Edit Informations"
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
          <div className="md:flex md:flex-rol grid grid-cols-2 w-full gap-11 md:gap-6 items-end sm:item-end">
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
