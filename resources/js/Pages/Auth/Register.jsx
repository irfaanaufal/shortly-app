import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
    const { storage_url } = usePage().props;

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
    const inputClassMobile = `w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-neutral-900 dark:text-white bg-white dark:bg-[#2d2d2d] outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all placeholder-neutral-300 dark:placeholder-neutral-500`;
    const inputClassReadonly = `w-full box-border border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white bg-neutral-100 dark:bg-[#252525] outline-none`;
    const titleClass = `text-center text-[27px] text-neutral-900 dark:text-white`;
    const titleStyle = { fontFamily: "'Newsreader', Georgia, serif" };
    const buttonClass = `mt-2 w-full justify-center rounded-full border-0 bg-gray-900 py-3 text-[13px] font-semibold tracking-wide text-white shadow-none transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60`;
    const footerClass = `mt-5 flex items-center justify-center text-[12px] text-neutral-500 dark:text-neutral-400`;
    const footerLinkClass = `transition hover:text-neutral-700 dark:hover:text-neutral-200`;

    if (step === 'fid') {
        return (
            <div
                className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
            >
                <Head title="Daftar" />

                {/* ===== BLACK SECTION ===== */}
                <div
                    className={`${isDesktop ? 'flex-1' : 'h-[22vh] shrink-0'} relative flex items-center justify-center bg-black`}
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

                {/* ===== FORM SECTION ===== */}
                <div
                    className={`flex flex-1 bg-white dark:bg-[#1e1e1e] ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-auto transition-colors duration-200`}
                >
                    <div
                        className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}
                    >
                        <h1 className={titleClass} style={titleStyle}>
                            Buat akun
                        </h1>

                        <div className="mt-8 space-y-3">
                            <div>
                                <label htmlFor="fid" className="sr-only">
                                    Fingerprint ID (FID) Karyawan
                                </label>
                                <input
                                    id="fid"
                                    value={fidInput}
                                    placeholder="Fingerprint ID — contoh: 309"
                                    autoFocus
                                    onChange={(e) => setFidInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') checkFid();
                                    }}
                                    className={
                                        isDesktop ? inputClass : inputClassMobile
                                    }
                                />
                                <p className="mt-2 text-center text-[11px] text-neutral-400 dark:text-neutral-500">
                                    FID wajib diisi. Pendaftaran tanpa FID tidak
                                    diperbolehkan.
                                </p>
                                {fidError && (
                                    <p className="mt-2 text-center text-[12px] font-semibold text-red-600 dark:text-red-400">
                                        {fidError}
                                    </p>
                                )}
                                <InputError
                                    message={errors.fid}
                                    className="mt-1.5 text-center"
                                />
                            </div>

                            <button
                                type="button"
                                disabled={checking || !fidInput.trim()}
                                onClick={checkFid}
                                className={buttonClass}
                            >
                                {checking && (
                                    <svg
                                        className="mr-2 inline h-4 w-4 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                )}
                                {checking
                                    ? 'Memeriksa...'
                                    : 'Periksa FID Karyawan'}
                            </button>
                        </div>

                        <div className={footerClass}>
                            <Link
                                href={route('login')}
                                className={footerLinkClass}
                            >
                                Sudah punya akun? Masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex h-screen ${isDesktop ? 'flex-row' : 'flex-col'} overflow-hidden bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]`}
        >
            <Head title="Daftar" />

            {/* ===== BLACK SECTION ===== */}
            <div
                className={`${isDesktop ? 'flex-1' : 'h-[22vh] shrink-0'} relative flex items-center justify-center bg-black`}
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

            {/* ===== FORM SECTION ===== */}
            <div
                className={`flex flex-1 bg-white dark:bg-[#1e1e1e] ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-auto transition-colors duration-200`}
            >
                <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                    <h1 className={titleClass} style={titleStyle}>
                        Buat akun
                    </h1>

                    {fidData && (
                        <div
                            className={`rounded-xl bg-neutral-100 dark:bg-[#2d2d2d] ${isDesktop ? 'mt-6 mb-4 px-4 py-3 text-[13px]' : 'mt-5 mb-2.5 px-3 py-2 text-[11px]'} text-neutral-700 dark:text-neutral-300`}
                        >
                            <strong>{fidData.nama_karyawan}</strong> —{' '}
                            {fidData.divisi} (FID: {fidData.fid})
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-3">
                        {/* Name (readonly) */}
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Nama lengkap"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                                readOnly
                                className={
                                    isDesktop
                                        ? inputClassReadonly
                                        : `${inputClassReadonly} !py-2.5 !text-sm`
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                value={data.username}
                                placeholder="Username"
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
                                className="mt-1.5"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Alamat Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="example@gmail.com"
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
                                placeholder="Password — min. 8 karakter"
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
                                className="mt-1.5"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="sr-only"
                            >
                                Konfirmasi Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Ulangi password"
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
                                className="mt-1.5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={buttonClass}
                        >
                            {processing && (
                                <svg
                                    className="mr-2 inline h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                            )}
                            {processing
                                ? 'Mendaftarkan...'
                                : 'Daftar Akun Baru'}
                        </button>
                    </form>

                    <div className={footerClass}>
                        <Link href={route('login')} className={footerLinkClass}>
                            Sudah punya akun? Masuk
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
