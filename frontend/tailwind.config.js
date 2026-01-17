/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          primary: '#4F46E5', // Blue shade for primary actions
          secondary: '#9333EA', // Purple accent color
          success: '#10B981', // Green for success states
          danger: '#EF4444', // Red for error or delete actions
          warning: '#F59E0B', // Yellow for warning states
          lightBackground: '#F9FAFB', // Light background color
          darkBackground: '#111827', // Dark background color
        },
      },
  },
  plugins: [],
};
