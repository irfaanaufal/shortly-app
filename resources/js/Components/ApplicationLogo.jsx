import { usePage } from '@inertiajs/react';

export default function ApplicationLogo({
    collapsed = false,
    className = '',
    ...props
}) {
    const { logo_url } = usePage().props;

    return (
        <div className={`flex items-center gap-3 overflow-hidden ${className}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <img
                    src={logo_url}
                    alt="Company Logo"
                    className="h-10 w-10 object-contain"
                    {...props}
                />
            </div>
            {!collapsed && (
                <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-black tracking-tight text-gray-900 dark:text-white">
                        SHORTLY
                    </p>
                    <p className="truncate text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                        APP
                    </p>
                </div>
            )}
        </div>
    );
}
