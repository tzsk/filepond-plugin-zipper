import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/zipper.ts',
      name: 'FilepondZipper',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'zipper.js';
        if (format === 'cjs') return 'zipper.cjs';
        return 'zipper.min.js';
      },
    },
    rollupOptions: {
      // Ensure jszip is externalized
      external: ['jszip'],
      output: {
        // Provide global variable for UMD build
        globals: {
          jszip: 'JSZip',
        },
      },
    },
    minify: true,
  },
});
