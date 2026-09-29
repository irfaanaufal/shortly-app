import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-neutral-50 p-1 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#121212] dark:selection:bg-white dark:selection:text-neutral-900">
            {/* Ambient corporate decoration dot pattern / grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] dark:opacity-20"></div>

            <div className="z-10 flex w-full max-w-sm flex-col justify-center">
                {/* Header Logo Brand */}
                <div className="mb-3 flex flex-col items-center text-center">
                    <Link
                        href="/"
                        className="mb-1 transition-transform focus:outline-none active:scale-95"
                    >
                        <ApplicationLogo className="h-6 w-auto fill-current text-neutral-900 dark:text-white" />
                    </Link>
                    <h2 className="text-xs font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        Akses Portal Tunggal
                    </h2>
                    <p className="dark:text-neutral-450 mt-0.5 text-[9px] font-medium text-neutral-400">
                        Silakan lengkapi kredensial resmi perusahaan Anda.
                    </p>
                </div>

                {/* Main Form Dynamic Wrapper */}
                <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white px-3 py-3 shadow-sm dark:border-neutral-800 dark:bg-[#1e1e1e]">
                    {children}
                </div>

                {/* Security Badge Information Footer */}
                <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                    Sistem Terproteksi Enskripsi Korporat Sesuai ISO 27001
                </p>
            </div>
        </div>
    );
}
