/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 15:50:20
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 16:31:00
 * @FilePath: \react_12_30\hkzu-mobile\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 关键：把 @ 指向项目根目录下的 src 文件夹
      '@': path.resolve(__dirname, './src'),
      // 可选：可配置更多别名，比如指向 components 文件夹
      // '@components': path.resolve(__dirname, './src/components'),
    },
  },
})
