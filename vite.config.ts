import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import postcsspxtoviewport from 'postcss-px-to-viewport'
// https://vitejs.dev/config/
export default ({ mode }) => {
  // loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    base: "./",
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: {
        '/api': {
          target: 'https://www.baidu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace('/^\/api/', '')
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
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
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 3, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/^(?!.*node_modules\/vant)/,/node_modules\/vant/i], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          }),
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 3, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            exclude: [],
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    build: {
      outDir: 'dist'
    }
  })
}

