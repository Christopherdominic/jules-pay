import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['e2e/**', 'node_modules/**', 'archive/**'],
    server: {
      deps: {
        // The wallets kit imports CommonJS freighter-api with named exports; let Vite transform both.
        inline: ['@creit.tech/stellar-wallets-kit', '@stellar/freighter-api'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
