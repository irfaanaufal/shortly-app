import { Head } from '@inertiajs/react';
import { ArrowUpRight, Inbox, Moon, Search, Sun, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function PublicShortcuts({ owner, shortcuts = [] }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;

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

    const filteredShortcuts = useMemo(
        () =>
            shortcuts.filter((shortcut) => {
                const matchesSearch =
                    shortcut.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    (shortcut.description &&
                        shortcut.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()));
                return matchesSearch;
            }),
        [shortcuts, searchQuery],
    );

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-between bg-neutral-50 p-4 text-neutral-900 antialiased transition-colors duration-200 dark:bg-[#121212] dark:text-neutral-100 sm:p-8">
            {/* Top Right Buttons */}
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setShowSearch(!showSearch)}
                    className={`rounded-xl border p-2.5 transition-all ${
                        showSearch
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                    title="Cari Shortcut"
                >
                    <Search className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="rounded-xl border border-neutral-200 bg-white p-2.5 text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    {isDarkMode ? (
                        <Sun className="h-4 w-4 stroke-[2.5]" />
                    ) : (
                        <Moon className="h-4 w-4 stroke-[2.5]" />
                    )}
                </button>
            </div>

            <Head title={`Shortcuts - ${owner.name}`} />

            {/* Header Profile Area */}
            <header className="z-10 mt-12 w-full max-w-xl space-y-5 text-center sm:mt-16">
                <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-900 text-white shadow-md ring-4 ring-neutral-100 dark:border-neutral-800 dark:bg-white dark:text-neutral-900 dark:ring-neutral-900/40">
                    {owner.profile_photo_url ? (
                        <img
                            src={owner.profile_photo_url}
                            alt={owner.name}
                            className="h-full w-full rounded-2xl object-cover"
                        />
                    ) : (
                        <span className="text-2xl font-black tracking-wider">
                            {owner.name?.slice(0, 2).toUpperCase()}
                        </span>
                    )}
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-neutral-50 bg-green-500 dark:border-[#121212]"></span>
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                        {owner.name}
                    </h1>
                </div>
            </header>

            {/* Main Grid */}
            <main className="z-10 my-10 flex w-full max-w-xl flex-1 flex-col justify-start sm:my-14">
                {/* Search Bar */}
                {showSearch && (
                    <div className="animate-fadeIn mb-8 w-full">
                        <div className="relative flex items-center rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 shadow-sm transition-all focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:focus-within:border-white dark:focus-within:ring-white">
                            <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari pintasan..."
                                className="w-full border-none bg-transparent p-0 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:ring-0 dark:text-white dark:placeholder-neutral-500"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="rounded-lg p-1 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-200"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Shortcut Grid / Empty State */}
                {filteredShortcuts.length === 0 ? (
                    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-10 text-center dark:border-neutral-800 dark:bg-[#1e1e1e]">
                        <Inbox className="mx-auto h-12 w-12 text-neutral-400" />
                        <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                            {searchQuery
                                ? 'Pintasan tidak ditemukan'
                                : 'Direktori Pintasan Kosong'}
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-x-3.5 gap-y-6 sm:gap-6">
                        {filteredShortcuts.map((shortcut) => (
                            <a
                                key={shortcut.id}
                                href={shortcut.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex w-full min-w-0 flex-col items-center gap-2 text-center transition-all duration-200 active:scale-[0.96]"
                            >
                                <div
                                    className={`flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-tr ${shortcut.color} relative text-white shadow-sm transition-all group-hover:brightness-105`}
                                >
                                    <DynamicIcon
                                        name={shortcut.icon}
                                        className="h-7 w-7 stroke-[1.8] sm:h-8 sm:w-8"
                                    />
                                    <div className="absolute right-2.5 top-2.5 opacity-0 transition-opacity group-hover:opacity-100">
                                        <ArrowUpRight className="h-3 w-3 text-white/80" />
                                    </div>
                                </div>

                                <span className="line-clamp-2 w-full px-1 text-[10px] font-bold text-neutral-800 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white sm:text-xs">
                                    {shortcut.name}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </main>

            <footer className="z-10 mb-4 w-full max-w-xl text-center font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
                &copy; {new Date().getFullYear()} PT Sindang Asih Makmur &bull;
                All Rights Reserved
            </footer>
        </div>
    );
}
