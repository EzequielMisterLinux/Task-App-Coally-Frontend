import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuth } from '../context/Auth';
import type { User } from '../types/auth.types';
import { LogOut, User as UserIcon, Mail, UserCircle } from 'lucide-react';

interface UserDropdownProps {
  user: User;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="btn btn-ghost rounded-full hover:bg-base-200 flex items-center gap-2 px-2 focus:outline-none">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {user.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${user.profileImage}`}
                  alt={`${user.names}'s profile`}
                  className="object-cover"
                />
              ) : (
                <UserIcon className="w-full h-full p-1 text-primary" />
              )}
            </div>
          </div>
          <span className="hidden md:block text-sm font-medium">
            {user.names}
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-base-200 bg-base-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>

            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleModal}
                    className={`${
                      active ? 'bg-primary text-primary-content' : 'text-base-content'
                    } flex items-center w-full px-4 py-2 gap-2 text-sm`}
                  >
                    <UserCircle className="w-4 h-4" />
                    View Profile
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-error text-error-content' : 'text-base-content'
                    } flex items-center w-full px-4 py-2 gap-2 text-sm`}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>


      <div className={`modal modal-bottom sm:modal-middle ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box relative bg-base-100">
          <button
            onClick={toggleModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.profileImage ? (
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${user.profileImage}`}
                    alt={`${user.names}'s profile`}
                    className="object-cover"
                  />
                ) : (
                  <UserIcon className="w-full h-full p-4 text-primary" />
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-base-content">
              {user.names} {user.lastnames}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <UserIcon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-base-content/60">Full Name</p>
                <p className="text-sm font-medium">{user.names} {user.lastnames}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-base-content/60">Email Address</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
        <div className="modal-backdrop bg-black/50" onClick={toggleModal}>
        </div>
      </div>
    </>
  );
};