/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  daisyui: {
    themes: [
      {
        light: {
          primary: '#D82148',
          secondary: '#FFFFFF',
          accent: '#FFFFFF',
          neutral: '#FFFFFF',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
      {
        dark: {
          primary: '#ffffff',
          secondary: '#000000',
          accent: '#000000',
          neutral: '#FFFFFF',
          'base-100': '#212121',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  theme: {
    namedGroups: ['1', '2'],
    fontFamily: {
      Poppins: ['Poppins'],
      Rajdhani: ['Rajdhani'],
    },
    fontSize: {
      xs: '10px',
      sm: '14px',
      lg: '16px',
      xl: '20px',
      xll: '24px',
      xlll: '28px',
      xv: '40px',
      xvv: '46px',
      xvvv: '56px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: '#e72f59',
        // secondary: "#f15a2e",
        baseColor1: '#302c43',
        baseColor2: '#3d3850',
        baseColor3: '#FDAF75',
        baseColor4: '#EAEA7F',
        baseColor5: '#C2FFF9',
      },
    },
    keyframes: {
      'fade-in-right': {
        '0%': {
          opacity: '0',
          transform: 'translateX(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'fade-in-right': 'fade-in-right 0.3s ease-in',
      'fade-in-down': 'fade-in-down 0.5s ease-out',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-named-groups'),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
};
