import './main.css';
import Logo from './assets/lookioLogo.svg';
import { Menu } from 'lucide-react';
import { Search } from 'lucide-react';
import { Employee } from './components/employee';
import { NewEmployee } from './components/newEmployee';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: boolean;
  employeeSince: Date;
}

export function App() {
  return (
    <div>
      <nav className="w-full border-2 flex justify-center">
        <div className="w-[85%] h-[54px] flex justify-between items-center">
          <img src={Logo} alt="" />
          <Menu />
        </div>
      </nav>
      <div className="flex w-full justify-center">
        <form action="" className="flex mt-10 w-[85%] items-center">
          <Search className="stroke-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 h-10 bg-gray-400 opacity-40 border-2 rounded-md indent-5 placeholder:text-black placeholder:indent-5"
          />
        </form>
      </div>
      <div className="flex w-full justify-center mt-11">
        <div className="flex w-[85%] justify-between">
          <h1 className="text-4xl">Members</h1>
          <NewEmployee />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[85%] mt-4 rounded-md">
          <div>
            <Employee />
            <Employee />
          </div>
        </div>
      </div>
    </div>
  );
}
