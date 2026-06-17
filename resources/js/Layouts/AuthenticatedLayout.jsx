import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, storage_url } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 antialiased transition-colors duration-200">

            <nav className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur dark:border-neutral-800/80 dark:bg-[#1e1e1e]/90 transition-colors duration-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">

                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="focus:outline-none">
                                    <ApplicationLogo className="block h-7 w-auto fill-current text-neutral-900 dark:text-neutral-100" />
                                </Link>
                            </div>

                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-xs font-bold uppercase tracking-wider border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-2">
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="p-2 rounded-xl border border-neutral-200/60 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#121212] dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                                {isDarkMode ? <Icons.Sun className="w-4 h-4 stroke-[2.5]" /> : <Icons.Moon className="w-4 h-4 stroke-[2.5]" />}
                            </button>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-xl">
                                            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/60 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-[#121212] dark:text-neutral-300">
                                                {user.profile_photo_path ? (
                                                    <img
                                                        src={`${storage_url}/${user.profile_photo_path}`}
                                                        alt={user.name}
                                                        className="w-5 h-5 rounded object-cover shrink-0"
                                                    />
                                                ) : (
                                                    <span className="w-5 h-5 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[10px] font-black shrink-0">
                                                        {user.name?.slice(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                                {user.name}
                                                <Icons.ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="48" contentClasses="py-1 bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                            <Icons.User className="w-3.5 h-3.5" /> Pengaturan Profil
                                        </Dropdown.Link>
                                        <div className="border-t border-neutral-100 dark:border-neutral-800 my-1"></div>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full text-left">
                                            <Icons.LogOut className="w-3.5 h-3.5" /> Keluar Sistem
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden gap-2">
                            <button type="button" onClick={toggleTheme} className="p-2.5 rounded-xl text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                {isDarkMode ? <Icons.Sun className="w-4 h-4" /> : <Icons.Moon className="w-4 h-4" />}
                            </button>
                            <button onClick={() => setShowingNavigationDropdown((prev) => !prev)} className="inline-flex items-center justify-center rounded-xl p-2.5 text-neutral-400">
                                {showingNavigationDropdown ? <Icons.X className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {showingNavigationDropdown && (
                <div className="sm:hidden border-b border-neutral-200 dark:border-neutral-800">
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-neutral-200 pb-1 pt-4 dark:border-neutral-800">
                        <div className="flex items-center px-4">
                            {user.profile_photo_path ? (
                                <img
                                    src={`${storage_url}/${user.profile_photo_path}`}
                                    alt={user.name}
                                    className="w-10 h-10 rounded object-cover shrink-0"
                                />
                            ) : (
                                <span className="w-10 h-10 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-sm font-black shrink-0">
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </span>
                            )}
                            <div className="ms-3">
                                <div className="text-base font-medium text-neutral-900 dark:text-white">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Pengaturan Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Keluar Sistem
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            )}

            {children}
        </div>
    );
}