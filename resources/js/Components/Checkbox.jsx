export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-neutral-300 text-neutral-900 shadow-sm focus:ring-neutral-900 dark:border-neutral-750 dark:bg-[#2d2d2d] dark:focus:ring-white dark:focus:ring-offset-[#121212] ' +
                className
            }
        />
    );
}
