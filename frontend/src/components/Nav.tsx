import { useAuth } from "./AuthProvider";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { NavLink, useNavigate } from 'react-router-dom';
import { MouseEventHandler } from "react";


export const Nav = () => {

    const { user } = useAuth(); 
    const navigate = useNavigate(); 

    const handleSignOut = async () => {
        try { 
            await signOut(auth); 
            navigate('/signin')
            console.log("signed out")
        }
        catch (err:any) {
            console.error("Error signing out", err)
        }
    } 

    const navigation = [
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'Budget', to:'/budget' },
        { name: 'Expense', to: '/expense' },
        { name: 'Net Worth', to: '/networth' },
      ]

    type UserNavigationItem = {
        name: string;
        href?: string;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    };

    const userNavigation:UserNavigationItem[] = [

        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', onClick: handleSignOut },
        
    ]


    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
      }


    return (
        <>            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto px-5 sm:px-6 lg:px-8"> 
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex justify-between items-center">
                                <img
                                    alt="Budget-Ting"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="size-8"
                                />
                                <h1 className="text-2xl font-semibold ml-6"> Budget-Ting </h1> 
                                <div className="hidden md:block mx-10">
                                <div className="flex space-x-4">
                                     
                                    {navigation.map((item) => (
                                        <NavLink
                                        key={item.name}  
                                        to={item.to}
                                        className={({ isActive }) =>
                                            isActive ? 'text-white bg-indigo-500 rounded-lg p-2' : 'rounded-md p-2 text-gray-300 hover:bg-gray-700'
                                          }


                                    >
                                        {item.name}
                                    </NavLink>
                                    ))} 
                                </div>
                           
                        </div>
                    </div>
                     {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 inline-block text-left">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center gap-x-1.5 rounded-md bg-white-800 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        { user?.first_name } { user?.last_name } <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                            <button
                                onClick={item.onClick}
                                className="w-full items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                                {item.name}
                            </button>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
        </Disclosure> 
           
     </>

    )
}