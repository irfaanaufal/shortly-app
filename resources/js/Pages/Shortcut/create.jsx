import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PRESET_ICONS, PRESET_COLORS } from '@/utils/presets';
import DynamicIcon from '@/Components/DynamicIcon';
import { Loader2, Search, X } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';

const BASE_URL_OPTIONS = [
    {
        label: 'https://sindangasih-makmur.com/',
        value: 'https://sindangasih-makmur.com',
    },
    {
        label: 'http://hfg093wdn44.sn.mynetname.net:8081/',
        value: 'http://hfg093wdn44.sn.mynetname.net:8081',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: '',
        url: '',
        description: '',
        icon: 'Link2',
        color: 'from-blue-500 to-cyan-400',
    });

    const [selectedBaseUrl, setSelectedBaseUrl] = useState(
        BASE_URL_OPTIONS[0].value,
    );
    const [iconSearch, setIconSearch] = useState('');
    const iconGridRef = useRef(null);

    const cleanCustomUrlInput = (value) => {
        let cleaned = value;
        BASE_URL_OPTIONS.forEach((opt) => {
            const http = opt.value;
            const https = opt.value.replace('http://', 'https://');
            if (cleaned.startsWith(https)) {
                cleaned = cleaned.substring(https.length);
            } else if (cleaned.startsWith(http)) {
                cleaned = cleaned.substring(http.length);
            }
        });
        return cleaned;
    };

    const formatWithBase = (url, baseUrl) => {
        const trimmed = (url || '').trim();
        if (!trimmed) return trimmed;
        if (/^[a-zA-Z][a-zA-Z0-9.+-]*:\/\//.test(trimmed)) {
            return trimmed;
        }
        const cleanBase = baseUrl.replace(/\/+$/, '');
        const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
        return `${cleanBase}${cleanPath}`;
    };

    const filteredIcons = useMemo(() => {
        if (!iconSearch.trim()) return PRESET_ICONS;
        const q = iconSearch.toLowerCase();
        return PRESET_ICONS.filter((name) => name.toLowerCase().includes(q));
    }, [iconSearch]);

    useEffect(() => {
        if (
            iconSearch.trim() &&
            filteredIcons.length > 0 &&
            iconGridRef.current
        ) {
            const selected = iconGridRef.current.querySelector(
                '[data-selected="true"]',
            );
            if (selected)
                selected.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                });
        }
    }, [iconSearch, filteredIcons]);

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((d) => ({
            ...d,
            url: formatWithBase(d.url, selectedBaseUrl),
        }));
        post(route('shortcuts.store'));
    };

    const previewUrl = data.url
        ? formatWithBase(data.url, selectedBaseUrl)
        : '/path';
    const selectedColorName =
        PRESET_COLORS.find((c) => c.value === data.color)?.name || '';

    return (
        <AuthenticatedLayout
            title="Tambah Shortcut"
            subtitle="Buat shortcut baru untuk akses cepat"
        >
            <Head title="Tambah Shortcut Baru" />

            <div className="flex w-full flex-col py-1">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="grid grid-cols-1 items-start gap-6 pb-6 lg:grid-cols-12 lg:pb-0">
                        {/* ─── LEFT COLUMN: Form Fields Card ─── */}
                        <div className="flex flex-col space-y-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e] sm:space-y-3.5 sm:p-5 md:p-6 lg:col-span-7">
                            {/* Row 1: Nama Aplikasi & Deskripsi (Opsional) */}
                            <div className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                        Nama Aplikasi
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="h-10 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800 dark:border-neutral-700 dark:bg-[#282828] dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white sm:h-11"
                                        placeholder=""
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs font-medium text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                        Deskripsi (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="h-10 w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800 dark:border-neutral-700 dark:bg-[#282828] dark:text-neutral-100 dark:focus:border-white dark:focus:ring-white sm:h-11"
                                        placeholder=""
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-xs font-medium text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Tautan URL with Dropdown Prefix */}
                            <div className="shrink-0">
                                <label className="mb-1.5 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                    Tautan URL
                                </label>
                                <div className="flex h-10 overflow-hidden rounded-xl border border-neutral-300 bg-white transition-all focus-within:border-neutral-800 focus-within:ring-1 focus-within:ring-neutral-800 dark:border-neutral-700 dark:bg-[#282828] dark:focus-within:border-white dark:focus-within:ring-white sm:h-11">
                                    <select
                                        value={selectedBaseUrl}
                                        onChange={(e) =>
                                            setSelectedBaseUrl(e.target.value)
                                        }
                                        className="max-w-[130px] shrink-0 cursor-pointer select-none truncate border-r border-neutral-300 bg-neutral-100 px-2.5 font-mono text-xs text-neutral-700 outline-none transition-colors hover:bg-neutral-200/60 dark:border-neutral-700 dark:bg-[#202020] dark:text-neutral-300 dark:hover:bg-[#262626] sm:max-w-[160px] sm:px-3 sm:text-xs md:max-w-none md:text-sm"
                                    >
                                        {BASE_URL_OPTIONS.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                                className="bg-white font-sans text-neutral-900 dark:bg-[#202020] dark:text-neutral-100"
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        required
                                        value={data.url}
                                        onChange={(e) =>
                                            setData(
                                                'url',
                                                cleanCustomUrlInput(
                                                    e.target.value,
                                                ),
                                            )
                                        }
                                        className="min-w-0 flex-1 border-0 bg-transparent px-3.5 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 dark:text-neutral-100"
                                        placeholder="/path atau path"
                                    />
                                </div>
                                {errors.url && (
                                    <p className="mt-1 text-xs font-medium text-red-500">
                                        {errors.url}
                                    </p>
                                )}
                            </div>

                            {/* Row 3: Pilih Ikon */}
                            <div className="flex flex-col">
                                <label className="mb-1.5 block shrink-0 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                    Pilih Ikon
                                </label>
                                <div className="flex flex-col space-y-2 overflow-hidden rounded-xl border border-neutral-300 bg-white p-3 dark:border-neutral-700 dark:bg-[#242424]">
                                    <div className="relative shrink-0">
                                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={(e) =>
                                                setIconSearch(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-8 text-xs text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-400 dark:border-neutral-700 dark:bg-[#1a1a1a] dark:text-neutral-50 dark:focus:border-neutral-500 sm:py-1.5"
                                            placeholder="Cari ikon..."
                                        />
                                        {iconSearch && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIconSearch('')
                                                }
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Icon Grid */}
                                    <div
                                        ref={iconGridRef}
                                        className="grid-tiles grid max-h-[220px] gap-2 overflow-y-auto p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
                                    >
                                        {filteredIcons.length === 0 ? (
                                            <p className="col-span-full py-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
                                                Tidak ada ikon ditemukan
                                            </p>
                                        ) : (
                                            filteredIcons.map((iconName) => {
                                                const isSelected =
                                                    data.icon === iconName;
                                                return (
                                                    <button
                                                        key={iconName}
                                                        type="button"
                                                        data-selected={
                                                            isSelected
                                                        }
                                                        onClick={() =>
                                                            setData(
                                                                'icon',
                                                                iconName,
                                                            )
                                                        }
                                                        className={`flex aspect-square items-center justify-center rounded-lg border-2 transition-all ${
                                                            isSelected
                                                                ? 'scale-105 border-neutral-900 bg-neutral-900 text-white shadow-md ring-2 ring-neutral-900/20 dark:border-white dark:bg-white dark:text-neutral-900 dark:ring-white/20'
                                                                : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:scale-105 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-400 dark:hover:bg-[#333333]'
                                                        }`}
                                                        title={iconName}
                                                    >
                                                        <DynamicIcon
                                                            name={iconName}
                                                            className="h-4 w-4"
                                                        />
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                {errors.icon && (
                                    <p className="mt-1 text-xs font-medium text-red-500">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            {/* Row 4: Gradasi Warna */}
                            <div className="flex flex-col">
                                <div className="mb-1.5 flex shrink-0 items-center justify-between">
                                    <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                        Gradasi Warna
                                    </label>
                                    {selectedColorName && (
                                        <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                                            {selectedColorName}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-300 bg-white p-3 dark:border-neutral-700 dark:bg-[#242424]">
                                    <div className="grid-tiles grid max-h-[180px] gap-2 overflow-y-auto p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
                                        {PRESET_COLORS.map((colorObj) => {
                                            const isSelected =
                                                data.color === colorObj.value;
                                            return (
                                                <button
                                                    key={colorObj.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            'color',
                                                            colorObj.value,
                                                        )
                                                    }
                                                    title={colorObj.name}
                                                    className={`aspect-square rounded-lg bg-gradient-to-tr ${colorObj.value} border-2 transition-all ${
                                                        isSelected
                                                            ? 'scale-105 border-neutral-900 shadow-md ring-2 ring-neutral-900/20 dark:border-white dark:ring-white/20'
                                                            : 'border-transparent hover:scale-105 hover:shadow-sm'
                                                    }`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                {errors.color && (
                                    <p className="mt-1 text-xs font-medium text-red-500">
                                        {errors.color}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ─── RIGHT COLUMN: Preview Card & Action Buttons ─── */}
                        <div className="flex flex-col gap-4 lg:col-span-5">
                            {/* Preview Card */}
                            <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e] sm:p-5 md:p-6">
                                <label className="mb-3 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                    Preview
                                </label>

                                {/* Large Landscape Gradient Shortcut Card */}
                                <div
                                    className={`aspect-[16/9] w-full rounded-2xl bg-gradient-to-tr sm:aspect-[4/3] ${data.color} relative flex items-center justify-center overflow-hidden border border-black/5 text-white shadow-md transition-all duration-300`}
                                >
                                    {/* Big Center Icon */}
                                    <DynamicIcon
                                        name={data.icon}
                                        className="h-16 w-16 stroke-[2.2] drop-shadow-sm sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                                    />

                                    {/* Top Right Arrow Icon */}
                                    <div className="absolute right-3.5 top-3.5 text-white/90 sm:right-4 sm:top-4">
                                        <svg
                                            className="h-5 w-5 sm:h-6 sm:w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 17L17 7M17 7H7M17 7v10"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Shortcut Text Info */}
                                <div className="mt-4 px-2 text-center">
                                    <p className="truncate text-base font-bold text-neutral-900 dark:text-neutral-50">
                                        {data.name || 'Nama Shortcut'}
                                    </p>
                                    <p className="mt-1 truncate font-mono text-xs text-neutral-400 dark:text-neutral-500">
                                        {previewUrl}
                                    </p>
                                    {data.description && (
                                        <p className="mt-1.5 line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400">
                                            {data.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="flex-1 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-center text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:bg-[#1e1e1e] dark:text-neutral-200 dark:hover:bg-[#282828] sm:flex-none"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2d2d2d] px-7 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#1f1f1f] active:scale-95 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 sm:flex-none"
                                >
                                    {processing && (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    )}
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
