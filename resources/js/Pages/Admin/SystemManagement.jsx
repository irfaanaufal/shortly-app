import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Eye,
    EyeOff,
    Loader2,
    MoreVertical,
    Pencil,
    Plus,
    Save,
    Server,
    Trash,
    X,
    ArrowUp,
    ArrowDown,
    ChevronsUpDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { PRESET_ICONS, PRESET_COLORS } from '@/utils/presets';
import { formatUrl, cleanUrlInput } from '@/utils/url';
import DynamicIcon from '@/Components/DynamicIcon';

function SortIcon({ sorted }) {
    if (sorted === 'asc') return <ArrowUp className="h-3 w-3" />;
    if (sorted === 'desc') return <ArrowDown className="h-3 w-3" />;
    return <ChevronsUpDown className="h-3 w-3 opacity-30" />;
}

function SystemForm({ system, onClose, onSuccess }) {
    const isEdit = !!system;
    const { data, setData, post, put, processing, errors, transform } = useForm(
        {
            nama_sistem: system?.nama_sistem || '',
            link_sistem: system ? cleanUrlInput(system.link_sistem || '') : '',
            icon: system?.icon || 'Server',
            color: system?.color || 'from-blue-500 to-cyan-400',
        },
    );

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
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70"
                onClick={onClose}
            />
            <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#1e1e1e]">
                <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-neutral-900 p-2 text-white dark:bg-white dark:text-neutral-900">
                            {isEdit ? (
                                <Pencil className="h-4 w-4" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                                {isEdit ? 'Ubah Sistem' : 'Tambah Sistem Baru'}
                            </h3>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                {isEdit
                                    ? 'Perbarui detail sistem yang sudah ada.'
                                    : 'Buat sistem baru yang bisa diakses semua user.'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                            Nama Sistem <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={data.nama_sistem}
                            onChange={(e) =>
                                setData('nama_sistem', e.target.value)
                            }
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:focus:border-white dark:focus:ring-white"
                            placeholder="Contoh: Absensi Meeting, HRD System"
                        />
                        {errors.nama_sistem && (
                            <p className="mt-1 text-[11px] font-bold text-red-500">
                                {errors.nama_sistem}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                            URL Sistem
                        </label>
                        <div className="flex overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 transition-all focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:focus-within:border-white dark:focus-within:ring-white">
                            <span className="inline-flex shrink-0 select-none items-center border-r border-neutral-200 bg-neutral-100 px-4 py-3 font-mono text-sm text-neutral-500 dark:border-neutral-700 dark:bg-[#222222] dark:text-neutral-400">
                                <span className="hidden sm:inline">
                                    https://sindangasih-makmur.com
                                </span>
                                <span className="sm:hidden">
                                    sindangasih-makmur.com
                                </span>
                            </span>
                            <input
                                type="text"
                                value={data.link_sistem}
                                onChange={(e) =>
                                    setData(
                                        'link_sistem',
                                        cleanUrlInput(e.target.value),
                                    )
                                }
                                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-0 dark:text-neutral-50 dark:placeholder-neutral-500"
                                placeholder="/path atau path"
                            />
                        </div>
                        {data.link_sistem && (
                            <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                                Preview:{' '}
                                <span className="break-all font-mono text-neutral-600 dark:text-neutral-300">
                                    {formatUrl(data.link_sistem)}
                                </span>
                            </p>
                        )}
                        {errors.link_sistem && (
                            <p className="mt-1 text-[11px] font-bold text-red-500">
                                {errors.link_sistem}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                Pilih Ikon{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                                {PRESET_ICONS.length} ikon
                            </span>
                        </div>
                        <div className="grid max-h-[320px] grid-cols-4 gap-2.5 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-[#2d2d2d] sm:grid-cols-5 md:grid-cols-8">
                            {PRESET_ICONS.map((iconName) => {
                                const isSelected = data.icon === iconName;
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() =>
                                            setData('icon', iconName)
                                        }
                                        title={iconName}
                                        className={`flex items-center justify-center rounded-xl border p-3 transition-all ${
                                            isSelected
                                                ? 'scale-105 border-neutral-900 bg-neutral-900 text-white shadow-md dark:border-white dark:bg-white dark:text-neutral-900'
                                                : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-400 dark:hover:bg-[#252525]'
                                        }`}
                                    >
                                        <DynamicIcon
                                            name={iconName}
                                            className="h-5 w-5"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {errors.icon && (
                            <p className="mt-1 text-[11px] font-bold text-red-500">
                                {errors.icon}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                            Gradasi Warna{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="grid max-h-[320px] grid-cols-6 gap-2 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-[#2d2d2d] sm:grid-cols-8 md:grid-cols-10">
                            {PRESET_COLORS.map((colorObj) => {
                                const isSelected =
                                    data.color === colorObj.value;
                                return (
                                    <button
                                        key={colorObj.value}
                                        type="button"
                                        onClick={() =>
                                            setData('color', colorObj.value)
                                        }
                                        title={colorObj.name}
                                        className={`aspect-square rounded-lg bg-gradient-to-tr ${colorObj.value} border-2 transition-all ${
                                            isSelected
                                                ? 'scale-110 border-neutral-900 shadow-lg ring-2 ring-neutral-900/20 dark:border-white dark:ring-white/20'
                                                : 'border-transparent hover:scale-105 hover:shadow-md'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                        {errors.color && (
                            <p className="mt-1 text-[11px] font-bold text-red-500">
                                {errors.color}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-xs font-bold text-neutral-700 transition-all hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="hover:bg-neutral-850 flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                        >
                            {processing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
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
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handler = () => {
            setEditingSystem(null);
            setShowForm(true);
        };
        window.addEventListener('open-add-system-modal', handler);
        return () =>
            window.removeEventListener('open-add-system-modal', handler);
    }, []);

    const handleDelete = (system) => {
        Swal.fire({
            icon: 'warning',
            title: 'Hapus Sistem?',
            text: `Apakah Anda yakin ingin menghapus "${system.nama_sistem}"? Shortcut terkait akan diputus dari sistem ini.`,
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.systems.destroy', system.id), {
                    preserveScroll: true,
                    onError: () =>
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Gagal menghapus sistem.',
                            confirmButtonColor: '#6366f1',
                        }),
                });
            }
        });
    };

    const handleToggle = (system) => {
        router.patch(
            route('admin.systems.toggle', system.id),
            {},
            {
                preserveScroll: true,
                onError: () =>
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: 'Gagal mengubah status sistem.',
                        confirmButtonColor: '#6366f1',
                    }),
            },
        );
    };

    const handleEdit = (system) => {
        setEditingSystem(system);
        setShowForm(true);
    };

    const columns = [
        {
            id: 'no',
            header: '#',
            meta: { className: 'w-10' },
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'nama_sistem',
            header: 'Sistem',
            enableSorting: true,
            cell: (info) => {
                const s = info.row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${s.color} flex shrink-0 items-center justify-center`}
                        >
                            <DynamicIcon
                                name={s.icon}
                                className="h-4 w-4 text-white"
                            />
                        </div>
                        <span className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-50">
                            {s.nama_sistem}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            enableSorting: true,
            sortingFn: (rowA, rowB) =>
                (rowA.original.is_active ? 1 : 0) -
                (rowB.original.is_active ? 1 : 0),
            cell: (info) => {
                const active = info.getValue();
                return (
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            active
                                ? 'border border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'border border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                        }`}
                    >
                        {active ? 'Aktif' : 'Nonaktif'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'link_sistem',
            header: 'URL',
            enableSorting: false,
            meta: { className: 'hidden sm:table-cell' },
            cell: (info) => {
                const val = info.getValue();
                return val ? (
                    <span
                        className="block max-w-[200px] truncate font-mono text-[11px] text-neutral-400 dark:text-neutral-500"
                        title={val}
                    >
                        {val}
                    </span>
                ) : null;
            },
        },
        {
            id: 'aksi',
            header: 'Aksi',
            enableSorting: false,
            cell: (info) => {
                const s = info.row.original;
                return (
                    <div className="flex items-center justify-center gap-1">
                        <button
                            onClick={() => handleToggle(s)}
                            className={`rounded-lg border p-2 transition-all active:scale-90 sm:p-1.5 ${
                                s.is_active
                                    ? 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                                    : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-400 dark:hover:bg-neutral-800'
                            }`}
                            title={s.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                            {s.is_active ? (
                                <Eye className="h-3.5 w-3.5" />
                            ) : (
                                <EyeOff className="h-3.5 w-3.5" />
                            )}
                        </button>
                        <button
                            onClick={() => handleEdit(s)}
                            className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-neutral-600 transition-all hover:bg-neutral-200 hover:text-neutral-900 active:scale-90 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-400 dark:hover:bg-[#1e1e1e] dark:hover:text-white sm:p-1.5"
                            title="Ubah"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                            onClick={() => handleDelete(s)}
                            className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-red-600 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-90 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-200 sm:p-1.5"
                            title="Hapus"
                        >
                            <Trash className="h-3.5 w-3.5" />
                        </button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: systems,
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 11 } },
    });

    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const getPageNumbers = () => {
        const pages = [];
        const totalPages = table.getPageCount();
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else if (pageIndex <= 2) {
            for (let i = 0; i < 5; i++) pages.push(i);
        } else if (pageIndex >= totalPages - 3) {
            for (let i = totalPages - 5; i < totalPages; i++) pages.push(i);
        } else {
            for (let i = pageIndex - 2; i <= pageIndex + 2; i++) pages.push(i);
        }
        return pages;
    };

    return (
        <AuthenticatedLayout
            title="Kelola Sistem"
            subtitle="Kelola daftar sistem/aplikasi yang tersedia"
            searchQuery={globalFilter}
            setSearchQuery={setGlobalFilter}
            searchPlaceholder="Cari sistem berdasarkan nama..."
            headerActions={
                <>
                    <span className="hidden items-center whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-neutral-300 lg:inline-flex">
                        {systems.length} sistem
                    </span>
                    <button
                        onClick={() => {
                            setEditingSystem(null);
                            setShowForm(true);
                        }}
                        className="flex shrink-0 items-center gap-1.5 rounded-xl border border-transparent bg-neutral-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:border-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 md:px-4 md:py-2.5"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Tambah Sistem</span>
                    </button>
                </>
            }
        >
            <Head title="Kelola Sistem" />

            <div className="flex h-full min-h-0 flex-1 flex-col py-1">
                <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e]">
                    {/* ─── MOBILE: Card Grid ─── */}
                    <div className="min-h-0 flex-1 divide-y divide-neutral-100 overflow-y-auto dark:divide-neutral-800/50 sm:hidden">
                        {table.getRowModel().rows.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-[#2d2d2d]">
                                    <Server className="h-6 w-6 text-neutral-300 dark:text-neutral-600" />
                                </div>
                                <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                    {systems.length === 0
                                        ? 'Belum ada sistem'
                                        : 'Tidak ditemukan'}
                                </p>
                                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                    {systems.length === 0
                                        ? 'Klik "Tambah" untuk membuat yang pertama.'
                                        : 'Coba kata kunci pencarian lain.'}
                                </p>
                            </div>
                        ) : (
                            table.getRowModel().rows.map((row) => {
                                const s = row.original;
                                const isDropdownOpen = openDropdownId === s.id;
                                return (
                                    <div key={row.id} className="px-4 py-3.5">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${s.color} flex shrink-0 items-center justify-center shadow-sm`}
                                            >
                                                <DynamicIcon
                                                    name={s.icon}
                                                    className="h-5 w-5 text-white"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-50">
                                                        {s.nama_sistem}
                                                    </p>
                                                    <span
                                                        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                            s.is_active
                                                                ? 'border border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'border border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                                                        }`}
                                                    >
                                                        {s.is_active
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </span>
                                                </div>
                                                {s.link_sistem && (
                                                    <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                                                        {s.link_sistem}
                                                    </p>
                                                )}
                                            </div>
                                            <div
                                                className="relative shrink-0"
                                                ref={
                                                    isDropdownOpen
                                                        ? dropdownRef
                                                        : undefined
                                                }
                                            >
                                                <button
                                                    onClick={() =>
                                                        setOpenDropdownId(
                                                            isDropdownOpen
                                                                ? null
                                                                : s.id,
                                                        )
                                                    }
                                                    className="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-neutral-100 dark:text-neutral-500 dark:hover:bg-neutral-800"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                                {isDropdownOpen && (
                                                    <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-[#2d2d2d]">
                                                        <button
                                                            onClick={() => {
                                                                handleToggle(s);
                                                                setOpenDropdownId(
                                                                    null,
                                                                );
                                                            }}
                                                            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${
                                                                s.is_active
                                                                    ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30'
                                                                    : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800'
                                                            }`}
                                                        >
                                                            {s.is_active ? (
                                                                <EyeOff className="h-3.5 w-3.5" />
                                                            ) : (
                                                                <Eye className="h-3.5 w-3.5" />
                                                            )}
                                                            {s.is_active
                                                                ? 'Nonaktifkan'
                                                                : 'Aktifkan'}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                handleEdit(s);
                                                                setOpenDropdownId(
                                                                    null,
                                                                );
                                                            }}
                                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-neutral-600 transition-colors hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                handleDelete(s);
                                                                setOpenDropdownId(
                                                                    null,
                                                                );
                                                            }}
                                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* ─── DESKTOP: Table ─── */}
                    <div className="hidden min-h-0 flex-1 overflow-x-auto sm:block">
                        <table className="w-full text-left">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id}
                                        className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-[#2d2d2d]/50"
                                    >
                                        {headerGroup.headers.map((header) => {
                                            const meta =
                                                header.column.columnDef.meta;
                                            return (
                                                <th
                                                    key={header.id}
                                                    className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ${meta?.className || ''} ${header.column.getCanSort() ? 'cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-300' : ''}`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                        {header.column.getCanSort() && (
                                                            <SortIcon
                                                                sorted={header.column.getIsSorted()}
                                                            />
                                                        )}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800/50">
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length}>
                                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-[#2d2d2d]">
                                                    <Server className="h-6 w-6 text-neutral-300 dark:text-neutral-600" />
                                                </div>
                                                <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                                    {systems.length === 0
                                                        ? 'Belum ada sistem'
                                                        : 'Tidak ditemukan'}
                                                </p>
                                                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                                    {systems.length === 0
                                                        ? 'Klik "Tambah Sistem" untuk membuat yang pertama.'
                                                        : 'Coba kata kunci pencarian lain.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="transition-colors hover:bg-neutral-50 dark:hover:bg-[#2d2d2d]/30"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    const meta =
                                                        cell.column.columnDef
                                                            .meta;
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className={`px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 ${meta?.className || ''}`}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {systems.length > 0 && (
                        <div className="flex shrink-0 flex-col items-center justify-between gap-3 border-t border-neutral-100 bg-neutral-50/50 px-4 py-2.5 dark:border-neutral-800 dark:bg-[#202020] sm:flex-row">
                            <div className="flex items-center gap-3">
                                <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                                    Menampilkan{' '}
                                    {table.getFilteredRowModel().rows.length ===
                                    0
                                        ? 0
                                        : pageIndex * pageSize + 1}
                                    –
                                    {Math.min(
                                        (pageIndex + 1) * pageSize,
                                        table.getFilteredRowModel().rows.length,
                                    )}{' '}
                                    dari{' '}
                                    {table.getFilteredRowModel().rows.length}{' '}
                                    data
                                </p>
                                <div className="hidden items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 sm:flex">
                                    <span className="text-[10px] font-semibold text-neutral-400">
                                        Baris:
                                    </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) =>
                                            table.setPageSize(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-2 py-0.5 text-xs text-neutral-800 outline-none dark:border-neutral-700 dark:bg-[#2a2a2a] dark:text-neutral-200"
                                    >
                                        {[11, 22, 33].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {table.getPageCount() > 1 && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        className="rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition-all hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                    >
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                    </button>
                                    {getPageNumbers().map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() =>
                                                table.setPageIndex(pageNum)
                                            }
                                            className={`h-7 w-7 rounded-lg text-[11px] font-bold transition-all ${
                                                pageIndex === pageNum
                                                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                                    : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                                            }`}
                                        >
                                            {pageNum + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        className="rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition-all hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                    >
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showForm && (
                <SystemForm
                    system={editingSystem}
                    onClose={() => {
                        setShowForm(false);
                        setEditingSystem(null);
                    }}
                    onSuccess={() => {
                        setShowForm(false);
                        setEditingSystem(null);
                    }}
                />
            )}
        </AuthenticatedLayout>
    );
}
