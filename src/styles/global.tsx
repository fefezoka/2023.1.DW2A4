import { globalCss } from './stitches.config';

export const global = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Verdana',
  },

  body: {
    backgroundColor: '$bg1',
    color: '$slate12',
  },

  a: {
    all: 'unset',
    cursor: 'pointer',
  },

  button: {
    all: 'unset',
    cursor: 'pointer',
  },

  li: {
    listStyle: 'none',
  },

  input: {
    border: 'none',
  },

  'input:focus': {
    outline: 'none',
  },

  '::-webkit-scrollbar': {
    width: '1rem',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: '$bg3',
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: '$bg4',
  },
});
