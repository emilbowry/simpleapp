// src/global.d.ts

// Allow import of SVGs as modules
declare module '*.svg' {
  const content: string;
  export default content;
}

// Allow import of CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
