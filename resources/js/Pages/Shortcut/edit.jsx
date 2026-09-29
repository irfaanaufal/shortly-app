import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PRESET_ICONS, PRESET_COLORS } from '@/utils/presets';
import { formatUrl, cleanUrlInput, stripBaseUrl } from '@/utils/url';
import DynamicIcon from '@/Components/DynamicIcon';
import { ChevronRight, Loader2, Pencil, Save } from 'lucide-react';

export default function Edit({ shortcut }) {
    const { data, setData, put, processing, errors, transform } = useForm({
        name: shortcut.name || '',
        url: stripBaseUrl(shortcut.url || ''),
        description: shortcut.description || '',
        icon: shortcut.icon || 'Link2',
        color: shortcut.color || 'from-blue-500 to-cyan-400',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            url: formatUrl(data.url),
        }));
        put(route('shortcuts.update', shortcut.id));
    };

    return (
        <AuthenticatedLayout
            title="Ubah Shortcut"
            subtitle="Perbarui informasi shortcut"
        >
            <Head title={`Ubah Shortcut: ${shortcut.name}`} />

            <div className="bg-neutral-50 px-4 py-12 antialiased transition-colors duration-200 dark:bg-[#121212] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    {/* Header Path */}
                    <div className="text-neutral-450 mb-6 flex items-center gap-2 text-xs font-semibold dark:text-neutral-500">
                        <Link
                            href={route('dashboard')}
                            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                        >
                            Dashboard
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-neutral-900 dark:text-neutral-50">
                            Ubah Shortcut
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-[#1e1e1e]">
                        {/* Title Header */}
                        <div className="flex items-center gap-3 border-b border-neutral-100 bg-neutral-50/50 px-4 py-4 dark:border-neutral-800 dark:bg-[#1a1a1a]/50 sm:px-8 sm:py-6">
                            <div className="rounded-xl bg-neutral-900 p-2 text-white dark:bg-white dark:text-neutral-900">
                                <Pencil className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                                    Ubah Shortcut
                                </h2>
                                <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-400">
                                    Sesuaikan detail, deskripsi, warna, atau
                                    ikon untuk pintasan ini.
                                </p>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 p-4 sm:p-8"
                        >
                            {/* Input Nama */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                    Nama Aplikasi / Shortcut{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                                    placeholder="Contoh: Admin, CeklisQC, Absensi"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-[11px] font-bold text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Input URL */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                    Tautan URL{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.url}
                                    onChange={(e) =>
                                        setData(
                                            'url',
                                            cleanUrlInput(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                                    placeholder="/path atau path"
                                />
                                {data.url && (
                                    <div className="mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                                        Preview URL:{' '}
                                        <span className="break-all font-mono text-neutral-600 dark:text-neutral-300">
                                            {formatUrl(data.url)}
                                        </span>
                                    </div>
                                )}
                                {errors.url && (
                                    <p className="mt-1.5 text-[11px] font-bold text-red-500">
                                        {errors.url}
                                    </p>
                                )}
                            </div>

                            {/* Input Deskripsi */}
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                    Deskripsi Singkat (Opsional)
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="min-h-[90px] w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                                    placeholder="Deskripsi fungsi shortcut ini..."
                                />
                                {errors.description && (
                                    <p className="mt-1.5 text-[11px] font-bold text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Pemilihan Icon Preset */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                    Pilih Ikon{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="grid-tiles grid max-h-[320px] gap-2.5 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-[#2d2d2d]">
                                    {PRESET_ICONS.map((iconName) => {
                                        const isSelected =
                                            data.icon === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() =>
                                                    setData('icon', iconName)
                                                }
                                                className={`flex aspect-square items-center justify-center rounded-xl border p-3 transition-all ${
                                                    isSelected
                                                        ? 'scale-105 border-neutral-900 bg-neutral-900 text-white shadow-md dark:border-white dark:bg-white dark:text-neutral-900'
                                                        : 'dark:hover:bg-neutral-850 border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1e1e1e] dark:text-neutral-400'
                                                }`}
                                                title={iconName}
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
                                    <p className="mt-1.5 text-[11px] font-bold text-red-500">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            {/* Pemilihan Warna Preset */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
                                    Gradasi Warna Latar{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="grid-tiles grid max-h-[320px] gap-2 overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-[#2d2d2d] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
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
                                                        ? 'scale-110 border-neutral-900 shadow-lg ring-2 ring-neutral-900/20 dark:border-white dark:ring-white/20'
                                                        : 'border-transparent hover:scale-105 hover:shadow-md'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                                {errors.color && (
                                    <p className="mt-1.5 text-[11px] font-bold text-red-500">
                                        {errors.color}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-xl border border-neutral-200 px-6 py-3 text-xs font-bold text-neutral-700 transition-all hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover:bg-neutral-850 flex items-center gap-2 rounded-xl bg-neutral-900 px-8 py-3 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                                >
                                    {processing ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
