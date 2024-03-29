/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv{ 
  VITE_APP_BASE_API:string
}

interface ImportMeta{
  readonly env:ImportMetaEnv
}
declare module '@/*'
declare module '@as/*'
declare module '@cp/*'


declare interface Window{
  VConsole:any,
  eruda:any,
  WeixinJSBridge:any
}

// 全局interface
interface pageProps<T>{
  pageNum:number,
  pageSize:number,
  filters?:T
}