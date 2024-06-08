import './main.css';
import Logo from './assets/lookioLogo.svg';
import { Search } from 'lucide-react';
import { Employee } from './components/employee';
import { EmployeeFormData, NewEmployee } from './components/newEmployee';
import { useState, ChangeEvent } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  employeeSince: string;
}

export function App() {
  const [employee, setEmployee] = useState<Employee[]>(() => {
    const employeesOnStorage = localStorage.getItem('employees');

    if (employeesOnStorage) {
      return JSON.parse(employeesOnStorage);
    }
    return [];
  });
  const [search, setSearch] = useState('');

  const onNewEmployeeCreated = (
    name: string,
    email: string,
    role: string,
    department: string,
    status: string,
    employeeSince: string
  ) => {
    console.log('active');
    const newEmployee = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      department,
      status,
      employeeSince,
    };

    const employeesArray = [newEmployee, ...employee];

    setEmployee(employeesArray);
    localStorage.setItem('employees', JSON.stringify(employeesArray));

    console.log(employeesArray);
  };

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredEmployees = employee.filter((employee) => {
    if (search !== '') {
      const nameFilter = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const departmentFilter = employee.department
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      const roleFilter = employee.role
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      const emailFilter = employee.email
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return nameFilter || departmentFilter || roleFilter || emailFilter;
    } else {
      return true;
    }
  });

  function onEmployeeRemove(id: string) {
    const employeesArray = employee.filter((note) => {
      return note.id !== id;
    });
    setEmployee(employeesArray);
    localStorage.setItem('employees', JSON.stringify(employeesArray));
  }

  function onEmployeeUpdate(updatedEmployee: EmployeeFormData) {
    const updatedEmployees = employee.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployee(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  }

  return (
    <div>
      <nav className="w-full border-2 flex justify-center">
        <div className="w-[85%] h-[54px] flex justify-between items-center">
          <img src={Logo} alt="" />
        </div>
      </nav>
      <div className="flex w-full justify-center">
        <form action="" className="flex mt-10 w-[85%] items-center">
          <Search className="stroke-gray-400 mr-2" />
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="w-1/2 h-10 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
          />
        </form>
      </div>
      <div className="flex w-full justify-center mt-11">
        <div className="flex w-[85%] justify-between">
          <h1 className="text-4xl">Members</h1>
          <NewEmployee onNewEmployeeCreated={onNewEmployeeCreated} />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[85%] mt-4 rounded-md">
          <div>
            {filteredEmployees.map((employee) => {
              return (
                <div>
                  <Employee
                    key={employee.id}
                    employee={employee}
                    onEmployeeRemove={onEmployeeRemove}
                    onEmployeeUpdated={onEmployeeUpdate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
