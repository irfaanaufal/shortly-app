import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import {
    Check,
    Globe,
    Copy,
    ExternalLink,
    GripVertical,
    Loader2,
    Save,
    Plus,
    Pencil,
    Trash,
    X,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import DynamicIcon from '@/Components/DynamicIcon';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableShortcut({
    shortcut,
    isChecked,
    onToggle,
    onDelete,
    isOwner,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: shortcut.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={() => !isDragging && onToggle(shortcut.id)}
            className={`group relative flex select-none items-center gap-3 rounded-xl border p-3.5 transition-all ${isChecked ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900 dark:border-white dark:bg-[#2d2d2d] dark:ring-white' : 'border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:hover:bg-[#2d2d2d]/50'} ${isDragging ? 'opacity-40 shadow-lg' : 'cursor-grab active:cursor-grabbing'}`}
        >
            {isChecked && (
                <div
                    {...listeners}
                    className="-my-1 -ml-1 shrink-0 cursor-grab touch-none p-1 active:cursor-grabbing"
                >
                    <GripVertical className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-600" />
                </div>
            )}
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr ${shortcut.color} shrink-0 border border-transparent text-white shadow-sm`}
            >
                <DynamicIcon name={shortcut.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-50">
                    {shortcut.name}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-400">
                    {shortcut.url}
                </p>
            </div>
            <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${isChecked ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 bg-transparent dark:border-neutral-700'}`}
            >
                <Check
                    className={`h-3 w-3 stroke-[3] transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}
                />
            </span>
            {isOwner && (
                <div
                    className="flex shrink-0 items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <a
                        href={route('shortcuts.edit', shortcut.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-neutral-200 hover:text-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                        title="Edit"
                    >
                        <Pencil className="h-3 w-3" />
                    </a>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(shortcut.id);
                        }}
                        className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-600 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                        title="Hapus"
                    >
                        <Trash className="h-3 w-3" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Dashboard({ shortcuts = [], userShortcuts = [] }) {
    const { auth } = usePage().props;
    const [copied, setCopied] = useState(false);
    const [orderedShortcuts, setOrderedShortcuts] = useState(
        shortcuts.filter((s) => userShortcuts.includes(s.id)),
    );
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 5 },
        }),
    );

    const usernameForm = useForm({ username: auth.user.username || '' });
    const shortcutsForm = useForm({ shortcut_ids: userShortcuts || [] });

    const selectedIds = useMemo(
        () => new Set(shortcutsForm.data.shortcut_ids),
        [shortcutsForm.data.shortcut_ids],
    );
    const selectedShortcuts = useMemo(
        () => orderedShortcuts.filter((s) => selectedIds.has(s.id)),
        [orderedShortcuts, selectedIds],
    );
    const availableShortcuts = useMemo(
        () => shortcuts.filter((s) => !selectedIds.has(s.id)),
        [shortcuts, selectedIds],
    );

    useEffect(() => {
        setOrderedShortcuts(
            shortcuts.filter((s) => userShortcuts.includes(s.id)),
        );
    }, [shortcuts, userShortcuts]);

    const displayShortcuts = useMemo(() => {
        if (!globalFilter.trim()) return [];
        const q = globalFilter.toLowerCase();
        return shortcuts.filter((s) => s.name.toLowerCase().includes(q));
    }, [shortcuts, globalFilter]);

    const handleDelete = (shortcutId) => {
        const shortcut = shortcuts.find((s) => s.id === shortcutId);
        if (shortcut && shortcut.user_id === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Tidak Bisa Dihapus',
                text: 'Shortcut global tidak bisa dihapus. Hanya admin yang bisa menghapus shortcut global.',
                confirmButtonColor: '#6366f1',
            });
            return;
        }
        Swal.fire({
            icon: 'warning',
            title: 'Hapus Shortcut?',
            text: 'Apakah Anda yakin ingin menghapus shortcut ini secara permanen dari seluruh sistem?',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('shortcuts.destroy', shortcutId), {
                    preserveScroll: true,
                    onError: () =>
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Gagal menghapus shortcut.',
                            confirmButtonColor: '#6366f1',
                        }),
                });
            }
        });
    };

    const basePath = window.location.pathname.startsWith('/shortly-app')
        ? '/shortly-app'
        : '';
    const publicUrl = `${window.location.origin}${basePath}/u/${auth.user.username}`;

    const fallbackCopy = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            if (document.execCommand('copy')) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    const handleCopy = () => {
        if (!publicUrl) return;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(publicUrl)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => fallbackCopy(publicUrl));
        } else {
            fallbackCopy(publicUrl);
        }
    };

    const handleOpenPublic = () => {
        if (!auth.user.username) return;
        window.open(publicUrl, '_blank', 'noopener,noreferrer');
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        usernameForm.post(route('dashboard.username.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditingUsername(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Username diperbarui',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: (errors) => {
                const msg = Object.values(errors).flat().join('\n');
                Swal.fire({ icon: 'error', title: 'Gagal', text: msg });
            },
        });
    };

    const handleShortcutToggle = (id) => {
        let updated = [...shortcutsForm.data.shortcut_ids];
        if (updated.includes(id)) {
            updated = updated.filter((item) => item !== id);
            setOrderedShortcuts((prev) => prev.filter((s) => s.id !== id));
        } else {
            updated = [...updated, id];
            const shortcut = shortcuts.find((s) => s.id === id);
            if (shortcut) setOrderedShortcuts((prev) => [...prev, shortcut]);
        }
        shortcutsForm.setData('shortcut_ids', updated);
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const item = selectedShortcuts.find((s) => s.id === active.id);
        setActiveItem(item || null);
    };

    const handleShortcutsSubmit = (e) => {
        e.preventDefault();
        shortcutsForm.post(route('dashboard.shortcuts.update'), {
            preserveScroll: true,
            onSuccess: () =>
                Swal.fire({
                    icon: 'success',
                    title: 'Shortcuts diperbarui',
                    timer: 1500,
                    showConfirmButton: false,
                }),
            onError: (errors) => {
                const msg = Object.values(errors).flat().join('\n');
                Swal.fire({ icon: 'error', title: 'Gagal', text: msg });
            },
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = selectedShortcuts.findIndex((i) => i.id === active.id);
        const newIndex = selectedShortcuts.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(selectedShortcuts, oldIndex, newIndex);
        setOrderedShortcuts(newItems);
        router.put(
            route('shortcuts.reorder'),
            { shortcut_ids: newItems.map((i) => i.id) },
            {
                preserveScroll: true,
                onError: () => {
                    setOrderedShortcuts(
                        shortcuts.filter((s) => userShortcuts.includes(s.id)),
                    );
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Gagal menyimpan susunan.',
                        confirmButtonColor: '#6366f1',
                    });
                },
            },
        );
    };

    const activeCount = shortcutsForm.data.shortcut_ids.length;

    return (
        <AuthenticatedLayout
            title="Dashboard"
            subtitle="Kelola shortcut dan tautan publik Anda"
            searchQuery={globalFilter}
            setSearchQuery={setGlobalFilter}
            searchPlaceholder="Cari shortcut..."
            headerActions={
                <>
                    <span className="hidden items-center whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-neutral-300 lg:inline-flex">
                        {activeCount}/{shortcuts.length} aktif
                    </span>
                    <Link
                        href={route('shortcuts.create')}
                        className="flex shrink-0 items-center gap-1.5 rounded-xl border border-transparent bg-neutral-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:border-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 md:px-4 md:py-2.5"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">
                            Tambah Shortcut
                        </span>
                    </Link>
                </>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* ─── Top Bar: Public URL + Username ─── */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e]">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        {/* Public URL */}
                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-[#2d2d2d]">
                                <Globe className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                    Tautan Publik
                                </p>
                                <p className="select-all truncate font-mono text-xs text-neutral-600 dark:text-neutral-300">
                                    {publicUrl || 'Generating link...'}
                                </p>
                            </div>
                            <button
                                onClick={handleCopy}
                                disabled={!auth.user.username}
                                type="button"
                                className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 ${
                                    copied
                                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-300 dark:hover:bg-neutral-700'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />{' '}
                                        Tersalin
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" /> Salin
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleOpenPublic}
                                disabled={!auth.user.username}
                                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#ffc9bd] bg-[#ffe0da] px-3 py-2.5 text-xs font-bold text-[#e06c5b] transition-all hover:bg-[#ffd2c9] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#6b433c] dark:bg-[#4a2e2b] dark:text-[#ffb3a6] dark:hover:bg-[#5a3a35] sm:py-2"
                                title="Buka halaman publik"
                            >
                                <ExternalLink className="h-3.5 w-3.5" /> Buka
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="hidden h-10 w-px bg-neutral-200 dark:bg-neutral-700 md:block" />

                        {/* Username Inline Edit */}
                        <div className="flex shrink-0 items-center gap-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-[#2d2d2d]">
                                <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">
                                    /u/
                                </span>
                            </div>
                            {isEditingUsername ? (
                                <form
                                    onSubmit={handleUsernameSubmit}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        required
                                        autoFocus
                                        value={usernameForm.data.username}
                                        onChange={(e) =>
                                            usernameForm.setData(
                                                'username',
                                                e.target.value
                                                    .toLowerCase()
                                                    .replace(/[^a-z0-9-]/g, ''),
                                            )
                                        }
                                        className="w-36 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-bold text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:focus:border-white dark:focus:ring-white"
                                        placeholder="namalengkap"
                                    />
                                    <button
                                        type="submit"
                                        disabled={usernameForm.processing}
                                        className="rounded-xl bg-neutral-900 p-2.5 text-white transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 sm:p-2"
                                        title="Simpan"
                                    >
                                        {usernameForm.processing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="h-4 w-4" />
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditingUsername(false);
                                            usernameForm.setData(
                                                'username',
                                                auth.user.username || '',
                                            );
                                        }}
                                        className="rounded-xl bg-neutral-100 p-2.5 text-neutral-500 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-[#2d2d2d] dark:text-neutral-400 dark:hover:bg-neutral-700 sm:p-2"
                                        title="Batal"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </form>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
                                        {auth.user.username || 'belum diatur'}
                                    </p>
                                    <button
                                        onClick={() =>
                                            setIsEditingUsername(true)
                                        }
                                        className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-[#2d2d2d] dark:hover:text-neutral-200 sm:p-1.5"
                                        title="Edit username"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Shortcut Grid ─── */}

                {/* Empty state: tidak ada shortcut sama sekali */}
                {shortcuts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-[#1e1e1e]">
                            <Plus className="h-7 w-7 text-neutral-300 dark:text-neutral-600" />
                        </div>
                        <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                            Belum ada shortcut
                        </p>
                        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                            Klik "Tambah Shortcut" untuk membuat yang pertama
                        </p>
                    </div>
                )}

                {/* Empty state: search tapi tidak ada hasil */}
                {shortcuts.length > 0 &&
                    globalFilter.trim() &&
                    displayShortcuts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-[#1e1e1e]">
                                <Plus className="h-7 w-7 text-neutral-300 dark:text-neutral-600" />
                            </div>
                            <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                Tidak ditemukan
                            </p>
                            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                Coba kata kunci lain.
                            </p>
                        </div>
                    )}

                {/* Search mode: tampilkan semua (static, tanpa DnD) */}
                {globalFilter.trim() && displayShortcuts.length > 0 && (
                    <div className="grid-cards grid gap-3">
                        {displayShortcuts.map((shortcut) => (
                            <div
                                key={shortcut.id}
                                onClick={() =>
                                    handleShortcutToggle(shortcut.id)
                                }
                                className={`group relative flex cursor-pointer select-none items-center gap-3 rounded-xl border p-3.5 transition-all ${selectedIds.has(shortcut.id) ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900 dark:border-white dark:bg-[#2d2d2d] dark:ring-white' : 'border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:hover:bg-[#2d2d2d]/50'}`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr ${shortcut.color} shrink-0 border border-transparent text-white shadow-sm`}
                                >
                                    <DynamicIcon
                                        name={shortcut.icon}
                                        className="h-5 w-5"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-50">
                                        {shortcut.name}
                                    </p>
                                    <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-400">
                                        {shortcut.url}
                                    </p>
                                </div>
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${selectedIds.has(shortcut.id) ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 bg-transparent dark:border-neutral-700'}`}
                                >
                                    <Check
                                        className={`h-3 w-3 stroke-[3] transition-opacity ${selectedIds.has(shortcut.id) ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                </span>
                                {shortcut.user_id === auth.user.id && (
                                    <div
                                        className="flex shrink-0 items-center gap-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <a
                                            href={route(
                                                'shortcuts.edit',
                                                shortcut.id,
                                            )}
                                            onClick={(e) => e.stopPropagation()}
                                            className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-neutral-200 hover:text-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                                            title="Edit"
                                        >
                                            <Pencil className="h-3 w-3" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(shortcut.id);
                                            }}
                                            className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-600 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                                            title="Hapus"
                                        >
                                            <Trash className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Default mode: selected + available split */}
                {!globalFilter.trim() && shortcuts.length > 0 && (
                    <>
                        {/* Hint jika belum ada yang dipilih */}
                        {selectedShortcuts.length === 0 &&
                            availableShortcuts.length > 0 && (
                                <div className="py-6 text-center">
                                    <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500">
                                        Centang shortcut di bawah untuk
                                        menambahkannya ke dashboard Anda
                                    </p>
                                </div>
                            )}

                        {/* Selected shortcuts — DnD */}
                        {selectedShortcuts.length > 0 && (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={selectedShortcuts.map((s) => s.id)}
                                >
                                    <div className="grid-cards grid gap-3">
                                        {selectedShortcuts.map((shortcut) => (
                                            <SortableShortcut
                                                key={shortcut.id}
                                                shortcut={shortcut}
                                                isChecked={true}
                                                onToggle={handleShortcutToggle}
                                                onDelete={handleDelete}
                                                isOwner={
                                                    shortcut.user_id ===
                                                    auth.user.id
                                                }
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                                <DragOverlay dropAnimation={null}>
                                    {activeItem ? (
                                        <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 opacity-90 shadow-2xl ring-2 ring-neutral-900/20 dark:border-neutral-800 dark:bg-[#1e1e1e]">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr ${activeItem.color} shrink-0 text-white shadow-sm`}
                                            >
                                                <DynamicIcon
                                                    name={activeItem.icon}
                                                    className="h-5 w-5"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-bold text-neutral-900 dark:text-neutral-50">
                                                    {activeItem.name}
                                                </p>
                                                <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-400">
                                                    {activeItem.url}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </DragOverlay>
                            </DndContext>
                        )}

                        {/* Separator + Available shortcuts — static */}
                        {availableShortcuts.length > 0 && (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        Tersedia
                                    </span>
                                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                                </div>
                                <div className="grid-cards grid gap-3">
                                    {availableShortcuts.map((shortcut) => (
                                        <div
                                            key={shortcut.id}
                                            onClick={() =>
                                                handleShortcutToggle(
                                                    shortcut.id,
                                                )
                                            }
                                            className="group relative flex cursor-pointer select-none items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:hover:bg-[#2d2d2d]/50"
                                        >
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr ${shortcut.color} shrink-0 border border-transparent text-white shadow-sm`}
                                            >
                                                <DynamicIcon
                                                    name={shortcut.icon}
                                                    className="h-5 w-5"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-50">
                                                    {shortcut.name}
                                                </p>
                                                <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-400">
                                                    {shortcut.url}
                                                </p>
                                            </div>
                                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-neutral-300 bg-transparent transition-all dark:border-neutral-700">
                                                <Check className="h-3 w-3 stroke-[3] opacity-0" />
                                            </span>
                                            {shortcut.user_id ===
                                                auth.user.id && (
                                                <div
                                                    className="flex shrink-0 items-center gap-1"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <a
                                                        href={route(
                                                            'shortcuts.edit',
                                                            shortcut.id,
                                                        )}
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-neutral-200 hover:text-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-3 w-3" />
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(
                                                                shortcut.id,
                                                            );
                                                        }}
                                                        className="rounded-lg bg-neutral-100 p-1.5 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-600 dark:bg-[#2d2d2d] dark:text-neutral-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                                                        title="Hapus"
                                                    >
                                                        <Trash className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* ─── Save Button ─── */}
                {selectedShortcuts.length > 0 && (
                    <div className="flex justify-end pb-24 pt-2 md:pb-2">
                        <form onSubmit={handleShortcutsSubmit}>
                            <button
                                type="submit"
                                disabled={shortcutsForm.processing}
                                className="flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            >
                                {shortcutsForm.processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                Simpan Susunan
                            </button>
                        </form>
                    </div>
                )}

                {/* ─── FAB: Add Shortcut (Mobile only) ─── */}
                <Link
                    href={route('shortcuts.create')}
                    className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-all hover:shadow-xl active:scale-90 dark:bg-white dark:text-neutral-900 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 md:hidden"
                >
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
