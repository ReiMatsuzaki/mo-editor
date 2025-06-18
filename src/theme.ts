export const palette = {
  primary: '#5CA6B0',
  accent: '#32527B',
  gray: '#A1A3A6'
};

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: palette.primary },
        navy: { DEFAULT: palette.accent },
        gray: { DEFAULT: palette.gray }
      }
    }
  },
  plugins: []
};
