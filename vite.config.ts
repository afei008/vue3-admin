/** @format */

import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  createStyleImportPlugin,
  VxeTableResolve,
} from 'vite-plugin-style-import';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
const project = (url: string) =>
  defineConfig({
    base: url,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => /^micro-app/.test(tag),
          },
        },
      }),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      viteCompression(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/theme/element.scss' as *;`,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
            vue: ['vue', 'vue-router', 'pinia'],
            elemenuPlus: ['element-plus', '@element-plus/icons-vue'],
            echarts: ['echarts'],
            d3: ['d3'],
            antvx6: [
              '@antv/x6',
              '@antv/x6-plugin-dnd',
              '@antv/x6-plugin-history',
              '@antv/x6-plugin-snapline',
              '@antv/x6-plugin-transform',
              '@antv/x6-vue-shape',
            ],
            overlayscrollbars: ['overlayscrollbars', 'overlayscrollbars-vue'],
          },
          // 修复部署到 github.io /assets/_plugin-vue_export-helper.cdc0426e.js 引入失败问题
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : '';
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
            );
          },
        },
      },
    },
  });

export default ({ mode }: { mode: string }) => {
  const url = loadEnv(mode, process.cwd()).VITE_BASEURL;
  return project(url);
};
