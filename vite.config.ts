import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import externalGlobals from "rollup-plugin-external-globals";
import path from 'path'
import * as obfuscator from 'javascript-obfuscator';
const ObfuscatorCode = obfuscator.default;
// https://vitejs.dev/config/

// 自动引入
const AutoImportPlugins = AutoImport({
  include: [
    /\.[tj]sx?$/,
    /\.vue$/,
    /\.vue\?vue/,
    /\.md$/,
  ],// global imports to register
  imports: [
    // 插件预设支持导入的api
    'vue',
    'vue-router',
    'pinia'
    // 自定义导入的api
  ],
  dts:"src/auto-import.d.ts" //生成auto-import.d.ts 全局声明
})

const pxToViewportConfig = {
  unitToConvert: 'px', // 要转化的单位
  unitPrecision: 3, // 转换后的精度，即小数点位数
  propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  landscape: false // 是否处理横屏情况
}

const cdn = {
  css: [
    'https://cdn.jsdelivr.net/npm/vant@4.6.5/lib/index.min.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.min.js',
    'https://cdn.jsdelivr.net/npm/vue-demi@0.14.5/lib/index.iife.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@4/dist/vue-router.global.min.js',
    'https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vant@4.6.5/lib/vant.min.js',
    'https://cdn.jsdelivr.net/npm/pinia@2.1.3/dist/pinia.iife.min.js'
  ],
}
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      DefineOptions(),
      AutoImportPlugins,
      {
        ...externalGlobals({
          vue: 'Vue',
          'vue-demi':'VueDemi',
          'vue-router': 'VueRouter',
          pinia:'Pinia',
          'axios':'axios',
          'vant':'vant'
        }),
        enforce: 'post',
        apply: 'build',
      },
      createHtmlPlugin({
        template: './index.html',
        inject:{
          data:{
            title:"首页",
            cdnCSS:cdn.css,
            cdnJS:cdn.js,
          }
        }
      }),
      {
        name:'vite-obfuscated-code',
        apply:'build',
        renderChunk(code,chunk){
            const obfuscateList = ['Home']; //需要代码混淆的名单
            const whiteCode = obfuscateList.includes(chunk.name);
            if(whiteCode){
              let obfuscateResult = ObfuscatorCode.obfuscate(code,
                {
                    compact: false,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    numbersToExpressions: true,
                    simplify: true,
                    stringArrayShuffle: true,
                    splitStrings: true,
                    stringArrayThreshold: 1
                }
              )
              return {code:obfuscateResult.getObfuscatedCode()};
            }
        }
      }
    ],
    base: env.VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9527',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx','.mjs'],
      alias: {
        '@as': resolve(__dirname, './src/assets'),
        '@cp': resolve(__dirname, './src/components'),
        '@':fileURLToPath(new URL('./src',import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/style/var.scss";`
        }
      },
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            viewportWidth: (file)=>{
              return 375;
            }, // UI设计稿的宽度
            exclude: [/node_modules\/vant/], // 设置忽略文件
            ...pxToViewportConfig
          })
        ]
      }
    },
    optimizeDeps: {
      include: [
          'vue',
          'vue-demi',
          'vue-router',
          'pinia',
          'vant',
          'axios'
      ],
    },
    build: {
      outDir: 'dist',
      sourcemap:false,
      minify:"terser",
      terserOptions:{
        compress:{
          drop_console:true,
          drop_debugger:true
        }
      },
      rollupOptions:{
        output:{
          manualChunks:{
            // 配置打包的chunkFileName
            //'name':['xxxx/xxx/xxx','xxx/xxx/xxxx'] 
          },
          chunkFileNames:'js/[name]-[hash].js',
          entryFileNames:'js/[name]-[hash].js',
          assetFileNames:'[ext]/[name]-[hash].[ext]'
        },
        external:[
          'vue',
          'vue-demi',
          'vue-router',
          'pinia',
          'vant',
          'axios'
        ]
      }
    }
  })
}

