import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import * as Icons from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'PATCH',
            name: user.name,
            email: user.email,
            profile_photo: null,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_photo', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const selectNewPhoto = () => {
        photoInput.current.click();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                    <Icons.User className="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    Informasi Profil
                </h2>

                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-400">
                    Perbarui informasi akun Anda, alamat email, dan foto profil.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Profile Photo Upload Field */}
                <div>
                    <InputLabel value="Foto Profil (Mendukung GIF)" className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-2" />
                    
                    <input
                        type="file"
                        ref={photoInput}
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />

                    <div className="flex items-center gap-5 mt-2">
                        {/* Avatar Preview */}
                        <div className="relative group cursor-pointer" onClick={selectNewPhoto}>
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile Preview"
                                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-neutral-100 dark:ring-neutral-800 shadow-md transition-all group-hover:brightness-90"
                                />
                            ) : user.profile_photo_path ? (
                                <img
                                    src={`/storage/${user.profile_photo_path}`}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-neutral-100 dark:ring-neutral-800 shadow-md transition-all group-hover:brightness-90"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-2xl font-black ring-4 ring-neutral-100 dark:ring-neutral-800 shadow-md transition-all group-hover:brightness-95">
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </div>
                            )}

                            {/* Hover overlay camera icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icons.Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Upload Controls */}
                        <div className="space-y-1.5">
                            <button
                                type="button"
                                onClick={selectNewPhoto}
                                className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 border border-transparent dark:border-neutral-800"
                            >
                                Pilih Foto Baru
                            </button>
                            <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                                Format JPEG, PNG, JPG, atau GIF (Maks. 2MB)
                            </p>
                        </div>
                    </div>

                    <InputError className="mt-2 text-[10px] font-bold text-red-500" message={errors.profile_photo} />
                </div>

                {/* Name Input */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5" />

                    <TextInput
                        id="name"
                        className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 text-[10px] font-bold text-red-500" message={errors.name} />
                </div>

                {/* Email Input */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-[10px] font-bold text-red-500" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-xs text-neutral-800 dark:text-neutral-200">
                            Alamat email Anda belum terverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-xs text-neutral-500 underline hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-green-650 dark:text-green-450">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                    >
                        {processing ? (
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Icons.Save className="w-4 h-4" />
                        )}
                        Simpan Profil
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs text-neutral-400 dark:text-neutral-450 flex items-center gap-1 font-semibold">
                            <Icons.Check className="w-4 h-4 text-green-500 stroke-[3]" /> Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
