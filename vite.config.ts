import { build,defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default ({ mode })=> {
  // loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [vue()],
    base: "./",
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true
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

