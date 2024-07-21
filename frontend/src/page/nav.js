import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileImage from '../components/profileImage'; // default import

const initNavigation = [
    { name: 'Main', href: '/', current: false },
    { name: '단어장', href: '/collections', current: false },
    { name: '일정', href: '/calendar', current: false },
    { name: '마이페이지', href: '/profile', current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/logout' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
function updateNavigation(path) {
    return initNavigation.map((item) => ({
        ...item,
        current:
            item.href === path ||
            (path.startsWith('/collections/') && item.href === '/collections'),
    }));
}
export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [navigation, setNavigation] = useState(initNavigation);
    const [currentPath, setCurrentPath] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const path = location.pathname;

        if (path.startsWith('/collections/')) {
            setCurrentPath('단어 보기');
        } else if (path === '/profile') {
            setCurrentPath('마이페이지');
        } else if (path === '/collections') {
            setCurrentPath('단어장');
        } else if (path === '/calendar') {
            setCurrentPath('일정');
        } else {
            setCurrentPath('Main');
        }

        setNavigation(updateNavigation(path));
    }, [location]);

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-green-300">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href="/nav">
                                                <img
                                                    className="h-12 w-12"
                                                    src="/image/logo.png"
                                                    alt="Your Company"
                                                />
                                            </a>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() =>
                                                            navigate(item.href)
                                                        }
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-green-800 text-white'
                                                                : 'text-black no-underline hover:bg-green-500 ',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={
                                                            item.current
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                    >
                                                        {item.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-white p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <ProfileImage></ProfileImage>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map(
                                                            (item) => (
                                                                <Menu.Item
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <button
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    item.href
                                                                                )
                                                                            }
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-100'
                                                                                    : '',
                                                                                'block w-full px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            )
                                                        )}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={() => navigate(item.href)}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-green-800 text-white'
                                                    : 'no-underline hover:bg-green-400 hover:text-white text-black',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={
                                                item.current
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <ProfileImage></ProfileImage>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {user &&
                                                user.lastname &&
                                                user.firstname
                                                    ? user.lastname +
                                                      user.firstname
                                                    : '익명'}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user ? user.username : '익명'}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                onClick={() =>
                                                    navigate(item.href)
                                                }
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-green-400 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {currentPath}
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {/* Your content */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
