import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuth } from '../context/Auth';
import { User } from '../types/auth.types';
import { LogOut, User as UserIcon } from 'lucide-react';

interface UserDropdownProps {
  user: User;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { logout } = useAuth();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
        <UserIcon className="w-5 h-5" />
        <span className="text-sm font-medium">
          {user.names} {user.lastnames}
        </span>
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } group flex w-full items-center px-4 py-2 text-sm text-gray-700 gap-2`}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};