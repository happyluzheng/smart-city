import path from "path";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

import CompressionPlugin from "vite-plugin-compression";
// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // assetsInclude: [".gltf", ".glb", ".fbx"],
  plugins: [
    glsl(),
    CompressionPlugin({
      ext: ".gz", // 压缩后缀
      include: /\.(js|css|json|svg|xml|map|txt|ico|jpg|jpeg|png|glb)$/i, // 包括哪些文件类型
      exclude: [], // 排除哪些文件类型
      algorithm: "gzip", // 压缩算法
      threshold: 1024, // 大小超过10kb的文件进行压缩

      deleteOriginFile: false, // 是否删除原文件
      verbose: true, // 是否显示详细信息
      filter: () => true, // 过滤器函数
      compressOptions: {}, // 压缩选项
      brotliOptions: {}, // Brotli 压缩选项
      zlibOptions: {}, // Zlib 压缩选项
      additional: [
        // 添加额外的需要压缩的目录
        {
          include: "public/**/*",
          exclude: "",
        },
      ],
    }),
  ],
});
