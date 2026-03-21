// A tailwindcss-ben konfigurálás 

import type { Config } from 'tailwindcss'

module.exports = {
    darkmode:"class",
    content: ['./index.html', 'src/**/*.{vue,,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config