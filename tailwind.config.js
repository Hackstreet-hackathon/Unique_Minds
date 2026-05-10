/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust according to your file types
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#3B82F6", // Vibrant Blue
        "primary-green": "#10B981", // Keep green for success states
        "primary-red": "#EF4444",
        "primary-orange": "#F59E0B",
        "primary-violet": "#8B5CF6",
      },
    },
  },
  plugins: [],
};