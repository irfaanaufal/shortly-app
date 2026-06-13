import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-neutral-900 text-neutral-900 focus:border-neutral-950 dark:border-white dark:text-white'
                    : 'border-transparent text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 focus:border-neutral-900 focus:text-neutral-900 dark:text-neutral-450 dark:hover:border-white dark:hover:text-white dark:focus:border-white dark:focus:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
