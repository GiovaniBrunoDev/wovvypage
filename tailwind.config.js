module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wovvy: {
          500: '#16a34a', // verde Wovvy
          600: '#15803d',
        },
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 12s linear infinite',
      },
    },
  },
  plugins: [],
};
