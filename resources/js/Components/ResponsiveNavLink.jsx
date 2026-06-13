import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-neutral-900 bg-neutral-100 text-neutral-900 focus:border-neutral-950 focus:bg-neutral-150 dark:border-white dark:bg-[#2d2d2d] dark:text-white dark:focus:border-white dark:focus:bg-[#1e1e1e]'
                    : 'border-transparent text-neutral-500 hover:border-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 focus:border-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 dark:text-neutral-450 dark:hover:border-white dark:hover:bg-[#1e1e1e] dark:hover:text-white dark:focus:border-white dark:focus:bg-[#1e1e1e] dark:focus:text-white'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
