module.exports = {
  content: [
    './resources/**/*.antlers.html',
    './resources/**/*.blade.php',
    './resources/**/*.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
        colors: {
            'body-blue-color': 'var(--denim-color)',
            'resolution-blue-color': 'var(--resolution-blue-color)',
            'baureolin-color': 'var(--baureolin-color)',
            'text-color':'var(--text-color)',
            'white-color':'var(--white-color)',
          },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
