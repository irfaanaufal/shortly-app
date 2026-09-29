import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Camera, Check, Loader2, Save, User } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { auth } = usePage().props;
    const user = auth.user;
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
                <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-50">
                    <User className="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    Informasi Profil
                </h2>

                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-400">
                    Perbarui informasi akun Anda, alamat email, dan foto profil.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Profile Photo Upload Field */}
                <div>
                    <InputLabel
                        value="Foto Profil (Mendukung GIF)"
                        className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <input
                        type="file"
                        ref={photoInput}
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />

                    <div className="mt-2 flex items-center gap-5">
                        {/* Avatar Preview */}
                        <div
                            className="group relative cursor-pointer"
                            onClick={selectNewPhoto}
                        >
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile Preview"
                                    className="h-20 w-20 rounded-2xl object-cover shadow-md ring-4 ring-neutral-100 transition-all group-hover:brightness-90 dark:ring-neutral-800"
                                />
                            ) : user.profile_photo_url ? (
                                <img
                                    src={user.profile_photo_url}
                                    alt={user.name}
                                    className="h-20 w-20 rounded-2xl object-cover shadow-md ring-4 ring-neutral-100 transition-all group-hover:brightness-90 dark:ring-neutral-800"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 text-2xl font-black text-white shadow-md ring-4 ring-neutral-100 transition-all group-hover:brightness-95 dark:bg-white dark:text-neutral-900 dark:ring-neutral-800">
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </div>
                            )}

                            {/* Hover overlay camera icon */}
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                                <Camera className="h-6 w-6 text-white" />
                            </div>
                        </div>

                        {/* Upload Controls */}
                        <div className="space-y-1.5">
                            <button
                                type="button"
                                onClick={selectNewPhoto}
                                className="rounded-xl border border-transparent bg-neutral-900 px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:border-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            >
                                Pilih Foto Baru
                            </button>
                            <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                                Format JPEG, PNG, JPG, atau GIF (Maks. 2MB)
                            </p>
                        </div>
                    </div>

                    <InputError
                        className="mt-2 text-[10px] font-bold text-red-500"
                        message={errors.profile_photo}
                    />
                </div>

                {/* Name Input */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <TextInput
                        id="name"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError
                        className="mt-2 text-[10px] font-bold text-red-500"
                        message={errors.name}
                    />
                </div>

                {/* Email Input */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Alamat Email"
                        className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError
                        className="mt-2 text-[10px] font-bold text-red-500"
                        message={errors.email}
                    />
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
                                Klik di sini untuk mengirim ulang email
                                verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="text-green-650 dark:text-green-450 mt-2 text-xs font-bold">
                                Tautan verifikasi baru telah dikirim ke alamat
                                email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="hover:bg-neutral-850 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        {processing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
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
                        <p className="dark:text-neutral-450 flex items-center gap-1 text-xs font-semibold text-neutral-400">
                            <Check className="h-4 w-4 stroke-[3] text-green-500" />{' '}
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
