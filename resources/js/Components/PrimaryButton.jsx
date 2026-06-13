export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-neutral-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition duration-150 ease-in-out hover:bg-neutral-850 focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
