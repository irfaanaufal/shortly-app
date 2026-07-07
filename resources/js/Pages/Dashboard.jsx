import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

function SortableShortcut({ shortcut, isChecked, onToggle, isEditable, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: shortcut.id });
    const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : undefined, opacity: isDragging ? 0.8 : 1 };
    const isGlobal = shortcut.user_id === null;

    return (
        <div ref={setNodeRef} style={style} {...attributes} onClick={() => onToggle(shortcut.id)} className={`relative flex items-start text-left gap-3.5 p-4 pl-7 rounded-xl border transition-all cursor-pointer select-none ${isChecked ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-[#2d2d2d] ring-1 ring-neutral-900 dark:ring-white' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1e1e1e] hover:bg-neutral-50 dark:hover:bg-[#2d2d2d]/50'} ${isDragging ? 'shadow-lg' : ''}`}>
            <div {...listeners} onClick={(e) => e.stopPropagation()} className="absolute top-4 left-1.5 cursor-grab active:cursor-grabbing text-neutral-300 dark:text-neutral-600 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors" title="Seret untuk mengatur urutan">
                <Icons.GripVertical className="w-4 h-4" />
            </div>
            <span className={`absolute top-4 right-4 w-4 h-4 rounded flex items-center justify-center border transition-all ${isChecked ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700 bg-transparent'}`}>
                <Icons.Check className={`w-3 h-3 stroke-[3] transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
            </span>
            <div className={`flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-tr ${shortcut.color} text-white border border-transparent shadow-sm shrink-0`}>
                <DynamicIcon name={shortcut.icon} className="w-5 h-5" />
            </div>
            <div className={`pr-5 min-w-0 flex-1 ${isEditable && !isGlobal ? 'pb-6' : ''}`}>
                <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-50 truncate">{shortcut.name}</p>
                    {isGlobal && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shrink-0">
                            Global
                        </span>
                    )}
                </div>
                {shortcut.description && (<p className="text-[11px] text-neutral-400 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">{shortcut.description}</p>)}
                <a href={shortcut.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] font-mono text-neutral-400 dark:text-neutral-400 truncate mt-1.5 bg-neutral-50 dark:bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-neutral-200/50 dark:border-neutral-700 inline-block max-w-full hover:text-neutral-600 dark:hover:text-neutral-300 hover:underline">{shortcut.url}</a>
            </div>
            {isEditable && !isGlobal && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                    <Link href={route('shortcuts.edit', shortcut.id)} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-700 transition-all active:scale-90" title="Edit Shortcut"><Icons.Pencil className="w-3 h-3" /></Link>
                    <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(shortcut.id); }} className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#2d2d2d] text-red-600 dark:text-red-400 hover:text-white dark:hover:text-red-200 hover:bg-red-600 dark:hover:bg-red-950 border border-neutral-200 dark:border-neutral-700 hover:border-red-650 transition-all active:scale-90" title="Hapus Shortcut"><Icons.Trash className="w-3 h-3" /></button>
                </div>
            )}
        </div>
    );
}

export default function Dashboard({ shortcuts = [], userShortcuts = [] }) {
    const { auth } = usePage().props;
    const [copied, setCopied] = useState(false);
    const [orderedShortcuts, setOrderedShortcuts] = useState(shortcuts);
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    useEffect(() => { setOrderedShortcuts(shortcuts); }, [shortcuts]);

    const handleDelete = (shortcutId) => {
        const shortcut = shortcuts.find(s => s.id === shortcutId);
        if (shortcut && shortcut.user_id === null) {
            alert('Shortcut global tidak bisa dihapus. Hanya admin yang bisa menghapus shortcut global.');
            return;
        }
        if (confirm('Apakah Anda yakin ingin menghapus shortcut ini secara permanen dari seluruh sistem?')) {
            router.delete(route('shortcuts.destroy', shortcutId), {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteClick = (e, shortcutId) => {
        e.stopPropagation();
        handleDelete(shortcutId);
    };

    const usernameForm = useForm({
        username: auth.user.username || '',
    });

    const shortcutsForm = useForm({
        shortcut_ids: userShortcuts || [],
    });

    const publicUrl = (() => {
        if (typeof window === 'undefined') return '';
        const origin = window.location.origin;
        const path = window.location.pathname;
        const pathLower = path.toLowerCase();

        const publicIndex = pathLower.indexOf('/shortly-app/public/index.php');
        if (publicIndex !== -1) {
            const subDir = path.substring(0, publicIndex);
            return `${origin}${subDir}/shortly-app/public/index.php/u/${auth.user.username}`;
        }

        const dashboardIndex = pathLower.indexOf('/dashboard');
        if (dashboardIndex !== -1) {
            const subDir = path.substring(0, dashboardIndex);
            return `${origin}${subDir}/shortly-app/public/index.php/u/${auth.user.username}`;
        }

        return `${origin}/shortly-app/public/index.php/u/${auth.user.username}`;
    })();

    const fallbackCopy = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                console.error("Fallback copy was unsuccessful");
            }
        } catch (err) {
            console.error("Fallback copy failed", err);
        }
        document.body.removeChild(textArea);
    };

    const handleCopy = () => {
        if (!publicUrl) return;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(publicUrl)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => fallbackCopy(publicUrl));
        } else {
            fallbackCopy(publicUrl);
        }
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        usernameForm.post(route('dashboard.username.update'), {
            preserveScroll: true,
        });
    };

    const handleShortcutToggle = (id) => {
        let updated = [...shortcutsForm.data.shortcut_ids];
        updated = updated.includes(id)
            ? updated.filter((item) => item !== id)
            : [...updated, id];
        shortcutsForm.setData('shortcut_ids', updated);
    };

    const handleShortcutsSubmit = (e) => {
        e.preventDefault();
        shortcutsForm.post(route('dashboard.shortcuts.update'), {
            preserveScroll: true,
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setOrderedShortcuts((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                router.put(route('shortcuts.reorder'), { shortcut_ids: newItems.map((i) => i.id) }, { preserveScroll: true });
                return newItems;
            });
        }
    };

    const activeCount = shortcutsForm.data.shortcut_ids.length;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Background disesuaikan ke True Charcoal (Abu-abu Gelap Pekat) */}
            <div className="min-h-screen bg-neutral-50 dark:bg-[#121212] pb-12 antialiased transition-colors duration-200">



                <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* Left Column */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Public URL Card */}
                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-3 flex items-center gap-2">
                                    <Icons.Globe className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                                    Tautan Publik Anda
                                </p>
                                <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 pl-3">
                                    <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-300 truncate select-all">
                                        {publicUrl || 'Generating link...'}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        disabled={!publicUrl}
                                        type="button"
                                        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 border ${copied
                                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                                            : 'bg-white dark:bg-[#1e1e1e] text-slate-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                            }`}
                                    >
                                        {copied ? (
                                            <><Icons.Check className="w-3.5 h-3.5 stroke-[2.5]" /> Tersalin</>
                                        ) : (
                                            <><Icons.Copy className="w-3.5 h-3.5" /> Salin</>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Form Username */}
                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 mb-4">
                                    Konfigurasi Identitas
                                </p>
                                <form onSubmit={handleUsernameSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-1.5">
                                            Username Karyawan
                                        </label>
                                        <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 focus-within:border-neutral-900 dark:focus-within:border-white focus-within:ring-1 focus-within:ring-neutral-900 dark:focus-within:ring-white overflow-hidden transition-all bg-white dark:bg-[#2d2d2d]">
                                            <span className="inline-flex items-center bg-neutral-50 dark:bg-[#1e1e1e] border-r border-neutral-200 dark:border-neutral-700 px-3.5 text-xs text-neutral-400 dark:text-neutral-400 font-mono shrink-0">
                                                /u/
                                            </span>
                                            <input
                                                type="text"
                                                id="username"
                                                required
                                                value={usernameForm.data.username}
                                                onChange={(e) =>
                                                    usernameForm.setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))
                                                }
                                                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 placeholder-neutral-300 dark:placeholder-neutral-500 outline-none"
                                                placeholder="nama.lengkap"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={usernameForm.processing}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        {usernameForm.processing ? (
                                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Icons.Save className="w-4 h-4" />
                                        )}
                                        Simpan Identitas
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                                <div>
                                    <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                                        Pustaka Shortcut Aplikasi
                                    </h2>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5">
                                        Buat shortcut kustom pribadi Anda atau sematkan pintasan bawaan.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-start sm:self-auto">
                                    <Link
                                        href={route('shortcuts.create')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 border border-transparent dark:border-neutral-800 shrink-0"
                                    >
                                        <Icons.Plus className="w-3.5 h-3.5" />
                                        Tambah Shortcut
                                    </Link>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-neutral-100 dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-200 rounded-full border border-neutral-200 dark:border-neutral-800 whitespace-nowrap">
                                        Terpilih: {activeCount} / {shortcuts.length}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-5">
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={orderedShortcuts.map((s) => s.id)}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {orderedShortcuts.map((shortcut) => (
                                                <SortableShortcut
                                                    key={shortcut.id}
                                                    shortcut={shortcut}
                                                    isChecked={shortcutsForm.data.shortcut_ids.includes(shortcut.id)}
                                                    onToggle={handleShortcutToggle}
                                                    isEditable={true}
                                                    onDelete={handleDelete}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>

                                <form onSubmit={handleShortcutsSubmit} className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                                    <button
                                        type="submit"
                                        disabled={shortcutsForm.processing}
                                        className="w-full sm:w-auto float-right flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        {shortcutsForm.processing ? (
                                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Icons.Save className="w-4 h-4" />
                                        )}
                                        Simpan Susunan Grid
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
