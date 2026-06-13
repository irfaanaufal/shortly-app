export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm transition duration-150 ease-in-out hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-25 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-300 dark:hover:bg-neutral-800 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
