/* eslint-disable */
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileImage from '../components/profileImage';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: '단어장', href: '/publicVoca' },
    { name: '일정', href: '/calendar' },
];

const userMenuItems = [
    { name: '마이페이지', href: '/profile' },
    { name: '로그아웃', href: '/logout' },
];

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Disclosure
                as="nav"
                className={cn(
                    'sticky top-0 z-40 bg-white transition-shadow duration-200',
                    scrolled ? 'shadow-md' : 'border-b border-slate-100 shadow-sm'
                )}
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo + desktop nav */}
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="flex items-center gap-2.5 group"
                                    >
                                        <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                                            <span className="text-white font-bold text-sm">J</span>
                                        </div>
                                        <span className="font-bold text-slate-900 text-lg tracking-tight">JVT</span>
                                    </button>

                                    <div className="hidden md:flex items-center gap-1">
                                        {navLinks.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => navigate(item.href)}
                                                className={cn(
                                                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                                                    isActive(item.href)
                                                        ? 'bg-indigo-50 text-indigo-700'
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                )}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop right */}
                                <div className="hidden md:flex items-center gap-3">
                                    {user && (
                                        <span className="text-sm text-slate-400 font-medium">
                                            {user.lastname}{user.firstname}님
                                        </span>
                                    )}
                                    <Menu as="div" className="relative">
                                        <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <ProfileImage width={9} height={9} />
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
                                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-slate-200 focus:outline-none overflow-hidden">
                                                <div className="px-4 py-3 border-b border-slate-100">
                                                    <p className="text-xs text-slate-400">로그인 계정</p>
                                                    <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">{user?.username}</p>
                                                </div>
                                                {userMenuItems.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => navigate(item.href)}
                                                                className={cn(
                                                                    'flex w-full items-center px-4 py-2.5 text-sm text-slate-700 transition-colors',
                                                                    active ? 'bg-slate-50' : ''
                                                                )}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>

                                {/* Mobile hamburger */}
                                <div className="flex md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none">
                                        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu */}
                        <Disclosure.Panel className="md:hidden border-t border-slate-100 bg-white animate-fade-in">
                            <div className="px-4 pt-2 pb-3 space-y-1">
                                {navLinks.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="button"
                                        onClick={() => navigate(item.href)}
                                        className={cn(
                                            'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                            isActive(item.href)
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="px-4 pt-2 pb-4 border-t border-slate-100 space-y-1">
                                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                                    <ProfileImage width={10} height={10} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{user?.lastname}{user?.firstname}</p>
                                        <p className="text-xs text-slate-400 truncate">{user?.username}</p>
                                    </div>
                                </div>
                                {userMenuItems.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="button"
                                        onClick={() => navigate(item.href)}
                                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
