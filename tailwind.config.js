/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #12192C 0%, rgba(196, 196, 196, 0) 100%)',
        'custom-gradient-2': 'linear-gradient(180deg, #12192C 0%, rgba(196, 196, 196, 0) 100%)'
      },
      colors: {
        'custom-blue':'#12192C',
        'custom-gray':'#8590AD'
      }
    },
  },
  plugins: [],
}
