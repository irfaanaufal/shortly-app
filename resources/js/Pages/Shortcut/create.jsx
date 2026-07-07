import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

const PRESET_ICONS = [
    'Link2', 'Globe', 'Home', 'Search', 'Bell', 'Star', 'Bookmark', 'Shield',
    'Briefcase', 'Building', 'Users', 'User', 'Settings', 'FileText', 'Folder', 'ClipboardList',
    'DollarSign', 'CreditCard', 'Wallet', 'ShoppingCart', 'Receipt', 'TrendingUp',
    'Image', 'Video', 'Music', 'Camera', 'Headphones', 'Mic', 'Play',
    'Code', 'Terminal', 'Database', 'Cloud', 'Server', 'Cpu', 'Wifi', 'Monitor',
    'Mail', 'MessageSquare', 'Phone', 'Send', 'Share2',
    'Calendar', 'Clock', 'CalendarCheck', 'Timer',
    'PieChart', 'BarChart3', 'LineChart', 'Activity',
];

const PRESET_COLORS = [
    { name: 'Blue-Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Blue-Indigo', value: 'from-blue-600 to-indigo-700' },
    { name: 'Sky-Cyan', value: 'from-sky-400 to-cyan-500' },
    { name: 'Indigo-Purple', value: 'from-indigo-500 to-purple-700' },
    { name: 'Violet-Pink', value: 'from-violet-500 to-pink-600' },
    { name: 'Fuchsia-Pink', value: 'from-fuchsia-500 to-pink-700' },
    { name: 'Pink-Rose', value: 'from-pink-500 to-rose-600' },
    { name: 'Rose-Red', value: 'from-rose-500 to-red-600' },
    { name: 'Red-Orange', value: 'from-red-500 to-orange-500' },
    { name: 'Orange-Amber', value: 'from-orange-500 to-amber-600' },
    { name: 'Amber-Yellow', value: 'from-amber-500 to-yellow-500' },
    { name: 'Yellow-Lime', value: 'from-yellow-500 to-lime-500' },
    { name: 'Lime-Green', value: 'from-lime-500 to-green-600' },
    { name: 'Green-Emerald', value: 'from-green-500 to-emerald-600' },
    { name: 'Emerald-Teal', value: 'from-emerald-500 to-teal-600' },
    { name: 'Teal-Cyan', value: 'from-teal-500 to-cyan-600' },
    { name: 'Cyan-Sky', value: 'from-cyan-500 to-sky-500' },
    { name: 'Purple-Fuchsia', value: 'from-purple-500 to-fuchsia-600' },
    { name: 'Violet-Rose', value: 'from-violet-600 to-rose-700' },
    { name: 'Sky-Purple', value: 'from-sky-500 to-violet-600' },
    { name: 'Slate-Gray', value: 'from-slate-600 to-gray-700' },
    { name: 'Zinc-Neutral', value: 'from-zinc-600 to-neutral-800' },
    { name: 'Gray-Stone', value: 'from-gray-600 to-stone-700' },
    { name: 'Stone-Stone', value: 'from-stone-500 to-stone-700' },
    { name: 'Orange-Rose', value: 'from-orange-500 to-rose-500' },
    { name: 'Cyan-Pink', value: 'from-cyan-500 to-pink-600' },
    { name: 'Blue-Yellow', value: 'from-blue-500 to-yellow-500' },
    { name: 'Green-Red', value: 'from-green-500 to-rose-500' },
    { name: 'Purple-Yellow', value: 'from-purple-600 to-yellow-500' },
    { name: 'Indigo-Green', value: 'from-indigo-500 to-green-500' },
    { name: 'Teal-Red', value: 'from-teal-500 to-rose-600' },
    { name: 'Slate-Orange', value: 'from-slate-600 to-orange-500' },
    { name: 'Zinc-Cyan', value: 'from-zinc-700 to-cyan-500' },
    { name: 'Black-Gray', value: 'from-gray-900 to-gray-700' },
    { name: 'White-Slate', value: 'from-white to-slate-100' },
    { name: 'Pink-Sky', value: 'from-pink-500 to-sky-500' },
    { name: 'Emerald-Purple', value: 'from-emerald-500 to-purple-700' },
    { name: 'Amber-Purple', value: 'from-amber-500 to-purple-700' },
    { name: 'Rose-Indigo', value: 'from-rose-500 to-indigo-700' }
];

const DynamicIcon = ({ name, className }) => {
    const IconComponent = Icons[name] || Icons.Link2;
    return <IconComponent className={className} />;
};

