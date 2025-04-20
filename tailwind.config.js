module.exports = {
    content: [
      './src/**/*.{html,js}', // Adjust the path based on where your files are located
      './components/**/*.{html,js}',
      './pages/**/*.{html,js}', // Include all your pages if you're using Next.js or any other framework
    ],
    theme: {
      extend: {
        keyframes: {
          'match-bounce': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.15)' },
          },
        },
        animation: {
          'match-bounce': 'match-bounce 0.4s ease-in-out',
        },
      },
    },
    plugins: [],
  }
  