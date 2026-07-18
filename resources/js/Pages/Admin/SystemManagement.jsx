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
    'Zap', 'Car', 'Truck', 'Bus', 'Bike', 'Plane', 'Ship', 'TrainFront',
    'Heart', 'Stethoscope', 'GraduationCap', 'BookOpen',
    'Coffee', 'Utensils', 'Wrench', 'Leaf',
    'Dumbbell', 'Gamepad2', 'Tv', 'Compass',
    'Fingerprint', 'Scan', 'QrCode', 'Key', 'Lock', 'BadgeCheck',
    'Clipboard', 'Printer', 'Store', 'Factory',
];

const PRESET_COLORS = [
    { name: 'Charcoal', value: 'from-gray-700 to-gray-950' },
    { name: 'Slate Night', value: 'from-slate-600 to-slate-950' },
    { name: 'Burgundy', value: 'from-rose-700 to-red-950' },
    { name: 'Maroon', value: 'from-red-800 to-rose-950' },
    { name: 'Deep Wine', value: 'from-fuchsia-800 to-rose-950' },
    { name: 'Midnight', value: 'from-indigo-800 to-slate-950' },
    { name: 'Dark Navy', value: 'from-blue-800 to-indigo-950' },
    { name: 'Forest', value: 'from-green-800 to-emerald-950' },
    { name: 'Espresso', value: 'from-stone-700 to-stone-950' },
    { name: 'Obsidian', value: 'from-neutral-700 to-zinc-950' },
    { name: 'Void', value: 'from-gray-800 to-black' },
    { name: 'Onyx', value: 'from-zinc-700 to-zinc-950' },
    { name: 'Pitch', value: 'from-slate-800 to-gray-950' },
    { name: 'Dark Plum', value: 'from-purple-900 to-gray-950' },
    { name: 'Deep Teal', value: 'from-teal-800 to-gray-950' },
    { name: 'Terracotta', value: 'from-orange-500 to-stone-800' },
    { name: 'Rust', value: 'from-red-600 to-orange-900' },
    { name: 'Olive', value: 'from-yellow-600 to-green-900' },
    { name: 'Sage', value: 'from-green-500 to-stone-700' },
    { name: 'Clay', value: 'from-orange-600 to-amber-900' },
    { name: 'Sand', value: 'from-amber-400 to-stone-700' },
    { name: 'Cinnamon', value: 'from-orange-700 to-red-900' },
    { name: 'Moss', value: 'from-green-700 to-lime-900' },
    { name: 'Umber', value: 'from-amber-700 to-stone-900' },
    { name: 'Sienna', value: 'from-orange-600 to-red-800' },
    { name: 'Khaki', value: 'from-yellow-500 to-stone-800' },
    { name: 'Dusk', value: 'from-stone-600 to-gray-900' },
    { name: 'Fern', value: 'from-green-600 to-emerald-900' },
    { name: 'Swamp', value: 'from-lime-700 to-green-950' },
    { name: 'Bark', value: 'from-amber-600 to-stone-900' },
    { name: 'Blush', value: 'from-pink-100 to-rose-400' },
    { name: 'Lavender', value: 'from-violet-100 to-purple-400' },
    { name: 'Peach', value: 'from-orange-100 to-rose-300' },
    { name: 'Mint', value: 'from-teal-100 to-emerald-300' },
    { name: 'Baby Blue', value: 'from-sky-100 to-blue-300' },
    { name: 'Lilac', value: 'from-purple-100 to-fuchsia-300' },
    { name: 'Cream', value: 'from-amber-50 to-yellow-300' },
    { name: 'Powder', value: 'from-blue-100 to-indigo-300' },
    { name: 'Cotton', value: 'from-rose-50 to-pink-300' },
    { name: 'Petal', value: 'from-fuchsia-50 to-purple-300' },
    { name: 'Cloud', value: 'from-gray-100 to-slate-300' },
    { name: 'Dew', value: 'from-cyan-50 to-teal-300' },
    { name: 'Linen', value: 'from-orange-50 to-amber-300' },
    { name: 'Vanilla', value: 'from-yellow-50 to-orange-300' },
    { name: 'Frost', value: 'from-blue-50 to-sky-300' },
    { name: 'Snow', value: 'from-gray-50 to-slate-200' },
    { name: 'Milk', value: 'from-rose-50 to-red-200' },
    { name: 'Seashell', value: 'from-pink-50 to-orange-200' },
    { name: 'Electric', value: 'from-blue-400 to-violet-700' },
    { name: 'Neon Green', value: 'from-emerald-300 to-lime-600' },
    { name: 'Hot Pink', value: 'from-pink-400 to-fuchsia-700' },
    { name: 'Sunset', value: 'from-orange-300 to-rose-600' },
    { name: 'Ocean', value: 'from-cyan-400 to-blue-700' },
    { name: 'Lemon', value: 'from-yellow-300 to-lime-600' },
    { name: 'Tangerine', value: 'from-orange-300 to-amber-600' },
    { name: 'Cherry', value: 'from-red-400 to-pink-700' },
    { name: 'Laser', value: 'from-fuchsia-400 to-cyan-600' },
    { name: 'Zap', value: 'from-yellow-400 to-violet-600' },
    { name: 'Voltage', value: 'from-emerald-400 to-cyan-700' },
    { name: 'Pulse', value: 'from-rose-400 to-purple-700' },
    { name: 'Bolt', value: 'from-orange-400 to-teal-600' },
    { name: 'Flare', value: 'from-red-400 to-fuchsia-700' },
    { name: 'Radiance', value: 'from-violet-400 to-pink-600' },
    { name: 'Neon Blue', value: 'from-blue-300 to-violet-600' },
    { name: 'Neon Cyan', value: 'from-cyan-300 to-blue-600' },
    { name: 'Neon Purple', value: 'from-purple-300 to-blue-600' },
    { name: 'Neon Red', value: 'from-red-300 to-orange-600' },
    { name: 'Neon Yellow', value: 'from-yellow-300 to-green-600' },
    { name: 'Neon Orange', value: 'from-orange-300 to-red-600' },
    { name: 'Dusty Rose', value: 'from-rose-300 to-stone-600' },
    { name: 'Mauve', value: 'from-purple-300 to-stone-600' },
    { name: 'Steel', value: 'from-slate-300 to-blue-600' },
    { name: 'Fog', value: 'from-gray-200 to-blue-500' },
    { name: 'Heather', value: 'from-violet-300 to-stone-600' },
    { name: 'Stone Blush', value: 'from-stone-300 to-rose-500' },
    { name: 'Dusk Rose', value: 'from-rose-200 to-stone-500' },
    { name: 'Twilight', value: 'from-purple-200 to-slate-500' },
    { name: 'Mist', value: 'from-sky-200 to-slate-500' },
    { name: 'Haze', value: 'from-indigo-200 to-stone-500' },
    { name: 'Ash Rose', value: 'from-pink-200 to-stone-400' },
    { name: 'Thistle', value: 'from-fuchsia-200 to-stone-500' },
    { name: 'Pearl', value: 'from-blue-100 to-slate-400' },
    { name: 'Shell', value: 'from-rose-100 to-stone-400' },
    { name: 'Aurora', value: 'from-violet-400 to-cyan-600' },
    { name: 'Flame', value: 'from-red-400 to-yellow-600' },
    { name: 'Northern', value: 'from-teal-300 to-violet-600' },
    { name: 'Berry', value: 'from-purple-500 to-pink-300' },
    { name: 'Tropical', value: 'from-emerald-300 to-cyan-600' },
    { name: 'Indigo Rose', value: 'from-indigo-400 to-rose-600' },
    { name: 'Coral', value: 'from-rose-300 to-orange-500' },
    { name: 'Salmon', value: 'from-pink-300 to-orange-500' },
    { name: 'Bubblegum', value: 'from-pink-300 to-fuchsia-500' },
    { name: 'Rose Gold', value: 'from-rose-200 to-amber-400' },
    { name: 'Hot Magenta', value: 'from-fuchsia-400 to-pink-700' },
    { name: 'Cerise', value: 'from-rose-500 to-fuchsia-800' },
    { name: 'Fuchsia', value: 'from-fuchsia-500 to-purple-800' },
    { name: 'Raspberry', value: 'from-red-500 to-purple-800' },
    { name: 'Magenta', value: 'from-pink-500 to-violet-800' },
    { name: 'Ruby', value: 'from-rose-600 to-red-900' },
    { name: 'Garnet', value: 'from-red-600 to-rose-900' },
    { name: 'Scarlet', value: 'from-red-500 to-orange-800' },
    { name: 'Cardinal', value: 'from-red-700 to-rose-900' },
    { name: 'Crimson', value: 'from-red-600 to-pink-900' },
    { name: 'Fire', value: 'from-orange-500 to-red-800' },
    { name: 'Saffron', value: 'from-yellow-500 to-orange-800' },
    { name: 'Mustard', value: 'from-yellow-600 to-orange-900' },
    { name: 'Turmeric', value: 'from-amber-500 to-orange-800' },
    { name: 'Apricot', value: 'from-orange-200 to-amber-500' },
    { name: 'Honey', value: 'from-yellow-300 to-orange-600' },
    { name: 'Butterscotch', value: 'from-amber-300 to-orange-600' },
    { name: 'Caramel', value: 'from-amber-400 to-orange-700' },
    { name: 'Bronze', value: 'from-amber-600 to-orange-900' },
    { name: 'Navy', value: 'from-blue-700 to-blue-950' },
    { name: 'Sapphire', value: 'from-blue-500 to-indigo-800' },
    { name: 'Cobalt', value: 'from-blue-600 to-indigo-900' },
    { name: 'Periwinkle', value: 'from-blue-200 to-violet-500' },
    { name: 'Teal', value: 'from-teal-400 to-cyan-700' },
    { name: 'Emerald', value: 'from-emerald-400 to-green-700' },
    { name: 'Lime', value: 'from-lime-300 to-green-600' },
    { name: 'Jade', value: 'from-teal-500 to-emerald-800' },
    { name: 'Pine', value: 'from-green-600 to-teal-900' },
    { name: 'Seafoam', value: 'from-emerald-100 to-teal-400' },
    { name: 'Aquamarine', value: 'from-cyan-200 to-teal-500' },
    { name: 'Turquoise', value: 'from-cyan-400 to-teal-700' },
    { name: 'Cerulean', value: 'from-sky-500 to-blue-800' },
    { name: 'Azure', value: 'from-sky-400 to-indigo-700' },
    { name: 'Cyan', value: 'from-cyan-300 to-blue-600' },
    { name: 'Plum', value: 'from-purple-600 to-fuchsia-900' },
    { name: 'Amethyst', value: 'from-purple-400 to-fuchsia-700' },
    { name: 'Iris', value: 'from-violet-500 to-indigo-800' },
    { name: 'Orchid', value: 'from-fuchsia-300 to-purple-600' },
    { name: 'Manganese', value: 'from-violet-700 to-purple-950' },
    { name: 'Wisteria', value: 'from-purple-300 to-violet-600' },
    { name: 'Heliotrope', value: 'from-violet-400 to-purple-700' },
    { name: 'Grape', value: 'from-purple-500 to-violet-800' },
    { name: 'Eggplant', value: 'from-purple-700 to-slate-900' },
    { name: 'Amber', value: 'from-amber-400 to-orange-700' },
    { name: 'Gold', value: 'from-yellow-400 to-amber-700' },
    { name: 'Copper', value: 'from-orange-500 to-amber-800' },
    { name: 'Silver', value: 'from-gray-50 to-gray-400' },
    { name: 'Graphite', value: 'from-gray-500 to-gray-900' },
    { name: 'Ash', value: 'from-gray-300 to-gray-700' },
    { name: 'Pewter', value: 'from-zinc-300 to-zinc-700' },
    { name: 'Smoke', value: 'from-gray-200 to-gray-600' },
    { name: 'Platinum', value: 'from-gray-100 to-gray-500' },
    { name: 'Iron', value: 'from-zinc-500 to-gray-800' },
    { name: 'Gunmetal', value: 'from-zinc-600 to-gray-900' },
    { name: 'Flannel', value: 'from-stone-400 to-gray-700' },
    { name: 'Concrete', value: 'from-stone-300 to-gray-600' },
    { name: 'Dove', value: 'from-stone-100 to-gray-400' },
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
        return `http://hfg093wdn44.sn.mynetname.net:8081${trimmed}`;
    }
    return `http://hfg093wdn44.sn.mynetname.net:8081/${trimmed}`;
};

