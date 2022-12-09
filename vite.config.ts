import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postcsspxtoviewport from 'postcss-px-to-viewport'
import AutoImport from 'unplugin-auto-import/vite'
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
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      DefineOptions(),
      AutoImportPlugins
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
          rewrite: (path) => path.replace('/^\/api/', '')
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx','.mjs'],
      alias: {
        '@': resolve(__dirname, './src'),
        '@as': resolve(__dirname, './src/assets'),
        '@cp': resolve(__dirname, './src/components'),
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
          postcsspxtoviewport({
            viewportWidth: 375, // UI设计稿的宽度
            exclude: [/^(?!.*node_modules\/vant)/,/node_modules\/vant/i], // 设置忽略文件，用正则做目录名匹配
            ...pxToViewportConfig
          }),
          postcsspxtoviewport({
            viewportWidth: 375, // UI设计稿的宽度
            exclude: [],
            ...pxToViewportConfig
          })
        ]
      }
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
          chunkFileNames:'js/[name]-[hash].js',
          entryFileNames:'js/[name]-[hash].js',
          assetFileNames:'[ext]/[name]-[hash].[ext]'
        }
      }
    }
  })
}

