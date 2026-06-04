/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   { DEFAULT: '#FFF8F0', dark: '#F5EDE0' },
        crimson: { 50:'#FFF0F0',100:'#FFD6D6',200:'#FFADAD',300:'#FF7070',400:'#FF4040',500:'#E8192C',600:'#CC0E20',700:'#A80A18',800:'#880812',900:'#6E060E',950:'#3D0308' },
        gold:    { DEFAULT:'#C9A84C', light:'#E4C877', dark:'#9C7A2A' },
        sidebar: '#0F0204',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato:     ['"Lato"', 'sans-serif'],
        dancing:  ['"Dancing Script"', 'cursive'],
        sans:     ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:    '0 1px 3px rgba(0,0,0,0.07),0 4px 12px rgba(0,0,0,0.05)',
        'card-lg':'0 4px 6px rgba(0,0,0,0.05),0 10px 30px rgba(0,0,0,0.08)',
        modal:   '0 20px 60px rgba(0,0,0,0.18)',
        red:     '0 4px 14px rgba(232,25,44,0.35)',
        'red-md':'0 8px 32px rgba(232,25,44,0.3)',
      },
    },
  },
  plugins: [],
}
