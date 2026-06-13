import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#121212] p-1 antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 overflow-hidden">

            {/* Ambient corporate decoration dot pattern / grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] dark:opacity-20 pointer-events-none"></div>

            <div className="w-full max-w-sm z-10 flex flex-col justify-center">
                {/* Header Logo Brand */}
                <div className="flex flex-col items-center text-center mb-3">
                    <Link href="/" className="transition-transform active:scale-95 mb-1 focus:outline-none">
                        <ApplicationLogo className="h-6 w-auto fill-current text-neutral-900 dark:text-white" />
                    </Link>
                    <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                        Akses Portal Tunggal
                    </h2>
                    <p className="text-[9px] font-medium text-neutral-400 dark:text-neutral-450 mt-0.5">
                        Silakan lengkapi kredensial resmi perusahaan Anda.
                    </p>
                </div>

                {/* Main Form Dynamic Wrapper */}
                <div className="w-full overflow-hidden bg-white px-3 py-3 border border-neutral-200 rounded-xl shadow-sm dark:bg-[#1e1e1e] dark:border-neutral-800">
                    {children}
                </div>

                {/* Security Badge Information Footer */}
                <p className="text-center text-[7px] font-mono tracking-wider text-neutral-400 dark:text-neutral-600 mt-2 uppercase">
                    Sistem Terproteksi Enskripsi Korporat Sesuai ISO 27001
                </p>
            </div>
        </div>
    );
}