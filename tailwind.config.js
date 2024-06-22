/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59332',
          dark:"#545454",
          vdark:"#1F1F1F",
          light:"#FF860F",
          
        },
        white:{
          DEFAULT: '#FFFFFF',
          light:"#8A8A8A",
          vdark:"#333333",
          vlight:"#FFFFFF5C",
          vlight:"#F5F5F5",
        },
        grey:{
          DEFAULT:"rgba(107, 107, 107, 0.21) ",
          dark:"#B0B0B0",
          light:"#E6E6E6",
          darkest:"#8C8C8C",
      
        },
        black:{
          DEFAULT: '#131313',
          light:"#70707029",
          dark:"#8C8C8C",
          darkest:"#6B6B6B36",
          vdark:"#292929",
        },
        yellow:{
          DEFAULT: '#F17F3D',
          vdark:"#393939",
          light:"#ADADAD",
        },
        red:{
          DEFAULT: '#E91C24',

        }
      },
    },
    screens: {
      'xs': '0px',
      'sm': '640px',
      'md': '762px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1511px',
      '3xl': '1920px',
      
    },
    fontSize: {
      'xs': '12px',
      'sm': '14px',
      'tiny': '16px',
      'base': '18px',
      'lg':   '20px',
      'xl': '24px',
      '2xl': '32px',
      '3xl': '36px',
      '4xl': '48px',
      '5xl': '60px',
    },
  },
  plugins: [],
};
