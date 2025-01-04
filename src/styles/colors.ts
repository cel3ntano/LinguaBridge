export const colors = {
  base: {
    dark: '#121417', // Main text color
    gray: '#8A8A89', // Secondary text color
    white: '#FFF', // Main background
    wildBlue: '#9FB7CE', // Main accent
    beauBlue: '#BFD6EA', // Lighter accent
    crayola: '#F4C550', // Main yellow (Buttons)
    jasmine: '#FFDC86', // Secondary yellow (Buttons hover)
    sunglow: '#FFC531', // Rating stars
    cultured: '#F8F8F8', // Backdrop
    limeGreen: '#38CD3E', // Price tag
  },

  text: {
    primary: '#121417', // Main content text
    secondary: '#8A8A89', // Supporting text
  },

  background: {
    primary: '#FFF', // Main background color
    backdrop: '#F8F8F8', // Secondary backgrounds
  },

  accent: {
    primary: '#9FB7CE', // Main accent color
    light: '#BFD6EA', // Lighter accent color
  },

  interactive: {
    button: '#F4C550', // Primary button color
    buttonHover: '#FFDC86', // Button hover color
    rating: '#FFC531', // Star ratings
    price: '#38CD3E', // Price tag
  },
} as const;