const formatUrl = (url) => {
    const trimmed = (url || '').trim();
    if (!trimmed) return trimmed;
    if (/^[a-zA-Z][a-zA-Z0-9.+-]*:\/\//.test(trimmed)) {
        return trimmed;
    }
    if (trimmed.startsWith('/')) {
        return `http://hfg093wdn44.sn.mynetname.net${trimmed}`;
    }
    return `http://hfg093wdn44.sn.mynetname.net/${trimmed}`;
};

const cleanUrlInput = (value) => {
    const baseHttp = 'http://hfg093wdn44.sn.mynetname.net';
    const baseHttps = 'https://hfg093wdn44.sn.mynetname.net';
    let cleaned = value;
    if (cleaned.startsWith(baseHttps)) {
        cleaned = cleaned.substring(baseHttps.length);
    } else if (cleaned.startsWith(baseHttp)) {
        cleaned = cleaned.substring(baseHttp.length);
    }
    return cleaned;
};

export default function Create() {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: '',
        url: '',
        description: '',
        icon: 'Link2',
        color: 'from-blue-500 to-cyan-500',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            url: formatUrl(data.url),
        }));
        post(route('shortcuts.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Shortcut Baru" />

            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 antialiased transition-colors duration-200">
                <div className="max-w-2xl mx-auto">
                    {/* Header Path */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-450 dark:text-neutral-500 mb-6">
                        <Link href={route('dashboard')} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Dashboard
                        </Link>
                        <Icons.ChevronRight className="w-3 h-3" />
                        <span className="text-neutral-900 dark:text-neutral-50">Tambah Shortcut Baru</span>
                    </div>

                    <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                        {/* Title Header */}
                        <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#1a1a1a]/50 flex items-center gap-3">
                            <div className="p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl">
                                <Icons.Plus className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                                    Tambah Shortcut Baru
                                </h2>
                                <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5">
                                    Tambahkan link atau pintasan aplikasi untuk diakses dengan cepat.
                                </p>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Input Nama */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Nama Aplikasi / Shortcut <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                                    placeholder="Contoh: Admin, CeklisQC, Absensi"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.name}</p>
                                )}
                            </div>

                            {/* Input URL */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Tautan URL <span className="text-red-500">*</span>
                                </label>
                                <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#2d2d2d] focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white transition-all overflow-hidden">
                                    <span className="inline-flex items-center px-4 py-3 bg-neutral-100 dark:bg-[#222222] border-r border-neutral-200 dark:border-neutral-700 text-sm text-neutral-500 dark:text-neutral-400 font-mono select-none">
                                        http://hfg093wdn44.sn.mynetname.net
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={data.url}
                                        onChange={(e) => setData('url', cleanUrlInput(e.target.value))}
                                        className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 focus:outline-none px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500"
                                        placeholder="/path atau path"
                                    />
                                </div>
                                {data.url && (
                                    <div className="mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                                        Preview URL: <span className="font-mono text-neutral-600 dark:text-neutral-300 break-all">{formatUrl(data.url)}</span>
                                    </div>
                                )}
                                {errors.url && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.url}</p>
                                )}
                            </div>

                            {/* Input Deskripsi */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                                    Deskripsi Singkat (Opsional)
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500 min-h-[90px] resize-y"
                                    placeholder="Deskripsi fungsi shortcut ini..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.description}</p>
                                )}
                            </div>

                            {/* Pemilihan Icon Preset */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                                    Pilih Ikon <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 p-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl">
                                    {PRESET_ICONS.map((iconName) => {
                                        const isSelected = data.icon === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setData('icon', iconName)}
                                                className={`flex items-center justify-center p-3 rounded-xl border transition-all ${isSelected
                                                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-105'
                                                        : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                                    }`}
                                                title={iconName}
                                            >
                                                <DynamicIcon name={iconName} className="w-5 h-5" />
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.icon && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.icon}</p>
                                )}
                            </div>

                            {/* Pemilihan Warna Preset */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                                    Gradasi Warna Latar <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl p-3">
                                    {PRESET_COLORS.map((colorObj) => {
                                        const isSelected = data.color === colorObj.value;
                                        return (
                                            <button
                                                key={colorObj.value}
                                                type="button"
                                                onClick={() => setData('color', colorObj.value)}
                                                className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left text-xs font-semibold ${isSelected
                                                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-[1.02]'
                                                        : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                                    }`}
                                            >
                                                <span className={`w-4 h-4 rounded-lg bg-gradient-to-tr ${colorObj.value} shrink-0 shadow-sm`} />
                                                <span className="truncate">{colorObj.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.color && (
                                    <p className="text-red-500 text-[11px] mt-1.5 font-bold">{errors.color}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-95"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                                >
                                    {processing ? (
                                        <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Icons.Save className="w-4 h-4" />
                                    )}
                                    Simpan Shortcut
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
