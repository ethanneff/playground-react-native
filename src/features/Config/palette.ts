type Color =
  | 'blue'
  | 'celery'
  | 'chartreuse'
  | 'cyan'
  | 'fucsia'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'magenta'
  | 'orange'
  | 'purple'
  | 'red'
  | 'seafoam'
  | 'yellow';

type Theme = 'dark' | 'light';

type Shade =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '1000'
  | '1100'
  | '1200'
  | '1300'
  | '1400';

type Palette = Record<Theme, Record<Color, Record<Shade, string>>>;

export const palette: Palette = {
  dark: {
    blue: {
      '100': '#003877',
      '200': '#00418a',
      '300': '#004da3',
      '400': '#0059c2',
      '500': '#0367e0',
      '600': '#1379f3',
      '700': '#348ff4',
      '800': '#54a3f6',
      '900': '#72b7f9',
      '1000': '#8fcafc',
      '1100': '#aedbfe',
      '1200': '#cce9ff',
      '1300': '#e8f6ff',
      '1400': '#ffffff',
    },
    celery: {
      '100': '#00450a',
      '200': '#00500c',
      '300': '#005e0e',
      '400': '#006d0f',
      '500': '#007f0f',
      '600': '#009112',
      '700': '#04a51e',
      '800': '#22b833',
      '900': '#44ca49',
      '1000': '#69dc63',
      '1100': '#8eeb7f',
      '1200': '#b4f7a2',
      '1300': '#ddfdd3',
      '1400': '#ffffff',
    },
    chartreuse: {
      '100': '#304000',
      '200': '#374a00',
      '300': '#415700',
      '400': '#4c6600',
      '500': '#597600',
      '600': '#668800',
      '700': '#759a00',
      '800': '#84ad01',
      '900': '#94c008',
      '1000': '#a6d312',
      '1100': '#b8e525',
      '1200': '#cdf547',
      '1300': '#e7fe9a',
      '1400': '#ffffff',
    },
    cyan: {
      '100': '#003d62',
      '200': '#00476f',
      '300': '#00557f',
      '400': '#006491',
      '500': '#0074a2',
      '600': '#0086b4',
      '700': '#0099c6',
      '800': '#0eadd7',
      '900': '#2cc1e6',
      '1000': '#54d3f1',
      '1100': '#7fe4f9',
      '1200': '#a7f1ff',
      '1300': '#d7faff',
      '1400': '#ffffff',
    },
    fucsia: {
      '100': '#6b036a',
      '200': '#7b007b',
      '300': '#900091',
      '400': '#a50da6',
      '500': '#b925b9',
      '600': '#cd39ce',
      '700': '#df51e0',
      '800': '#eb6eec',
      '900': '#f48cf2',
      '1000': '#faa8f5',
      '1100': '#fec2f8',
      '1200': '#ffdbfa',
      '1300': '#ffeffc',
      '1400': '#fffdff',
    },
    gray: {
      '100': '#1d1d1d',
      '200': '#262626',
      '300': '#323232',
      '400': '#3f3f3f',
      '500': '#545454',
      '600': '#707070',
      '700': '#909090',
      '800': '#b2b2b2',
      '900': '#d1d1d1',
      '1000': '#ebebeb',
      '1100': '#ffffff',
      '1200': '#ffffff',
      '1300': '#ffffff',
      '1400': '#ffffff',
    },
    green: {
      '100': '#044329',
      '200': '#004e2f',
      '300': '#005c38',
      '400': '#006c43',
      '500': '#007d4e',
      '600': '#008f5d',
      '700': '#12a26c',
      '800': '#2bb47d',
      '900': '#43c78f',
      '1000': '#5ed9a2',
      '1100': '#81e9b8',
      '1200': '#b1f4d1',
      '1300': '#dffaea',
      '1400': '#fefffc',
    },
    indigo: {
      '100': '#282c8c',
      '200': '#2f34a3',
      '300': '#393fbb',
      '400': '#464bd3',
      '500': '#555be7',
      '600': '#686df4',
      '700': '#7c81fb',
      '800': '#9195ff',
      '900': '#a7aaff',
      '1000': '#bcbeff',
      '1100': '#d0d2ff',
      '1200': '#e2e4ff',
      '1300': '#f3f3fe',
      '1400': '#ffffff',
    },
    magenta: {
      '100': '#76003a',
      '200': '#890042',
      '300': '#a0004d',
      '400': '#b6125a',
      '500': '#cb266d',
      '600': '#de3d82',
      '700': '#ed5795',
      '800': '#f972a7',
      '900': '#ff8fb9',
      '1000': '#ffacca',
      '1100': '#ffc6da',
      '1200': '#ffdde9',
      '1300': '#fff0f5',
      '1400': '#fffcfd',
    },
    orange: {
      '100': '#662500',
      '200': '#752d00',
      '300': '#893700',
      '400': '#9e4200',
      '500': '#b44e00',
      '600': '#ca5d00',
      '700': '#e16d00',
      '800': '#f4810c',
      '900': '#fe9a2e',
      '1000': '#ffb558',
      '1100': '#fdce88',
      '1200': '#ffe1b3',
      '1300': '#fff2dd',
      '1400': '#fffdf9',
    },
    purple: {
      '100': '#4c0d9d',
      '200': '#5911b1',
      '300': '#691cc8',
      '400': '#7a2dda',
      '500': '#8c41e9',
      '600': '#9d57f3',
      '700': '#ac6ff9',
      '800': '#bb87fb',
      '900': '#ca9ffc',
      '1000': '#d7b6fe',
      '1100': '#e4ccfe',
      '1200': '#efdfff',
      '1300': '#f9f0ff',
      '1400': '#fffdff',
    },
    red: {
      '100': '#7b0000',
      '200': '#8d0000',
      '300': '#a50000',
      '400': '#be0403',
      '500': '#d71913',
      '600': '#ea3829',
      '700': '#f65843',
      '800': '#ff755e',
      '900': '#ff9581',
      '1000': '#ffb0a1',
      '1100': '#ffc9bd',
      '1200': '#ffded8',
      '1300': '#fff1ee',
      '1400': '#ffffff',
    },
    seafoam: {
      '100': '#12413f',
      '200': '#0e4c49',
      '300': '#045a57',
      '400': '#006965',
      '500': '#007a75',
      '600': '#008c87',
      '700': '#009e98',
      '800': '#03b2ab',
      '900': '#36c5bd',
      '1000': '#5dd6cf',
      '1100': '#84e6df',
      '1200': '#b0f2ec',
      '1300': '#dff9f6',
      '1400': '#fefffe',
    },
    yellow: {
      '100': '#4c3600',
      '200': '#584000',
      '300': '#674c00',
      '400': '#775900',
      '500': '#886800',
      '600': '#9b7800',
      '700': '#ae8900',
      '800': '#c09c00',
      '900': '#d3ae00',
      '1000': '#e4c200',
      '1100': '#f4d500',
      '1200': '#f9e85c',
      '1300': '#fcf6bb',
      '1400': '#ffffff',
    },
  },
  light: {
    blue: {
      '100': '#e0f2ff',
      '200': '#cae8ff',
      '300': '#b5deff',
      '400': '#96cefd',
      '500': '#78bbfa',
      '600': '#59a7f6',
      '700': '#3892f3',
      '800': '#147af3',
      '900': '#0265dc',
      '1000': '#0054b6',
      '1100': '#004491',
      '1200': '#003571',
      '1300': '#002754',
      '1400': '#001c3c',
    },
    celery: {
      '100': '#cdfcbf',
      '200': '#aef69d',
      '300': '#96ee85',
      '400': '#72e06a',
      '500': '#4ecf50',
      '600': '#27bb36',
      '700': '#07a721',
      '800': '#009112',
      '900': '#007c0f',
      '1000': '#00670f',
      '1100': '#00530d',
      '1200': '#00400a',
      '1300': '#003007',
      '1400': '#002205',
    },
    chartreuse: {
      '100': '#dbfc6e',
      '200': '#cbf443',
      '300': '#bce92a',
      '400': '#aad816',
      '500': '#98c50a',
      '600': '#87b103',
      '700': '#769c00',
      '800': '#678800',
      '900': '#577400',
      '1000': '#486000',
      '1100': '#3a4d00',
      '1200': '#2c3b00',
      '1300': '#212c00',
      '1400': '#181f00',
    },
    cyan: {
      '100': '#c5f8ff',
      '200': '#a4f0ff',
      '300': '#88e7fa',
      '400': '#60d8f3',
      '500': '#33c5e8',
      '600': '#12b0da',
      '700': '#019cc8',
      '800': '#0086b4',
      '900': '#00719f',
      '1000': '#005d89',
      '1100': '#004a73',
      '1200': '#00395d',
      '1300': '#002a46',
      '1400': '#001e33',
    },
    fucsia: {
      '100': '#ffe9fc',
      '200': '#ffdafa',
      '300': '#fec7f8',
      '400': '#fbaef6',
      '500': '#f592f3',
      '600': '#ed74ed',
      '700': '#e055e2',
      '800': '#cd3ace',
      '900': '#b622b7',
      '1000': '#9d039e',
      '1100': '#800081',
      '1200': '#640664',
      '1300': '#470e46',
      '1400': '#320d31',
    },
    gray: {
      '100': '#ffffff',
      '200': '#fdfdfd',
      '300': '#f8f8f8',
      '400': '#e6e6e6',
      '500': '#d5d5d5',
      '600': '#b1b1b1',
      '700': '#909090',
      '800': '#6d6d6d',
      '900': '#464646',
      '1000': '#222222',
      '1100': '#000000',
      '1200': '#000000',
      '1300': '#000000',
      '1400': '#000000',
    },
    green: {
      '100': '#cef8e0',
      '200': '#adf4ce',
      '300': '#89ecbc',
      '400': '#67dea8',
      '500': '#49cc93',
      '600': '#2fb880',
      '700': '#15a46e',
      '800': '#008f5d',
      '900': '#007a4d',
      '1000': '#00653e',
      '1100': '#005132',
      '1200': '#053f27',
      '1300': '#0a2e1d',
      '1400': '#0a2015',
    },
    indigo: {
      '100': '#edeeff',
      '200': '#e0e2ff',
      '300': '#d3d5ff',
      '400': '#c1c4ff',
      '500': '#acafff',
      '600': '#9599ff',
      '700': '#7e84fc',
      '800': '#686df4',
      '900': '#5258e4',
      '1000': '#4046ca',
      '1100': '#3236a8',
      '1200': '#262986',
      '1300': '#1b1e64',
      '1400': '#141648',
    },
    magenta: {
      '100': '#ffeaf1',
      '200': '#ffdce8',
      '300': '#ffcadd',
      '400': '#ffb2ce',
      '500': '#ff95bd',
      '600': '#fa77aa',
      '700': '#ef5a98',
      '800': '#de3d82',
      '900': '#c82269',
      '1000': '#ad0955',
      '1100': '#8e0045',
      '1200': '#700037',
      '1300': '#54032a',
      '1400': '#3c061d',
    },
    orange: {
      '100': '#ffeccc',
      '200': '#ffdfad',
      '300': '#fdd291',
      '400': '#ffbb63',
      '500': '#ffa037',
      '600': '#f68511',
      '700': '#e46f00',
      '800': '#cb5d00',
      '900': '#b14c00',
      '1000': '#953d00',
      '1100': '#7a2f00',
      '1200': '#612300',
      '1300': '#491901',
      '1400': '#351201',
    },
    purple: {
      '100': '#f6ebff',
      '200': '#eeddff',
      '300': '#e6d0ff',
      '400': '#dbbbfe',
      '500': '#cca4fd',
      '600': '#bd8bfc',
      '700': '#ae72f9',
      '800': '#9d57f4',
      '900': '#893de7',
      '1000': '#7326d3',
      '1100': '#5d13b7',
      '1200': '#470c94',
      '1300': '#33106a',
      '1400': '#230f49',
    },
    red: {
      '100': '#ffebe7',
      '200': '#ffddd6',
      '300': '#ffcdc3',
      '400': '#ffb7a9',
      '500': '#ff9b88',
      '600': '#ff7c65',
      '700': '#f75c46',
      '800': '#ea3829',
      '900': '#d31510',
      '1000': '#b40000',
      '1100': '#930000',
      '1200': '#740000',
      '1300': '#590000',
      '1400': '#430000',
    },
    seafoam: {
      '100': '#cef7f3',
      '200': '#aaf1ea',
      '300': '#8ce9e2',
      '400': '#65dad2',
      '500': '#3fc9c1',
      '600': '#0fb5ae',
      '700': '#00a19a',
      '800': '#008c87',
      '900': '#007772',
      '1000': '#00635f',
      '1100': '#0c4f4c',
      '1200': '#123c3a',
      '1300': '#122c2b',
      '1400': '#0f1f1e',
    },
    yellow: {
      '100': '#fbf198',
      '200': '#f8e750',
      '300': '#f8d904',
      '400': '#e8c600',
      '500': '#d7b300',
      '600': '#c49f00',
      '700': '#b08c00',
      '800': '#9b7800',
      '900': '#856600',
      '1000': '#705300',
      '1100': '#5b4300',
      '1200': '#483300',
      '1300': '#362500',
      '1400': '#281a00',
    },
  },
};