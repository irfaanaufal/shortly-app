import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Login({ status, canResetPassword }) {
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

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

    useEffect(() => {
        if (errors.activation_needed) {
            Swal.fire({
                icon: 'warning',
                title: 'Akun Belum Diaktifkan',
                text: errors.activation_needed,
                confirmButtonText: 'Hubungi Tim IT',
                confirmButtonColor: '#6366f1',
            });
        }
    }, [errors]);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className={`h-screen flex ${isDesktop ? 'flex-row' : 'flex-col'} bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif] overflow-hidden`}>
            <Head title="Log in" />

            {/* ===== BLACK SECTION (Desktop left / Mobile top) ===== */}
            <div className={`${isDesktop ? 'flex-1' : 'shrink-0 h-[35vh]'} bg-black flex items-center justify-center relative`}>
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-white/30 hover:text-white/60 transition-colors no-underline"
                >
                    Manual Book
                </a>
            </div>

            {/* ===== FORM SECTION (Desktop right / Mobile bottom) ===== */}
            <div className={`flex-1 bg-white dark:bg-[#1e1e1e] flex ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-6 pt-6'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-hidden transition-colors duration-200`}>
                <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                    <h1 className={`${isDesktop ? 'text-[32px]' : 'text-2xl'} font-bold text-neutral-900 dark:text-white text-center ${isDesktop ? 'mb-8' : 'mb-5'} tracking-tight`}>
                        Login
                    </h1>

                    {status && (
                        <div className={`${isDesktop ? 'mb-5' : 'mb-3'} text-sm font-medium text-green-600 dark:text-green-400`}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className={`flex flex-col ${!isDesktop ? 'flex-1' : ''}`}>
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
                                onChange={(e) => setData('username', e.target.value)}
                                className={`w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl ${isDesktop ? 'px-4 py-3 text-[15px]' : 'px-3.5 py-2.5 text-sm'} text-neutral-900 dark:text-white bg-white dark:bg-[#2d2d2d] outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all placeholder-neutral-300 dark:placeholder-neutral-500`}
                            />
                            <InputError message={errors.username} className={isDesktop ? 'mt-2' : 'mt-1'} />
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
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl ${isDesktop ? 'px-4 py-3 text-[15px]' : 'px-3.5 py-2.5 text-sm'} text-neutral-900 dark:text-white bg-white dark:bg-[#2d2d2d] outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all placeholder-neutral-300 dark:placeholder-neutral-500`}
                            />
                            <InputError message={errors.password} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Forgot Password */}
                        <div className={`text-right ${isDesktop ? 'my-6' : 'my-4'}`}>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className={`${isDesktop ? 'text-[13px]' : 'text-[11px]'} text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors no-underline`}
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full bg-black dark:bg-white dark:text-black text-white border-none rounded-xl ${isDesktop ? 'py-3.5 text-base' : 'py-3 text-[15px]'} font-semibold tracking-wide cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Login
                        </button>
                    </form>

                    <p className={`text-center ${isDesktop ? 'text-sm' : 'text-xs'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-5'} mb-0`}>
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-neutral-900 dark:text-white font-bold no-underline hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
