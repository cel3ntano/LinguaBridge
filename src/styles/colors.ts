export const colors = {
  brand: {
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
    banana: '#FBE9BA', // Avatar
    brightGray: '#E5E7EB', // Skeleton loaders
    carminePink: '#EF4444', // Error messages
    lust: '#E01F1F', // Favorite icon
  },

  text: {
    primary: '#121417', // Main content text
    secondary: '#8A8A89', // Supporting text
    error: '#EF4444', // Error messages
  },

  customBackground: {
    primary: '#FFF', // Main background color
    backdrop: '#F8F8F8', // Secondary backgrounds
    skeleton: '#E5E7EB', // Skeleton loaders
  },

  customAccent: {
    primary: '#9FB7CE', // Main accent color
    light: '#BFD6EA', // Lighter accent color
  },

  interactive: {
    button: '#F4C550', // Primary button color
    buttonHover: '#FFDC86', // Button hover color
    rating: '#FFC531', // Star ratings
    price: '#38CD3E', // Price tag
    avatar: '#FBE9BA', // Avatar
    favorite: '#E01F1F', // Favorite icon
  },
} as const;
