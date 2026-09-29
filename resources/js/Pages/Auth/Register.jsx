import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register() {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : false,
    );
    const [step, setStep] = useState('fid');
    const [fidData, setFidData] = useState(null);
    const [fidInput, setFidInput] = useState('');
    const [fidError, setFidError] = useState('');
    const [checking, setChecking] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        fid: '',
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const checkFid = async () => {
        if (!fidInput.trim()) return;
        setChecking(true);
        setFidError('');
        try {
            const response = await axios.get(
                route('register.check-karyawan', fidInput.trim()),
            );
            const result = response.data;

            if (result.success) {
                setFidData(result.karyawan);
                setData({
                    ...data,
                    fid: result.karyawan.fid,
                    name: result.karyawan.nama_karyawan,
                });
                setStep('register');
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Gagal menghubungkan ke server. Coba lagi.';
            setFidError(message);
        } finally {
            setChecking(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClass = `w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white bg-white dark:bg-[#2d2d2d] outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all placeholder-neutral-300 dark:placeholder-neutral-500`;
    const inputClassMobile = `w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-[13px] text-neutral-900 dark:text-white bg-white dark:bg-[#2d2d2d] outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all placeholder-neutral-300 dark:placeholder-neutral-500`;
    const inputClassReadonly = `w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white bg-neutral-100 dark:bg-[#252525] outline-none`;

    if (step === 'fid') {
        return (
            <div
                className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
            >
                <Head title="Register" />

                {/* ===== BLACK SECTION ===== */}
                <div
                    className={`${isDesktop ? 'flex-1' : 'h-[22vh] shrink-0'} relative flex items-center justify-center bg-black`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={isDesktop ? 150 : 60}
                        height={isDesktop ? 150 : 60}
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

                {/* ===== FORM SECTION ===== */}
                <div
                    className={`flex flex-1 bg-white dark:bg-[#1e1e1e] ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-auto transition-colors duration-200`}
                >
                    <div
                        className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}
                    >
                        <h1
                            className={`${isDesktop ? 'text-[28px]' : 'text-[22px]'} text-center font-bold text-neutral-900 dark:text-white ${isDesktop ? 'mb-5' : 'mb-4'} tracking-tight`}
                        >
                            Cek FID Karyawan
                        </h1>
                        <p
                            className={`${isDesktop ? 'text-[13px]' : 'text-[11px]'} text-center text-neutral-500 dark:text-neutral-400 ${isDesktop ? 'mb-6' : 'mb-4'}`}
                        >
                            Masukkan FID Anda untuk memverifikasi data karyawan.
                        </p>

                        <div className="mb-3">
                            <label
                                htmlFor="fid"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                FID
                            </label>
                            <input
                                id="fid"
                                value={fidInput}
                                placeholder="Masukkan FID"
                                autoFocus
                                onChange={(e) => setFidInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') checkFid();
                                }}
                                className={
                                    isDesktop ? inputClass : inputClassMobile
                                }
                            />
                            {fidError && (
                                <p className="mt-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                                    {fidError}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={checking || !fidInput.trim()}
                            onClick={checkFid}
                            className={`w-full rounded-xl border-none bg-black text-white dark:bg-white dark:text-black ${isDesktop ? 'mt-5 py-3.5 text-base' : 'mt-3 py-2.5 text-sm'} font-semibold tracking-wide transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                            {checking ? 'Memeriksa...' : 'Lanjutkan'}
                        </button>

                        <p
                            className={`text-center ${isDesktop ? 'text-sm' : 'text-[11px]'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-4'} mb-0`}
                        >
                            Already registered?{' '}
                            <Link
                                href={route('login')}
                                className="font-bold text-neutral-900 no-underline hover:underline dark:text-white"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
        >
            <Head title="Register" />

            {/* ===== BLACK SECTION ===== */}
            <div
                className={`${isDesktop ? 'flex-1' : 'h-[22vh] shrink-0'} relative flex items-center justify-center bg-black`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isDesktop ? 150 : 60}
                    height={isDesktop ? 150 : 60}
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

            {/* ===== FORM SECTION ===== */}
            <div
                className={`flex flex-1 bg-white dark:bg-[#1e1e1e] ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-auto transition-colors duration-200`}
            >
                <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                    <h1
                        className={`${isDesktop ? 'text-[32px]' : 'text-[22px]'} text-center font-bold text-neutral-900 dark:text-white ${isDesktop ? 'mb-5' : 'mb-3'} tracking-tight`}
                    >
                        Register
                    </h1>

                    {fidData && (
                        <div
                            className={`rounded-xl bg-neutral-100 dark:bg-[#2d2d2d] ${isDesktop ? 'mb-4 px-4 py-3 text-[13px]' : 'mb-2.5 px-3 py-2 text-[11px]'} text-neutral-700 dark:text-neutral-300`}
                        >
                            <strong>{fidData.nama_karyawan}</strong> —{' '}
                            {fidData.divisi} (FID: {fidData.fid})
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className={`flex flex-col ${!isDesktop ? 'flex-1' : ''}`}
                    >
                        {/* Name */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label
                                htmlFor="name"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Enter name"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                                readOnly
                                className={
                                    isDesktop
                                        ? inputClassReadonly
                                        : `${inputClassReadonly} !py-2.5 !text-[13px]`
                                }
                            />
                            <InputError
                                message={errors.name}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Username */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label
                                htmlFor="username"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                value={data.username}
                                placeholder="Enter username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData(
                                        'username',
                                        e.target.value
                                            .toLowerCase()
                                            .replace(/[^a-z0-9-]/g, ''),
                                    )
                                }
                                required
                                className={
                                    isDesktop ? inputClass : inputClassMobile
                                }
                            />
                            <InputError
                                message={errors.username}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Email */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label
                                htmlFor="email"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Enter email"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                                className={
                                    isDesktop ? inputClass : inputClassMobile
                                }
                            />
                            <InputError
                                message={errors.email}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Password */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label
                                htmlFor="password"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Enter password"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                                className={
                                    isDesktop ? inputClass : inputClassMobile
                                }
                            />
                            <InputError
                                message={errors.password}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                                className={
                                    isDesktop ? inputClass : inputClassMobile
                                }
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className={isDesktop ? 'mt-2' : 'mt-1'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full rounded-xl border-none bg-black text-white dark:bg-white dark:text-black ${isDesktop ? 'mt-5 py-3.5 text-base' : 'mt-3.5 py-2.5 text-sm'} font-semibold tracking-wide transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                            Register
                        </button>
                    </form>

                    <p
                        className={`text-center ${isDesktop ? 'text-sm' : 'text-[11px]'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-4'} mb-0`}
                    >
                        Already registered?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-neutral-900 no-underline hover:underline dark:text-white"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
