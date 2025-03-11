import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'mm-pink':'#F9D1D1',
                'mm-light-pink':'#FCE8E8',
                'mm-light-pink-opacity':'rgba(252, 232, 232, .8)',
                'mm-brown':'#BD804A',
                // 'mm-dark-brown':'#895B32',
                'mm-dark-brown':'#5C3D22',
                // 'mm-cream':'#FCF9F6',
                'mm-cream':'#F7EFE8',
            }
        },
    },

    plugins: [forms],
};
