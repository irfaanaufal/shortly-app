import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : false);
    const [step, setStep] = useState('fid');
    const [fidData, setFidData] = useState(null);
    const [fidInput, setFidInput] = useState('');
    const [fidError, setFidError] = useState('');
    const [checking, setChecking] = useState(false);

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
            const response = await fetch(route('register.check-karyawan', fidInput.trim()));
            const result = await response.json();

            if (!response.ok) {
                setFidError(result.message || 'Terjadi kesalahan saat memeriksa FID.');
                setChecking(false);
                return;
            }

            if (result.success) {
                setFidData(result.karyawan);
                setData((prevData) => ({
                    ...prevData,
                    fid: result.karyawan.fid,
                    name: result.karyawan.nama_karyawan,
                }));
                setStep('register');
            }
        } catch (err) {
            setFidError('Gagal menghubungkan ke server. Coba lagi.');
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
            <div className={`h-screen flex ${isDesktop ? 'flex-row' : 'flex-col'} bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif] overflow-hidden`}>
                <Head title="Register" />

                {/* ===== BLACK SECTION ===== */}
                <div className={`${isDesktop ? 'flex-1' : 'shrink-0 h-[22vh]'} bg-black flex items-center justify-center relative`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={isDesktop ? 150 : 60} height={isDesktop ? 150 : 60} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

                {/* ===== FORM SECTION ===== */}
                <div className={`flex-1 bg-white dark:bg-[#1e1e1e] flex ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-hidden transition-colors duration-200`}>
                    <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                        <h1 className={`${isDesktop ? 'text-[28px]' : 'text-[22px]'} font-bold text-neutral-900 dark:text-white text-center ${isDesktop ? 'mb-5' : 'mb-4'} tracking-tight`}>
                            Cek FID Karyawan
                        </h1>
                        <p className={`${isDesktop ? 'text-[13px]' : 'text-[11px]'} text-neutral-500 dark:text-neutral-400 text-center ${isDesktop ? 'mb-6' : 'mb-4'}`}>
                            Masukkan FID Anda untuk memverifikasi data karyawan.
                        </p>

                        <div className="mb-3">
                            <label htmlFor="fid" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>
                                FID
                            </label>
                            <input
                                id="fid"
                                value={fidInput}
                                placeholder="Masukkan FID"
                                autoFocus
                                onChange={(e) => setFidInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') checkFid(); }}
                                className={isDesktop ? inputClass : inputClassMobile}
                            />
                            {fidError && (
                                <p className="text-red-600 dark:text-red-400 text-xs font-semibold mt-1.5">{fidError}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={checking || !fidInput.trim()}
                            onClick={checkFid}
                            className={`w-full bg-black dark:bg-white dark:text-black text-white border-none rounded-xl ${isDesktop ? 'py-3.5 text-base mt-5' : 'py-2.5 text-sm mt-3'} font-semibold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {checking ? 'Memeriksa...' : 'Lanjutkan'}
                        </button>

                        <p className={`text-center ${isDesktop ? 'text-sm' : 'text-[11px]'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-4'} mb-0`}>
                            Already registered?{' '}
                            <Link href={route('login')} className="text-neutral-900 dark:text-white font-bold no-underline hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-screen flex ${isDesktop ? 'flex-row' : 'flex-col'} bg-black font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_sans-serif] overflow-hidden`}>
            <Head title="Register" />

            {/* ===== BLACK SECTION ===== */}
            <div className={`${isDesktop ? 'flex-1' : 'shrink-0 h-[22vh]'} bg-black flex items-center justify-center relative`}>
                <svg xmlns="http://www.w3.org/2000/svg" width={isDesktop ? 150 : 60} height={isDesktop ? 150 : 60} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* ===== FORM SECTION ===== */}
            <div className={`flex-1 bg-white dark:bg-[#1e1e1e] flex ${isDesktop ? 'items-center justify-center px-20' : 'items-start justify-start px-[22px] pt-[18px]'} ${!isDesktop ? 'rounded-tl-[48px]' : ''} overflow-y-hidden transition-colors duration-200`}>
                <div className={`w-full ${isDesktop ? 'max-w-[400px]' : ''}`}>
                    <h1 className={`${isDesktop ? 'text-[32px]' : 'text-[22px]'} font-bold text-neutral-900 dark:text-white text-center ${isDesktop ? 'mb-5' : 'mb-3'} tracking-tight`}>
                        Register
                    </h1>

                    {fidData && (
                        <div className={`bg-neutral-100 dark:bg-[#2d2d2d] rounded-xl ${isDesktop ? 'px-4 py-3 mb-4 text-[13px]' : 'px-3 py-2 mb-2.5 text-[11px]'} text-neutral-700 dark:text-neutral-300`}>
                            <strong>{fidData.nama_karyawan}</strong> — {fidData.divisi} (FID: {fidData.fid})
                        </div>
                    )}

                    <form onSubmit={submit} className={`flex flex-col ${!isDesktop ? 'flex-1' : ''}`}>
                        {/* Name */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label htmlFor="name" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Name</label>
                            <input id="name" name="name" value={data.name} placeholder="Enter name" autoComplete="name" onChange={(e) => setData('name', e.target.value)} required readOnly
                                className={isDesktop ? inputClassReadonly : `${inputClassReadonly} !py-2.5 !text-[13px]`}
                            />
                            <InputError message={errors.name} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Username */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label htmlFor="username" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Username</label>
                            <input id="username" name="username" value={data.username} placeholder="Enter username" autoComplete="username" autoFocus onChange={(e) => setData('username', e.target.value.toLowerCase())} required
                                className={isDesktop ? inputClass : inputClassMobile}
                            />
                            <InputError message={errors.username} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Email */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label htmlFor="email" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Email</label>
                            <input id="email" type="email" name="email" value={data.email} placeholder="Enter email" autoComplete="email" onChange={(e) => setData('email', e.target.value)} required
                                className={isDesktop ? inputClass : inputClassMobile}
                            />
                            <InputError message={errors.email} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Password */}
                        <div className={isDesktop ? 'mb-3.5' : 'mb-2'}>
                            <label htmlFor="password" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Password</label>
                            <input id="password" type="password" name="password" value={data.password} placeholder="Enter password" autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required
                                className={isDesktop ? inputClass : inputClassMobile}
                            />
                            <InputError message={errors.password} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className={`block ${isDesktop ? 'text-sm' : 'text-xs'} font-medium text-neutral-900 dark:text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Confirm Password</label>
                            <input id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} placeholder="Confirm password" autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required
                                className={isDesktop ? inputClass : inputClassMobile}
                            />
                            <InputError message={errors.password_confirmation} className={isDesktop ? 'mt-2' : 'mt-1'} />
                        </div>

                        <button type="submit" disabled={processing}
                            className={`w-full bg-black dark:bg-white dark:text-black text-white border-none rounded-xl ${isDesktop ? 'py-3.5 text-base mt-5' : 'py-2.5 text-sm mt-3.5'} font-semibold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Register
                        </button>
                    </form>

                    <p className={`text-center ${isDesktop ? 'text-sm' : 'text-[11px]'} text-neutral-400 dark:text-neutral-500 ${isDesktop ? 'mt-7' : 'mt-4'} mb-0`}>
                        Already registered?{' '}
                        <Link href={route('login')} className="text-neutral-900 dark:text-white font-bold no-underline hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
