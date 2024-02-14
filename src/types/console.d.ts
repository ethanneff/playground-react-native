declare module 'console' {
  export = typeof import('node:console');
}
