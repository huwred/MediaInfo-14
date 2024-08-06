import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts", // Entrypoint file (registers other manifests)
      formats: ["es"],
      fileName: 'mediainfo.14',
    },
    outDir: '../MediaInfo.14/wwwroot', // your web component will be saved to the RCL project location and the RCL sets the path as App_Plugins/MediaInfo.14
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
