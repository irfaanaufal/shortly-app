import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Check, Key, Loader2, Save } from 'lucide-react';

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
                <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-50">
                    <Key className="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    Perbarui Kata Sandi
                </h2>

                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-400">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan
                    acak demi keamanan.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                        className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-[10px] font-bold text-red-500"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Kata Sandi Baru"
                        className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2 text-[10px] font-bold text-red-500"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-50 dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white"
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
                        className="hover:bg-neutral-850 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        {processing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
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
