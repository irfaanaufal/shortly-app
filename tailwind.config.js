import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
    ],

    safelist: [
        {
            pattern: /from-(red|blue|green|yellow|orange|purple|pink|indigo|violet|fuchsia|teal|cyan|sky|emerald|lime|rose|amber|slate|gray|zinc|stone|neutral)-(50|100|200|300|400|500|600|700|800|900|950)/,
        },
        {
            pattern: /to-(red|blue|green|yellow|orange|purple|pink|indigo|violet|fuchsia|teal|cyan|sky|emerald|lime|rose|amber|slate|gray|zinc|stone|neutral)-(50|100|200|300|400|500|600|700|800|900|950)/,
        },
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
