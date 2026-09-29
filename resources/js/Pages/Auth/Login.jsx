import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
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

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div
            className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
        >
            <Head title="Log in" />

            {/* ===== BLACK SECTION (Desktop left / Mobile top) ===== */}
            <div
                className={`${isDesktop ? 'flex-1' : 'h-[35vh] shrink-0'} relative flex items-center justify-center bg-black`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isDesktop ? 150 : 70}
                    height={isDesktop ? 150 : 70}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
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
                <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                    <h1
                        className={`${isDesktop ? 'text-[32px]' : 'text-2xl'} text-center font-bold text-neutral-900 dark:text-white ${isDesktop ? 'mb-8' : 'mb-5'} tracking-tight`}
                    >
                        Login
                    </h1>

                    {status && (
                        <div
                            className={`${isDesktop ? 'mb-5' : 'mb-3'} text-sm font-medium text-green-600 dark:text-green-400`}
                        >
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className={`flex flex-col ${!isDesktop ? 'flex-1' : ''}`}
                    >
                        {/* Username */}
                        <div className={isDesktop ? 'mb-4' : 'mb-3'}>
                            <label
                                htmlFor="username"
                                className={`block ${isDesktop ? 'text-sm' : 'text-[13px]'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                placeholder="Enter username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                                className={`box-border w-full rounded-xl border border-neutral-200 dark:border-neutral-700 ${isDesktop ? 'px-4 py-3 text-[15px]' : 'px-3.5 py-2.5 text-sm'} bg-white text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:bg-[#2d2d2d] dark:text-white dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white`}
                            />
                            <InputError
                                message={errors.username}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className={`block ${isDesktop ? 'text-sm' : 'text-[13px]'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className={`box-border w-full rounded-xl border border-neutral-200 dark:border-neutral-700 ${isDesktop ? 'px-4 py-3 text-[15px]' : 'px-3.5 py-2.5 text-sm'} bg-white text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:bg-[#2d2d2d] dark:text-white dark:placeholder-neutral-500 dark:focus:border-white dark:focus:ring-white`}
                            />
                            <InputError
                                message={errors.password}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Forgot Password */}
                        <div
                            className={`text-right ${isDesktop ? 'my-6' : 'my-4'}`}
                        >
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className={`${isDesktop ? 'text-[13px]' : 'text-[11px]'} text-neutral-400 no-underline transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300`}
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full rounded-xl border-none bg-black text-white dark:bg-white dark:text-black ${isDesktop ? 'py-3.5 text-base' : 'py-3 text-[15px]'} cursor-pointer font-semibold tracking-wide transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                            Login
                        </button>
                    </form>

                    <p
                        className={`text-center ${isDesktop ? 'text-sm' : 'text-xs'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-5'} mb-0`}
                    >
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-neutral-900 no-underline hover:underline dark:text-white"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
