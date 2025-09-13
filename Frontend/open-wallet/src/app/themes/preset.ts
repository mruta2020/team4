import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50:  '#E6F1FA',
      100: '#C0DDF2',
      200: '#99C9EB',
      300: '#73B4E3',
      400: '#4DA0DB',
      500: '#0177CC', // base
      600: '#0165AD',
      700: '#01538F',
      800: '#003C66',
      900: '#00243D',
      950: '#00121F'
    },
    secondary: {
      50:  '#FEF4E8',
      100: '#FDE4C7',
      200: '#FBD3A5',
      300: '#FAC383',
      400: '#F9B362',
      500: '#F6921E', // base
      600: '#D17C1A',
      700: '#AC6615',
      800: '#7B490F',
      900: '#4A2C09',
      950: '#251605'
    },
    success: { 500: '#00A878' },
    warning: { 500: '#F6921E' },
    error:   { 500: '#D72638' },
    info:    { 500: '#35A9E1' }
  }
});


export default MyPreset;