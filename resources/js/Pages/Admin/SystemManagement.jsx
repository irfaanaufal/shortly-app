import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

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
    { name: 'Rose-Indigo', value: 'from-rose-500 to-indigo-700' },
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

function SystemForm({ system, onClose, onSuccess }) {
    const isEdit = !!system;
    const { data, setData, post, put, processing, errors, transform } = useForm({
        nama_sistem: system?.nama_sistem || '',
        link_sistem: system ? cleanUrlInput(system.link_sistem || '') : '',
        icon: system?.icon || 'Server',
        color: system?.color || 'from-blue-500 to-cyan-500',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((d) => ({
            ...d,
            link_sistem: d.link_sistem ? formatUrl(d.link_sistem) : '',
        }));
        if (isEdit) {
            put(route('admin.systems.update', system.id), {
                onSuccess: () => onSuccess?.(),
            });
        } else {
            post(route('admin.systems.store'), {
                onSuccess: () => onSuccess?.(),
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />
            <div className="relative bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl">
                            {isEdit ? <Icons.Pencil className="w-4 h-4" /> : <Icons.Plus className="w-4 h-4" />}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                                {isEdit ? 'Ubah Sistem' : 'Tambah Sistem Baru'}
                            </h3>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                {isEdit ? 'Perbarui detail sistem yang sudah ada.' : 'Buat sistem baru yang bisa diakses semua user.'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all">
                        <Icons.X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                            Nama Sistem <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={data.nama_sistem}
                            onChange={(e) => setData('nama_sistem', e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all"
                            placeholder="Contoh: Absensi Meeting, HRD System"
                        />
                        {errors.nama_sistem && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.nama_sistem}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                            URL Sistem
                        </label>
                        <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#2d2d2d] focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white transition-all overflow-hidden">
                            <span className="inline-flex items-center px-3 py-2.5 bg-neutral-100 dark:bg-[#222222] border-r border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400 font-mono select-none shrink-0">
                                http://hfg093wdn44.sn.mynetname.net
                            </span>
                            <input
                                type="text"
                                value={data.link_sistem}
                                onChange={(e) => setData('link_sistem', cleanUrlInput(e.target.value))}
                                className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 focus:outline-none px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500"
                                placeholder="/path atau path"
                            />
                        </div>
                        {data.link_sistem && (
                            <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                                Preview: <span className="font-mono text-neutral-600 dark:text-neutral-300 break-all">{formatUrl(data.link_sistem)}</span>
                            </p>
                        )}
                        {errors.link_sistem && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.link_sistem}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                            Pilih Ikon <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 p-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl">
                            {PRESET_ICONS.map((iconName) => {
                                const isSelected = data.icon === iconName;
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() => setData('icon', iconName)}
                                        className={`flex items-center justify-center p-2 rounded-lg border transition-all ${isSelected
                                            ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-105'
                                            : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                            }`}
                                        title={iconName}
                                    >
                                        <DynamicIcon name={iconName} className="w-4 h-4" />
                                    </button>
                                );
                            })}
                        </div>
                        {errors.icon && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.icon}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                            Gradasi Warna <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl">
                            {PRESET_COLORS.map((colorObj) => {
                                const isSelected = data.color === colorObj.value;
                                return (
                                    <button
                                        key={colorObj.value}
                                        type="button"
                                        onClick={() => setData('color', colorObj.value)}
                                        className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all text-left text-[10px] font-semibold ${isSelected
                                            ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md scale-[1.02]'
                                            : 'bg-white border-neutral-200 dark:bg-[#1e1e1e] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                                            }`}
                                    >
                                        <span className={`w-3 h-3 rounded bg-gradient-to-tr ${colorObj.value} shrink-0 shadow-sm`} />
                                        <span className="truncate">{colorObj.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.color && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.color}</p>}
                    </div>

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                        >
                            {processing ? (
                                <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Icons.Save className="w-4 h-4" />
                            )}
                            {isEdit ? 'Simpan Perubahan' : 'Buat Sistem'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function SystemManagement({ systems = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingSystem, setEditingSystem] = useState(null);
    const [search, setSearch] = useState('');

    const filteredSystems = systems.filter((s) =>
        s.nama_sistem.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (system) => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${system.nama_sistem}"? Semua shortcut terkait juga akan dihapus.`)) {
            router.delete(route('admin.systems.destroy', system.id), {
                preserveScroll: true,
            });
        }
    };

    const handleToggle = (system) => {
        router.patch(route('admin.systems.toggle', system.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Sistem" />

            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] pb-12 antialiased transition-colors duration-200">
                <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                                <Icons.Server className="w-5 h-5" />
                                Kelola Sistem
                            </h1>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                                Kelola daftar sistem/aplikasi yang tersedia untuk semua user.
                            </p>
                        </div>
                        <button
                            onClick={() => { setEditingSystem(null); setShowForm(true); }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 border border-transparent dark:border-neutral-800 shrink-0"
                        >
                            <Icons.Plus className="w-3.5 h-3.5" />
                            Tambah Sistem
                        </button>
                    </div>

                    <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white transition-all">
                                <Icons.Search className="w-4 h-4 text-neutral-400 shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500"
                                    placeholder="Cari sistem berdasarkan nama atau kategori..."
                                />
                            </div>
                        </div>

                        {filteredSystems.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <Icons.Server className="w-10 h-10 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                                <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                    {systems.length === 0 ? 'Belum ada sistem' : 'Tidak ditemukan'}
                                </p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                    {systems.length === 0 ? 'Klik "Tambah Sistem" untuk membuat sistem baru.' : 'Coba kata kunci pencarian lain.'}
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {filteredSystems.map((system) => (
                                    <div key={system.id} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 dark:hover:bg-[#2d2d2d]/50 transition-colors">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr ${system.color} text-white shadow-sm shrink-0`}>
                                            <DynamicIcon name={system.icon} className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 truncate">{system.nama_sistem}</p>
                                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${system.is_active
                                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                                                    }`}>
                                                    {system.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </div>
                                            {system.link_sistem && (
                                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5 font-mono">{system.link_sistem}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => handleToggle(system)}
                                                className={`p-1.5 rounded-lg border transition-all active:scale-90 ${system.is_active
                                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50'
                                                    : 'bg-neutral-50 dark:bg-[#2d2d2d] text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                    }`}
                                                title={system.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                            >
                                                {system.is_active ? <Icons.Eye className="w-3.5 h-3.5" /> : <Icons.EyeOff className="w-3.5 h-3.5" />}
                                            </button>
                                            <button
                                                onClick={() => { setEditingSystem(system); setShowForm(true); }}
                                                className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-700 transition-all active:scale-90"
                                                title="Ubah"
                                            >
                                                <Icons.Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(system)}
                                                className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-red-600 dark:text-red-400 hover:text-white dark:hover:text-red-200 hover:bg-red-600 dark:hover:bg-red-950 border border-neutral-200 dark:border-neutral-700 hover:border-red-600 transition-all active:scale-90"
                                                title="Hapus"
                                            >
                                                <Icons.Trash className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showForm && (
                <SystemForm
                    system={editingSystem}
                    onClose={() => { setShowForm(false); setEditingSystem(null); }}
                    onSuccess={() => { setShowForm(false); setEditingSystem(null); }}
                />
            )}
        </AuthenticatedLayout>
    );
}
