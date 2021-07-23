module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#00A2B9',
      'tab': '#FAFAFA',
      'danger': '#e3342f',
      'normalText': '#262626',
      'white': '#ffffff',
      'primary0.5': 'rgba(0, 162, 185, 0.5)',
      'primary0.05': 'rgba(0, 162, 185, 0.05)',
      'gray': '#8C8C8C',
      'blue': '#1890FF',
      'green': '#44A047',
      'orange': '#FB8D00',
      'secondary': '#f4f6f8'

    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#00A2B9',
      'tab': '#FAFAFA',
      'danger': '#e3342f',
      'normalText': '#262626',
      'gray': '#8C8C8C',
      'white': '#ffffff',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'primary': '#00A2B9',
      'tab': '#FAFAFA',
      'danger': '#e3342f',
      'normalText': '#262626',
      'gray': '#8C8C8C',
      'white': '#ffffff',
      'border': '#F5F5F5',
      'inputBorder': '#E8E8E8',
      'inputFocus': 'rgba(0, 162, 185, 0.5)'
    }),
    ringColor: {
      inputFocus: 'rgba(0, 162, 185, 0.5)',
    },
    fontFamily: {
      'text': 'SFText'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
