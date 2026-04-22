import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	server: {
		host: true, // 或者 '0.0.0.0'
		strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
		cors: true,
		fs: {
			allow: [
				'C:/Users/Administrator/Desktop/GameStorm',
				// 添加 pnpm 的虚拟存储目录
				'C:/Users/Administrator/Desktop/GameStorm/node_modules/.pnpm'
			]
		}
	}
});
