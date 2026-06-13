import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import * as Icons from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                    <Icons.Key className="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    Perbarui Kata Sandi
                </h2>

                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-400">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak demi keamanan.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                        className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-[10px] font-bold text-red-500"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2 text-[10px] font-bold text-red-500" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all placeholder-neutral-300 dark:placeholder-neutral-500"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-[10px] font-bold text-red-500"
                    />
                </div>

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
                        Simpan Password
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
