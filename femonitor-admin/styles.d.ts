declare module "*.module.css" {
  export const css: { readonly [key: string]: string };
}

declare module "*.module.sass" {
  export const sass: { readonly [key: string]: string };
}

declare module "*.module.scss" {
  export const scss: { readonly [key: string]: string };
}
