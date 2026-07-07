import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicIcon = ({ name, className }) => {
    const IconComponent = Icons[name] || Icons.Link2;
    return <IconComponent className={className} />;
};

export default function PublicShortcuts({ owner, shortcuts = [] }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Semua');

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

    const categories = ['Semua', ...new Set(shortcuts.map((s) => s.category).filter(Boolean))];

    const filteredShortcuts = shortcuts.filter(shortcut => {
        const matchesSearch = shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (shortcut.description && shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = activeCategory === 'Semua' || shortcut.category === activeCategory;
        return matchesSearch && matchesCategory;
    });


    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-between p-4 sm:p-8 relative antialiased transition-colors duration-200">

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setShowSearch(!showSearch)}
                    className={`p-2.5 rounded-xl border transition-all ${
                        showSearch 
                            ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-sm' 
                            : 'border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                    title="Cari Shortcut"
                >
                    <Icons.Search className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    {isDarkMode ? <Icons.Sun className="w-4 h-4 stroke-[2.5]" /> : <Icons.Moon className="w-4 h-4 stroke-[2.5]" />}
                </button>
            </div>

            <Head title={`Shortcuts - ${owner.name}`} />

            {/* Header Profile Area */}
            <header className="w-full max-w-xl text-center mt-12 sm:mt-16 space-y-5 z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md ring-4 ring-neutral-100 dark:ring-neutral-900/40 relative">
                    {owner.profile_photo_url ? (
                        <img
                            src={owner.profile_photo_url}
                            alt={owner.name}
                            className="w-full h-full rounded-2xl object-cover"
                        />
                    ) : (
                        <span className="text-2xl font-black tracking-wider">
                            {owner.name?.slice(0, 2).toUpperCase()}
                        </span>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-neutral-50 dark:border-[#121212] rounded-full"></span>
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        {owner.name}
                    </h1>
                </div>
            </header>

            {/* Main Grid */}
            <main className="w-full max-w-xl my-10 sm:my-14 z-10 flex-1 flex flex-col justify-start">
                
                {/* Search Bar */}
                {showSearch && (
                    <div className="w-full mb-8 animate-fadeIn">
                        <div className="relative flex items-center bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 shadow-sm focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white transition-all">
                            <Icons.Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mr-2 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari pintasan..."
                                className="w-full bg-transparent border-none outline-none text-sm p-0 focus:ring-0 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                                >
                                    <Icons.X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Category Tabs */}
                {categories.length > 1 && (
                    <div className="w-full mb-6 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    activeCategory === cat
                                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                        : 'bg-white dark:bg-[#1e1e1e] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {filteredShortcuts.length === 0 ? (
                    <div className="text-center p-10 bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4">
                        <Icons.Inbox className="w-12 h-12 mx-auto text-neutral-400" />
                        <h3 className="font-bold text-neutral-700 dark:text-neutral-300 text-sm">
                            {searchQuery ? 'Pintasan tidak ditemukan' : 'Direktori Pintasan Kosong'}
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-x-3.5 gap-y-6 sm:gap-6">
                        {filteredShortcuts.map((shortcut, index) => (
                            <a
                                key={index}
                                href={shortcut.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center text-center gap-2 transition-all duration-200 active:scale-[0.96] w-full min-w-0"
                            >
                                {/* Rounded Square Card background matching the mockup */}
                                <div className={`flex items-center justify-center w-full aspect-square rounded-2xl bg-gradient-to-tr ${shortcut.color} text-white group-hover:brightness-105 transition-all shadow-sm relative`}>
                                    <DynamicIcon name={shortcut.icon} className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icons.ArrowUpRight className="w-3 h-3 text-white/80" />
                                    </div>
                                </div>
                                
                                <span className="text-[10px] sm:text-xs font-bold text-neutral-800 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white truncate w-full px-1">
                                    {shortcut.name}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </main>

            <footer className="w-full max-w-xl text-center mb-4 z-10 text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest font-mono uppercase">
                &copy; {new Date().getFullYear()} PT Sindang Asih Makmur &bull; All Rights Reserved
            </footer>
        </div>
    );
}
