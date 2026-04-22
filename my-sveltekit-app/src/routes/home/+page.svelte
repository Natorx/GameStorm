<script lang="ts">
	import { onMount } from 'svelte';

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

	// Mock 数据
	const mockImage = 'https://picsum.photos/200/150?random'; // 示例图片地址

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

	let gamesRandom = $state<Game[]>([]);

	// 处理函数
	function handleViewMore(category: string) {
		console.log(`查看更多: ${category}`);
		// 跳转逻辑等
	}

	function handleViewDetail(game: Game) {
		console.log('查看详情:', game);
		// 跳转详情页逻辑
	}

	onMount(() => {
		gamesRandom = mockRandomGames.filter((game: Game) => game.state === 1);
	});
</script>

<!-- 每日推荐 -->
<section class="mt-10">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2
				class="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent"
			>
				今日推荐
			</h2>
			<div class="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
			<p class="mt-2 text-sm text-gray-400">你可能会喜欢这些游戏~</p>
		</div>
		<button
			type="button"
			class="cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
			onclick={() => handleViewMore('今日推荐')}
		>
			更多推荐 →
		</button>
	</div>

	<div class="daily-recommendations">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each gamesRandom.slice(0, 6) as game (game.id)}
				<div
					class="group flex overflow-hidden rounded-xl bg-[#4C4C50]/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				>
					<div class="h-32 w-32 flex-shrink-0 overflow-hidden">
						<img
							src={game.path}
							alt={game.title}
							class="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>

					<div class="flex-1 p-4">
						<h3 class="mb-1 line-clamp-1 text-lg font-bold text-white">{game.name}</h3>
						<div class="mb-2 text-sm text-gray-400">{game.type || '休闲游戏'}</div>

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
								class="rounded-lg bg-blue-500/80 px-3 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-blue-500"
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
