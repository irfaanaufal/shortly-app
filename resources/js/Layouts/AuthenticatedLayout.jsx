import { usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import useTheme from '@/Hooks/useTheme';

const ICON = 'h-[18px] w-[18px]';

export default function AuthenticatedLayout({
    children,
    title,
    subtitle,
    headerActions,
    searchQuery,
    setSearchQuery,
    searchPlaceholder,
}) {
    const isDashboard = usePage().url.split('?')[0] === '/dashboard';
    const { isDarkMode, toggleTheme } = useTheme();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const desktopSearchRef = useRef(null);
    const mobileSearchRef = useRef(null);
    const hasSearch =
        typeof searchQuery !== 'undefined' &&
        typeof setSearchQuery === 'function';

    useEffect(() => {
        if (!searchOpen) return;
        const isDesktop = window.innerWidth >= 640;
        const ref = isDesktop ? desktopSearchRef : mobileSearchRef;
        if (ref.current) ref.current.focus();
    }, [searchOpen]);

    const handleSearchToggle = () => {
        if (searchOpen && searchQuery) {
            setSearchQuery('');
        }
        setSearchOpen((p) => !p);
    };

    return (
        <div className="flex min-h-screen max-w-full items-center justify-center gap-4 overflow-x-hidden bg-[#e8e9eb] transition-colors duration-200 dark:bg-[#0a0a0a] md:p-4">
            <Sidebar
                mobileOpen={mobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-[#f5f5f7] transition-colors duration-200 dark:border-zinc-800/80 dark:bg-[#111111] md:h-[calc(100vh-2rem)] md:rounded-[32px] md:border md:border-gray-200 md:shadow-lg">
                <header className="z-20 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200/60 bg-[#f5f5f7]/90 px-4 backdrop-blur-md transition-colors duration-200 dark:border-zinc-800/60 dark:bg-[#111111]/90 md:h-[72px] md:border-none md:px-8">
                    {/* Left */}
                    <div
                        className={`items-center gap-3 ${searchOpen && hasSearch ? 'hidden sm:flex' : 'flex'}`}
                    >
                        {!isDashboard && (
                            <button
                                onClick={() => window.history.back()}
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-gray-500 transition active:scale-95 dark:text-zinc-400"
                                title="Kembali"
                            >
                                <svg
                                    className={ICON}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        )}
                        <div>
                            <h1 className="hidden text-base font-bold leading-tight tracking-tight text-gray-800 dark:text-zinc-100 md:block md:text-lg">
                                {title || 'Dashboard'}
                            </h1>
                            {subtitle && (
                                <p className="mt-0.5 hidden text-[10px] font-semibold tracking-wide text-gray-400 dark:text-zinc-500 md:block">
                                    {subtitle}
                                </p>
                            )}
                            <h1 className="block text-base font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:hidden">
                                {title || 'Dashboard'}
                            </h1>
                        </div>
                    </div>

                    {/* Mobile Full-width Search */}
                    {searchOpen && hasSearch && (
                        <div className="mx-1 flex flex-1 items-center gap-2 sm:hidden">
                            <div className="relative flex-1">
                                <svg
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    ref={mobileSearchRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder={searchPlaceholder || 'Cari...'}
                                    className="h-9 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-9 text-xs text-gray-900 placeholder-gray-400 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                                    >
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                }}
                                className="shrink-0 px-1 text-xs font-bold text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                            >
                                Batal
                            </button>
                        </div>
                    )}

                    {/* Right */}
                    <div className="flex items-center gap-2 md:gap-2.5">
                        {headerActions && (
                            <div className="hidden items-center gap-2 md:flex">
                                {headerActions}
                            </div>
                        )}

                        {/* Search Icon */}
                        {hasSearch && (
                            <>
                                {/* Desktop: expand input inline */}
                                {searchOpen && (
                                    <div className="animate-fadeIn relative hidden items-center sm:flex">
                                        <svg
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <input
                                            ref={desktopSearchRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            placeholder={
                                                searchPlaceholder || 'Cari...'
                                            }
                                            className="h-9 w-48 rounded-xl border border-gray-200 bg-white pl-9 pr-8 text-xs text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 md:h-10 md:w-64"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() =>
                                                    setSearchQuery('')
                                                }
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                                            >
                                                <svg
                                                    className="h-3.5 w-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Search toggle button */}
                                <button
                                    onClick={handleSearchToggle}
                                    title="Cari"
                                    className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border shadow-sm transition ${
                                        searchOpen
                                            ? 'border-neutral-300 bg-neutral-100 text-neutral-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-neutral-200'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    <svg
                                        className={ICON}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            title="Ganti Tema"
                            aria-label="Toggle theme"
                            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        >
                            {isDarkMode ? (
                                <svg
                                    className={ICON}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className={ICON}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 md:hidden"
                            aria-label="Buka menu"
                        >
                            <svg
                                className={ICON}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </header>

                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pb-6 md:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
