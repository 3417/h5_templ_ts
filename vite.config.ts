import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
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
      proxy:{
        '/api':{
          target:'https://www.baidu.com',
          changeOrigin:true,
          rewrite:(path)=>path.replace('/^\/api/','')
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
          additionalData: `@import "./src/assets/style/common.scss";`
        }
      }
    },
    build: {
      outDir: 'dist'
    }
  })
}

