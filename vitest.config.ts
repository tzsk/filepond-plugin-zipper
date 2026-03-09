import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['**/*.{test,spec}.ts', 'dist/**/*.[jt]s', 'node_modules/'],
      reportsDirectory: 'coverage',
    },
    include: ['**/tests/?(*.)+(spec|test).[tj]s?(x)'],
    exclude: ['node_modules/'],
  },
});
