import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import * as Icons from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                    <Icons.UserMinus className="w-4.5 h-4.5 text-red-500" />
                    Hapus Akun Anda
                </h2>

                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-400">
                    Setelah akun Anda dihapus, semua sumber daya dan data di dalamnya akan dihapus secara permanen.
                </p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
            >
                <Icons.Trash className="w-3.5 h-3.5" />
                Hapus Akun
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8 space-y-5">
                    <div className="flex items-center gap-2 text-red-600">
                        <Icons.AlertTriangle className="w-6 h-6 shrink-0" />
                        <h2 className="text-sm font-black uppercase tracking-wider">
                            Apakah Anda yakin ingin menghapus akun?
                        </h2>
                    </div>

                    <p className="text-xs text-neutral-400 dark:text-neutral-400 leading-relaxed">
                        Tindakan ini tidak dapat dibatalkan. Semua data pintasan dan profil Anda akan hilang secara permanen dari sistem. Masukkan kata sandi Anda untuk mengonfirmasi penghapusan akun.
                    </p>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Kata Sandi"
                            className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mb-1.5"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="w-full bg-neutral-50 dark:bg-[#2d2d2d] border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-50 outline-none transition-all"
                            isFocused
                            placeholder="Masukkan kata sandi Anda"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-[10px] font-bold text-red-500"
                        />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                        >
                            {processing ? (
                                <Icons.Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Icons.Trash className="w-3.5 h-3.5" />
                            )}
                            Hapus Akun Secara Permanen
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
