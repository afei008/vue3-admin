/** @format */

declare module '*.css';
declare module '*.scss';

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare interface Window {
  __MICRO_APP_BASE_ROUTE__: any;
  __MICRO_APP_ENVIRONMENT__: any;
  __MICRO_APP_PUBLIC_PATH__: any;
  microApp: any;
}
