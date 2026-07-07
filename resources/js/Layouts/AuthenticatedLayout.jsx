import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
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

            <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-neutral-50 dark:bg-[#121212] transition-colors duration-200">
            <nav className="mx-auto w-full max-w-full flex h-14 items-center justify-between rounded-full bg-white border border-neutral-200 px-4 sm:px-6 shadow-sm dark:bg-[#1e1e1e] dark:border-neutral-800 transition-colors duration-200">

                        <div className="flex items-center gap-5">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center justify-center transition hover:scale-105">
                                    <ApplicationLogo className="h-7 w-auto object-contain" />
                                </Link>
                            </div>

                            <div className="hidden sm:block h-5 w-px bg-neutral-200 dark:bg-neutral-800"></div>

                            <div className="hidden sm:flex items-center gap-4">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                {user.role_name === 'superadmin' && (
                                    <NavLink
                                        href={route('admin.systems.index')}
                                        active={route().current('admin.systems.*')}
                                    >
                                        Kelola Sistem
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-5">
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
                                                {user.profile_photo_url ? (
                                                    <img
                                                        src={user.profile_photo_url}
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
                                        <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">Masuk sebagai</p>
                                            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">{user.name}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                            <Icons.User className="w-3.5 h-3.5" /> Pengaturan Profil
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 w-full text-left">
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
                </nav>
            </div>

            {showingNavigationDropdown && (
                <div className="sm:hidden mt-2 mx-4 border border-neutral-200 rounded-2xl bg-white shadow-sm overflow-hidden dark:bg-[#1e1e1e] dark:border-neutral-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {user.role_name === 'superadmin' && (
                            <ResponsiveNavLink
                                href={route('admin.systems.index')}
                                active={route().current('admin.systems.*')}
                            >
                                Kelola Sistem
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-neutral-100 px-4 py-3 space-y-1 bg-neutral-50 dark:border-neutral-800 dark:bg-[#1e1e1e]/50">
                        <div className="flex items-center gap-3 mb-3">
                            {user.profile_photo_url ? (
                                <img
                                    src={user.profile_photo_url}
                                    alt={user.name}
                                    className="w-8 h-8 rounded object-cover shrink-0"
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-black dark:bg-white dark:text-neutral-900">
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.email}</p>
                            </div>
                        </div>
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                    </div>
                </div>
            )}

            {children}
        </div>
    );
}