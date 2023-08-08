import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const sizes = {
  windowWidth: width,
  windowHeight: height,
  screenHeight: screenHeight,
  screenWidth: screenWidth,
  spacing: 6,
  loader: 30,
  button: 44,
  header: 55,
  input: 44,
  tabBar: 80,
};

export const defaultTheme = {
  colors: {
    text: '#000000',
    background: '#FFFFFF',
    primary: '#00A2FF',
    placeholder: '#8F8F8F',
    employee: '#AD4040',
    darkerPrimary: '#AD4040',
    error: '#FF0000',
  },
  font: {
    size: {
      h1: 34 as 34,
      h2: 32 as 32,
      h3: 28 as 28,
      h4: 26 as 26,
      h5: 24 as 24,
      xl: 22 as 22,
      lg: 20 as 20,
      md: 18 as 18,
      rg: 16 as 16,
      sm: 14 as 14,
      xs: 12 as 12,
      xxs: 10 as 10,
      custom: (size: number) => size,
    },
    weight: {
      medium: 'Roobert-Medium' as '500',
      semiBold: 'Roobert-Bold' as '600',
      bold: 'Roobert-Bold' as '700',
    },
  },

  sizes: {
    ...sizes,
    getSpacing: (multiplier: number) => multiplier * sizes.spacing,
    appPadding: 4 * sizes.spacing,
  },

  roundness: {
    button: 16,
    card: 20,
  },
};
