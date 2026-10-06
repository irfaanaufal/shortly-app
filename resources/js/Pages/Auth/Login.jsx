import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : false,
    );

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });
    const { storage_url } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const inputClass = `box-border w-full rounded-xl border border-neutral-200 dark:border-neutral-700 ${isDesktop ? 'px-4 py-3 text-sm' : 'px-3.5 py-2.5 text-sm'} bg-white text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:bg-[#2d2d2d] dark:text-white dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white`;

    return (
        <div
            className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
        >
            <Head title="Masuk" />

            {/* ===== BLACK SECTION (Desktop left / Mobile top) ===== */}
            <div
                className={`${isDesktop ? 'flex-1' : 'h-[35vh] shrink-0'} relative flex items-center justify-center bg-black`}
            >
                <div className="absolute top-6 left-6 md:top-8 md:left-10 text-[13px] font-semibold tracking-[0.32em] text-white/90">
                    SHORTLY
                </div>
                <img
                    src={`${storage_url}/images/login.png`}
                    alt="Shortly"
                    className="oc-anim h-[60%] w-[60%] object-contain"
                    style={{
                        animation:
                            'oc-float 6s ease-in-out infinite, oc-glow 4s ease-in-out infinite',
                    }}
                />
                <a
                    href="https://heyzine.com/flip-book/94f3ccbd7e.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-white/30 no-underline transition-colors hover:text-white/60"
                >
                    Manual Book
                </a>
            </div>

            {/* ===== FORM SECTION (Desktop right / Mobile bottom) ===== */}
            <div
                className={`flex flex-1 bg-white dark:bg-[#1e1e1e] ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-6 pt-6'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-auto transition-colors duration-200`}
            >
                <div className={`w-full ${isDesktop ? 'max-w-[360px]' : ''}`}>
                    <h1
                        className="text-center text-[27px] text-neutral-900 dark:text-white"
                        style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                        Masuk
                    </h1>

                    {status && (
                        <div className="mt-6 text-center text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-3">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Email atau username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                placeholder="Email atau username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                                className={inputClass}
                            />
                            <InputError
                                message={errors.username}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Kata Sandi
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Kata Sandi"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className={inputClass}
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Ingat saya */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex cursor-pointer items-center gap-2 text-[12px] text-neutral-500 dark:text-neutral-400">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-3.5 w-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400 dark:border-neutral-600"
                                />
                                Ingat saya
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-2 w-full justify-center rounded-full border-0 bg-gray-900 py-3 text-[13px] font-semibold tracking-wide text-white shadow-none transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Masuk
                        </button>
                    </form>

                    {/* Footer: Lupa password? · Daftar */}
                    <div className="mt-5 flex items-center justify-center gap-3 text-[12px] text-neutral-500 dark:text-neutral-400">
                        <span className="text-neutral-300 dark:text-neutral-600">
                            ·
                        </span>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="transition hover:text-neutral-700 dark:hover:text-neutral-200"
                            >
                                Lupa password?
                            </Link>
                        )}
                        <Link
                            href={route('register')}
                            className="transition hover:text-neutral-700 dark:hover:text-neutral-200"
                        >
                            Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
