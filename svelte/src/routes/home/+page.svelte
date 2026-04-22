<script lang="ts">
	import { onMount } from 'svelte';
	import mockImage from '$lib/assets/mock.jpg';
	import { Carousel } from 'flowbite-svelte';

	// 类型定义
	interface Game {
		id: number;
		path: string;
		title: string;
		name: string;
		type: string;
		price: number;
		createtime: string;
		state: number;
	}

	function formatDate(date: Date): string {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	const mockRandomGames: Game[] = [
		{
			id: 11,
			path: mockImage,
			title: 'random1',
			name: '星穹铁道',
			type: '回合制RPG',
			price: 0,
			createtime: formatDate(new Date('2024-03-05')),
			state: 1
		},
		{
			id: 12,
			path: mockImage,
			title: 'random2',
			name: '绝区零',
			type: '动作RPG',
			price: 0,
			createtime: formatDate(new Date('2024-03-10')),
			state: 1
		},
		{
			id: 13,
			path: mockImage,
			title: 'random3',
			name: '鸣潮',
			type: '开放世界',
			price: 0,
			createtime: formatDate(new Date('2024-03-15')),
			state: 1
		},
		{
			id: 14,
			path: mockImage,
			title: 'random4',
			name: '无限暖暖',
			type: '换装冒险',
			price: 0,
			createtime: formatDate(new Date('2024-03-20')),
			state: 1
		},
		{
			id: 15,
			path: mockImage,
			title: 'random5',
			name: '明日方舟',
			type: '策略塔防',
			price: 0,
			createtime: formatDate(new Date('2024-03-25')),
			state: 1
		},
		{
			id: 16,
			path: mockImage,
			title: 'random6',
			name: '幻塔',
			type: '开放世界',
			price: 0,
			createtime: formatDate(new Date('2024-03-30')),
			state: 1
		}
	];

	const mockCarouselImages = [
		{
			src: mockImage,
			alt: '游戏截图1',
			title: '星穹铁道'
		},
		{
			src: mockImage,
			alt: '游戏截图2',
			title: '绝区零'
		},
		{
			src: mockImage,
			alt: '游戏截图3',
			title: '鸣潮'
		}
	];

	let gamesRandom = $state<Game[]>([]);
	let currentSlide = $state(0);

	// 处理函数
	function handleViewMore(category: string) {
		console.log(`查看更多: ${category}`);
	}

	function handleViewDetail(game: Game) {
		console.log('查看详情:', game);
	}

	onMount(() => {
		gamesRandom = mockRandomGames.filter((game: Game) => game.state === 1);
	});
</script>

<!-- 橙黑主题轮播区 - Steam风格 -->
<div class="mx-auto mt-6 w-full max-w-7xl px-4">
	<div class="flex flex-col items-center gap-6 lg:flex-row">
		<!-- 左侧文字介绍区 - 适中大小，橙黑配色 -->
		<div class="w-full lg:w-2/5">
			<div class="space-y-4">
				<!-- 橙黑主题标签 -->
				<div class="flex items-center gap-2">
					<div class="h-6 w-1 rounded-full bg-orange-500"></div>
					<span class="text-sm font-semibold tracking-wider text-orange-500">🔥 热门推荐</span>
				</div>

				<!-- 标题 - Steam风格，不会太大 -->
				<h1 class="text-3xl font-bold tracking-tight md:text-4xl">
					<span class="text-white">今日</span>
					<span class="text-orange-500">橙黑</span>
					<span class="text-white">精选</span>
				</h1>

				<!-- 副标题/描述 -->
				<p class="text-sm leading-relaxed text-gray-300">
					探索我们精心挑选的橙黑主题游戏合集，从视觉风格到游戏体验，
					每一款都彰显独特个性。大胆的色彩碰撞，深邃的黑与活力的橙， 带来前所未有的游戏盛宴。
				</p>

				<!-- 数据统计 -->
				<div class="flex gap-6 pt-2">
					<div>
						<div class="text-2xl font-bold text-orange-500">6+</div>
						<div class="text-xs text-gray-400">精选游戏</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-orange-500">100%</div>
						<div class="text-xs text-gray-400">免费开玩</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-orange-500">24/7</div>
						<div class="text-xs text-gray-400">在线畅玩</div>
					</div>
				</div>

				<!-- 行动按钮 -->
				<div class="flex gap-3 pt-2">
					<button
						class="rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600"
					>
						立即体验
					</button>
					<button
						class="rounded-lg border border-gray-700 bg-gray-800 px-6 py-2 font-semibold text-gray-300 transition-all duration-300 hover:bg-gray-700"
					>
						了解更多
					</button>
				</div>

				<!-- 末尾批注/短语 -->
				<div class="border-t border-orange-500/20 pt-4">
					<p class="flex items-center gap-2 text-sm text-orange-400/80 italic">
						<span class="text-orange-500">✦</span>
						活力与沉稳的交响 · 橙黑美学新定义
						<span class="text-orange-500">✦</span>
					</p>
				</div>
			</div>
		</div>

		<!-- 右侧轮播图区 -->
		<div class="w-full lg:w-3/5">
			<div class="relative overflow-hidden rounded-xl shadow-2xl">
				<Carousel
					images={mockCarouselImages}
					duration={5000}
					slideDuration={1500}
					class="h-64 w-full md:h-80 lg:h-96"
					bind:index={currentSlide}
				/>

				<!-- 轮播图叠加内容 - 让画面更丰富 -->
				<div class="pointer-events-none absolute inset-0">
					<!-- 渐变遮罩层 -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-orange-500/20"
					></div>

					<!-- 底部游戏标题 -->
					<div
						class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4"
					>
						<div class="flex items-end justify-between text-white">
							<div>
								<p class="font-mono text-xs text-orange-400">当前热门</p>
								<p class="text-lg font-bold">
									{mockCarouselImages[currentSlide]?.title || '精选游戏'}
								</p>
							</div>
							<div class="flex gap-1">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-sm text-orange-400"
								>
									{currentSlide + 1}/{mockCarouselImages.length}
								</div>
							</div>
						</div>
					</div>

					<!-- 装饰性元素 -->
					<div
						class="absolute top-4 right-4 h-12 w-12 rounded-tr-lg border-t-2 border-r-2 border-orange-400/40"
					></div>
					<div
						class="absolute bottom-4 left-4 h-12 w-12 rounded-bl-lg border-b-2 border-l-2 border-orange-400/40"
					></div>

					<!-- 橙黑主题光晕效果 -->
					<div
						class="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"
					></div>
				</div>
			</div>

			<!-- 轮播图指示器 -->
			<div class="mt-4 flex justify-center gap-2">
				{#each mockCarouselImages as img, i}
					<button
						class="rounded-full transition-all duration-300 {currentSlide === i
							? 'h-2 w-6 bg-orange-500'
							: 'h-2 w-2 bg-gray-600 hover:bg-gray-500'}"
						onclick={() => (currentSlide = i)}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

<!-- 每日推荐 -->
<section class="mt-16">
	<div class="mx-auto mb-6 flex max-w-7xl items-center justify-between px-4">
		<div>
			<h2 class="text-2xl font-bold md:text-3xl">
				<span class="text-white">今日</span>
				<span class="text-orange-500">推荐</span>
			</h2>
			<div class="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300"></div>
			<p class="mt-2 text-sm text-gray-400">你可能会喜欢这些游戏~</p>
		</div>
		<button
			type="button"
			class="cursor-pointer text-sm text-gray-400 transition-colors hover:text-orange-500"
			onclick={() => handleViewMore('今日推荐')}
		>
			更多推荐 →
		</button>
	</div>

	<div class="daily-recommendations mx-auto max-w-7xl px-4">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each gamesRandom.slice(0, 6) as game (game.id)}
				<div
					class="group flex overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-2xl"
				>
					<div class="h-32 w-32 shrink-0 overflow-hidden">
						<img
							src={game.path}
							alt={game.title}
							class="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>

					<div class="flex-1 p-4">
						<h3 class="mb-1 line-clamp-1 text-lg font-bold text-white">{game.name}</h3>
						<div class="mb-2 text-sm text-orange-400">{game.type || '休闲游戏'}</div>

						<div class="flex items-center justify-between">
							{#if game.price === 0}
								<div class="font-semibold text-green-400">
									<span class="text-sm">免费开玩</span>
								</div>
							{:else}
								<div class="font-bold text-white">
									<span class="text-lg">¥</span>
									<span class="text-xl">{game.price}</span>
								</div>
							{/if}

							<button
								class="rounded-lg bg-orange-500/80 px-3 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-orange-500"
								onclick={() => handleViewDetail(game)}
							>
								查看详情
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