const cleanUrlInput = (value) => {
    const baseHttp = 'http://hfg093wdn44.sn.mynetname.net:8081';
    const baseHttps = 'https://hfg093wdn44.sn.mynetname.net:8081';
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
        color: system?.color || 'from-blue-500 to-cyan-400',
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
            <div className="relative bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
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
                            className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all"
                            placeholder="Contoh: Absensi Meeting, HRD System"
                        />
                        {errors.nama_sistem && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.nama_sistem}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5 uppercase tracking-wider">
                            URL Sistem
                        </label>
                        <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#2d2d2d] focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white transition-all overflow-hidden">
                            <span className="inline-flex items-center px-4 py-3 bg-neutral-100 dark:bg-[#222222] border-r border-neutral-200 dark:border-neutral-700 text-sm text-neutral-500 dark:text-neutral-400 font-mono select-none shrink-0">
                                <span className="hidden sm:inline">http://hfg093wdn44.sn.mynetname.net:8081</span>
                                <span className="sm:hidden">hfg093wdn44:8081</span>
                            </span>
                            <input
                                type="text"
                                value={data.link_sistem}
                                onChange={(e) => setData('link_sistem', cleanUrlInput(e.target.value))}
                                className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 focus:outline-none px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500"
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
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider">
                                Pilih Ikon <span className="text-red-500">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">{PRESET_ICONS.length} ikon</span>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 p-3 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                        {errors.icon && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.icon}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 uppercase tracking-wider">
                            Gradasi Warna <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {PRESET_COLORS.map((colorObj) => {
                                const isSelected = data.color === colorObj.value;
                                return (
                                    <button
                                        key={colorObj.value}
                                        type="button"
                                        onClick={() => setData('color', colorObj.value)}
                                        title={colorObj.name}
                                        className={`aspect-square rounded-lg bg-gradient-to-tr ${colorObj.value} border-2 transition-all ${isSelected
                                            ? 'border-neutral-900 dark:border-white scale-110 shadow-lg ring-2 ring-neutral-900/20 dark:ring-white/20'
                                            : 'border-transparent hover:scale-105 hover:shadow-md'
                                            }`}
                                    />
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
