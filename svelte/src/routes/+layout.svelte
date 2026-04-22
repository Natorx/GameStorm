<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state'; // ← Svelte 5 runes 版本
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/logo.svg';
	import { goto } from '$app/navigation';
	import logoUrl from '$lib/assets/logo.svg';

	let { children } = $props();

	// 类型定义
	interface NavItem {
		name: string;
		path?: string;
		disabled?: boolean;
	}

	// 导航项数据
	let navItems: NavItem[] = [
		{ name: '首页', path: '/home' },
		{ name: '游戏', path: '/games' },
		{ name: '社区', path: '/community' },
		{ name: '关于', path: '/about' },
		{ name: '即将上线', path: '/coming-soon', disabled: true }
	];

	// 判断当前路由 - 直接使用 page，不需要 $ 前缀
	function isCurrentRoute(path?: string): boolean {
		if (!path) return false;
		return page.url.pathname === path; // ← 修复：去掉 $
	}

	// 导航跳转
	async function navigateTo(path?: string) {
		if (!path) return;
		await goto(path);
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
	<header
		class="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]"
	>
		<div
			class="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-[5%] sm:px-[4%]"
		>
			<!-- Logo区域 -->
			<div class="flex items-center gap-5">
				<a
					href="/home"
					onclick={(e) => {
						e.preventDefault();
						navigateTo('/home');
					}}
					class="flex cursor-pointer items-center gap-3 transition-transform duration-300 hover:scale-102"
					aria-label="Home"
				>
					<img
						src={logoUrl}
						alt="GameStorm Logo"
						class="w-[45px] brightness-0 invert sm:w-[35px]"
					/>
					<span
						class="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-2xl font-bold tracking-wide text-transparent sm:text-xl"
					>
						GameStorm
					</span>
				</a>
			</div>

			<!-- 导航菜单 -->
			<nav class="flex flex-1 justify-center">
				<ul class="m-0 flex list-none items-center gap-2 p-0">
					{#each navItems as item (item.path || item.name)}
						<li class="relative">
							{#if item.disabled}
								<span
									class="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-4 py-2 text-[15px] font-medium text-[#cecece] opacity-60"
									aria-disabled="true"
								>
									<span>{item.name}</span>
									<span
										class="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60"
									>
										即将上线
									</span>
								</span>
							{:else}
								<a
									href={item.path}
									onclick={(e) => {
										e.preventDefault();
										navigateTo(item.path);
									}}
									class="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[15px] font-medium text-[#cecece] transition-all duration-300 hover:-translate-y-px hover:bg-white/5 hover:text-orange-500
										{isCurrentRoute(item.path) ? ' bg-orange-500/10 text-orange-500' : ''}"
									aria-current={isCurrentRoute(item.path) ? 'page' : undefined}
								>
									<span>{item.name}</span>
								</a>
								{#if isCurrentRoute(item.path)}
									<div
										class="absolute bottom-0 left-1/2 h-0.5 w-[30px] -translate-x-1/2 rounded bg-orange-500"
									></div>
								{/if}
							{/if}
						</li>
					{/each}
				</ul>
			</nav>

			<!-- 右侧占位，保持布局平衡 -->
			<div class="w-[97px]"></div>
		</div>
	</header>

  <main class="flex-1 pt-17.5 overflow-x-hidden">
    <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
      {@render children()}
    </div>
  </main>

	<!-- 页脚 -->
	<footer class="mt-15 border-t border-white/10 bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a]">
		<!-- 主内容区域 -->
		<div class="border-b border-white/10">
			<div
				class="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-10 px-[5%] py-[50px] pb-10"
			>
				<!-- 左侧链接区域 -->
				<div class="flex flex-1 flex-wrap gap-20">
					<!-- 下载客户端 -->
					<div class="min-w-[120px]">
						<h3
							class="relative mb-5 pb-2.5 text-base font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[30px] after:rounded-sm after:bg-gradient-to-r after:from-[#f97316] after:to-[#ffa500] after:content-['']"
						>
							下载客户端
						</h3>
						<ul class="m-0 list-none p-0">
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-windows-fill text-lg"></div>
								<span>Windows版</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-mac-line text-lg"></div>
								<span>Mac版</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-android-fill text-lg"></div>
								<span>Android版</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-apple-fill text-lg"></div>
								<span>iOS版</span>
							</li>
						</ul>
					</div>

					<!-- 官方渠道 -->
					<div class="min-w-[120px]">
						<h3
							class="relative mb-5 pb-2.5 text-base font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[30px] after:rounded-sm after:bg-gradient-to-r after:from-[#f97316] after:to-[#ffa500] after:content-['']"
						>
							官方渠道
						</h3>
						<ul class="m-0 list-none p-0">
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-wechat-2-fill text-lg"></div>
								<span>微信公众号</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-microsoft-fill text-lg"></div>
								<span>官方微博</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-bilibili-fill text-lg"></div>
								<span>B站官方</span>
							</li>
							<li
								class="flex cursor-pointer items-center gap-2 py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								<div class="i-ri-tiktok-fill text-lg"></div>
								<span>抖音号</span>
							</li>
						</ul>
					</div>

					<!-- 友情链接 -->
					<div class="min-w-[120px]">
						<h3
							class="relative mb-5 pb-2.5 text-base font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[30px] after:rounded-sm after:bg-gradient-to-r after:from-[#f97316] after:to-[#ffa500] after:content-['']"
						>
							友情链接
						</h3>
						<ul class="m-0 list-none p-0">
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								竹影居博客
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								游戏星空
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								游民星空
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								3DM游戏网
							</li>
						</ul>
					</div>

					<!-- 关于我们 -->
					<div class="min-w-[120px]">
						<h3
							class="relative mb-5 pb-2.5 text-base font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[30px] after:rounded-sm after:bg-gradient-to-r after:from-[#f97316] after:to-[#ffa500] after:content-['']"
						>
							关于我们
						</h3>
						<ul class="m-0 list-none p-0">
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								公司简介
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								联系我们
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								加入我们
							</li>
							<li
								class="cursor-pointer py-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#f97316]"
							>
								商务合作
							</li>
						</ul>
					</div>
				</div>

				<!-- 右侧 Logo 区域 -->
				<div class="min-w-[200px] text-right">
					<div class="mb-5 flex items-center justify-end gap-3">
						<a-image
							width="60"
							src="src/assets/logo.svg"
							class="brightness-0 invert filter transition-transform duration-300 hover:scale-105"
							preview={false}
						/>
						<span
							class="bg-gradient-to-r from-[#f97316] to-[#ffa500] bg-clip-text text-[28px] font-bold tracking-wide text-transparent"
						>
							GameStorm
						</span>
					</div>
					<div class="mt-5 flex justify-end gap-[15px]">
						<div
							class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f97316] hover:text-white"
						>
							<div class="i-ri-wechat-fill"></div>
						</div>
						<div
							class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f97316] hover:text-white"
						>
							<div class="i-ri-weibo-fill"></div>
						</div>
						<div
							class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f97316] hover:text-white"
						>
							<div class="i-ri-bilibili-fill"></div>
						</div>
						<div
							class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f97316] hover:text-white"
						>
							<div class="i-ri-tiktok-fill"></div>
						</div>
						<div
							class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f97316] hover:text-white"
						>
							<div class="i-ri-qq-fill"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 底部版权信息 -->
		<div class="mx-auto max-w-[1400px] px-[5%] py-[30px] pb-[25px] text-center">
			<div class="mb-[15px]">
				<p class="m-0 mb-2 text-[13px] text-white/80">
					Copyright © 1999-2024, gstorm.com. All rights reserved.
				</p>
				<div class="text-xs text-white/60">
					<span>ICP证：苏B2-20240603</span>
					<span class="mx-2 text-white/30">|</span>
					<span>沪ICP备08023580号-3</span>
				</div>
			</div>

			<div class="mb-3 text-[11px] leading-relaxed text-white/50">
				<span>镇江高职321101200602012812号</span>
				<span class="mx-2 text-white/30">|</span>
				<span>（苏）互联网平台备字[2024]第00001号</span>
				<span class="mx-2 text-white/30">|</span>
				<span>苏网备1050001号</span>
				<span class="mx-2 text-white/30">|</span>
				<span>旅游度假资质</span>
				<span class="mx-2 text-white/30">|</span>
				<span>平台信息</span>
			</div>

			<div class="text-[11px] leading-relaxed text-white/50">
				<span>违法和不良信息举报电话：021-22500846</span>
				<span class="mx-2 text-white/30">|</span>
				<span>全国旅游投诉热线：12345</span>
				<span class="mx-2 text-white/30">|</span>
				<span>镇江市旅游网站落实诚信建设主体责任承诺书</span>
			</div>
		</div>
	</footer>

	<!-- 语言切换器（隐藏但功能正常） -->
	<div style="display:none">
		{#each locales as locale (locale)}
			<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
		{/each}
	</div>
</div>

<style>
	/* 响应式断点 - 需要在 :global 中定义或使用 Svelte 的响应式类 */
	@media (max-width: 968px) {
		:global(.footer-responsive .flex-wrap) {
			flex-direction: column;
		}
	}
</style>
