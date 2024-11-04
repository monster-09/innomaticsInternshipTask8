import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-orange-700' : '';
  };

  return (
    <nav className="bg-orange-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Student Management Portal
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-white ${isActive('/')}`}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>

            <Link
              to="/students"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-white ${isActive('/students')}`}
            >
              <Users className="h-5 w-5 mr-2" />
              Students
            </Link>

            <Link
              to="/new"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-white ${isActive('/new')}`}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Student
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}