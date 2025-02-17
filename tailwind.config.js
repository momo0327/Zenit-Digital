module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Directory
    "./components/**/*.{js,ts,jsx,tsx}", // For Components Directory
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're using Pages Directory
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#00002E', // Define a custom color name and its hex value
        'custom-pink': '#A494F3', // Define a custom color name and its hex value
        'custom-green': '#09282A', // Define a custom color name and its hex value
        'custom-lightGreen': '#0FB190', // Define a custom color name and its hex value
        background: 'var(--background)', // Use the custom background
        foreground: 'var(--foreground)', // Use the 
      },
      fontSize: {
        'super-large': '20rem', // Custom size
      },
    },
  },
  plugins: [],
};
