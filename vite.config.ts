import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compilerOptions, transformAssetUrls } from 'vue3-pixi-renderer/compiler'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions,
        transformAssetUrls,
      },
    }),
  ],
})
