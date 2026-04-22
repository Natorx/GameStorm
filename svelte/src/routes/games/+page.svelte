<script lang="ts">
  import mockImage from '$lib/assets/mock.jpg';

  // 类型定义
  interface Game {
    id: number;
    path: string;
    name: string;
    type: string;
    price: number;
    createtime: string;
    formattedDate: string;
  }

  interface Category {
    id: number;
    name: string;
  }

  // Mock 数据
  const mockGames: Game[] = [
    { id: 1, path: mockImage, name: '星穹铁道', type: '回合制RPG', price: 0, createtime: '2024-03-05', formattedDate: '2024-03-05' },
    { id: 2, path: mockImage, name: '绝区零', type: '动作RPG', price: 0, createtime: '2024-03-10', formattedDate: '2024-03-10' },
    { id: 3, path: mockImage, name: '鸣潮', type: '开放世界', price: 68, createtime: '2024-03-15', formattedDate: '2024-03-15' },
    { id: 4, path: mockImage, name: '无限暖暖', type: '换装冒险', price: 0, createtime: '2024-03-20', formattedDate: '2024-03-20' },
    { id: 5, path: mockImage, name: '明日方舟', type: '策略塔防', price: 0, createtime: '2024-03-25', formattedDate: '2024-03-25' },
    { id: 6, path: mockImage, name: '幻塔', type: '开放世界', price: 0, createtime: '2024-03-30', formattedDate: '2024-03-30' },
    { id: 7, path: mockImage, name: '原神', type: '开放世界', price: 0, createtime: '2024-04-01', formattedDate: '2024-04-01' },
    { id: 8, path: mockImage, name: '崩坏3', type: '动作RPG', price: 0, createtime: '2024-04-05', formattedDate: '2024-04-05' }
  ];

  const mockGameTypes: Category[] = [
    { id: 1, name: '开放世界' },
    { id: 2, name: '动作RPG' },
    { id: 3, name: '回合制RPG' },
    { id: 4, name: '策略塔防' },
    { id: 5, name: '换装冒险' }
  ];

  const mockPlatforms: Category[] = [
    { id: 1, name: 'PC' },
    { id: 2, name: 'PlayStation' },
    { id: 3, name: 'Xbox' },
    { id: 4, name: 'Nintendo Switch' },
    { id: 5, name: 'iOS' },
    { id: 6, name: 'Android' }
  ];

  // 响应式状态
  let games = $state<Game[]>(mockGames);
  let loading = $state(false);
  let gameTotal = $state(mockGames.length);
  let typeSearch = $state('');
  let flatformSearch = $state('');
  let gtype = $state<Category[]>(mockGameTypes);
  let flatformType = $state<Category[]>(mockPlatforms);

  // 处理函数
  function viewGameDetail(gameId: number) {
    console.log('查看游戏详情:', gameId);
    // 跳转详情页逻辑
  }

  function getbytype(typeId: number) {
    const selectedType = mockGameTypes.find(t => t.id === typeId);
    if (selectedType) {
      games = mockGames.filter(game => game.type === selectedType.name);
      gameTotal = games.length;
      console.log(`筛选类型: ${selectedType.name}`);
    }
  }

  function getbyflatform(platformId: number) {
    const selectedPlatform = mockPlatforms.find(p => p.id === platformId);
    if (selectedPlatform) {
      // 这里是示例逻辑，实际应根据平台筛选游戏
      console.log(`筛选平台: ${selectedPlatform.name}`);
      // 暂时保持所有游戏，实际项目中需要根据游戏平台字段筛选
      games = mockGames;
      gameTotal = games.length;
    }
  }

  function searchByType() {
    if (typeSearch.trim()) {
      games = mockGames.filter(game => 
        game.type.toLowerCase().includes(typeSearch.toLowerCase())
      );
      gameTotal = games.length;
    } else {
      games = mockGames;
      gameTotal = mockGames.length;
    }
  }

  function searchByPlatform() {
    if (flatformSearch.trim()) {
      // 这里是示例逻辑，实际应根据平台名称筛选游戏
      console.log(`搜索平台: ${flatformSearch}`);
      games = mockGames;
      gameTotal = games.length;
    } else {
      games = mockGames;
      gameTotal = mockGames.length;
    }
  }
</script>

<div class="min-h-screen relative">
  <!-- 背景层 -->
  <div class="fixed inset-0 -z-10">
    <img src={mockImage} alt="background" class="h-full w-full object-cover blur-[10px]" />
    <div class="absolute inset-0 bg-black/70"></div>
  </div>

  <!-- 主内容 -->
  <div class="mx-auto max-w-350 p-5">
    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- 左侧游戏列表 -->
      <div class="min-w-0 flex-1">
        <!-- 统计栏 -->
        <div class="mb-5 rounded-xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
          <div class="flex items-baseline gap-2">
            <span class="text-sm text-white/70">为您找到</span>
            <span class="text-2xl font-bold text-blue-400">{gameTotal}</span>
            <span class="text-sm text-white/70">款游戏</span>
          </div>
        </div>

        <!-- 加载状态 -->
        {#if loading}
          <div class="flex flex-col items-center justify-center py-16">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-400"></div>
            <p class="mt-4 text-white/70">加载游戏中...</p>
          </div>

        <!-- 游戏列表 -->
        {:else if games.length > 0}
          <div class="flex flex-col gap-4">
            {#each games as game (game.id)}
              <button
                type="button"
                class="game-card w-full cursor-pointer rounded-xl border border-white/10 bg-black/60 p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-lg"
                onclick={() => viewGameDetail(game.id)}
              >
                <div class="flex flex-col items-center gap-5 sm:flex-row">
                  <div class="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:w-52 group">
                    <img 
                      src={game.path} 
                      alt={game.name} 
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <span class="rounded-full bg-blue-400 px-4 py-1.5 text-sm text-white">查看详情</span>
                    </div>
                  </div>
                  
                  <div class="flex-1 text-center sm:text-left">
                    <h3 class="mb-2 text-lg font-semibold text-white">{game.name}</h3>
                    <div class="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <span class="flex items-center gap-1 text-xs text-white/60">
                        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {game.formattedDate}
                      </span>
                      {#if game.type}
                        <span class="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/80">{game.type}</span>
                      {/if}
                    </div>
                  </div>
                  
                  <div class="w-full shrink-0 text-center sm:w-24">
                    {#if game.price === 0}
                      <span class="text-sm font-semibold text-emerald-500">免费开玩</span>
                    {:else}
                      <span class="text-lg font-bold text-white">¥{game.price}</span>
                    {/if}
                  </div>
                </div>
              </button>
            {/each}
          </div>

        <!-- 空状态 -->
        {:else}
          <div class="py-16 text-center">
            <svg class="mx-auto mb-4 h-16 w-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="text-base text-white/50">暂无游戏数据</p>
          </div>
        {/if}
      </div>

      <!-- 右侧筛选面板 -->
      <div class="flex w-full shrink-0 flex-col gap-5 lg:w-80">
        <!-- 游戏分类 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">游戏分类</h3>
            <svg class="h-5 w-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
          </div>
          
          <div class="relative mb-5">
            <input 
              type="text" 
              bind:value={typeSearch}
              onkeypress={(e) => e.key === 'Enter' && searchByType()}
              placeholder="搜索游戏类别..."
              class="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 pr-9 text-sm text-white placeholder:text-white/50 focus:border-blue-400 focus:bg-white/15 focus:outline-none"
            />
            <button 
              onclick={searchByType} 
              class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-1"
              aria-label="搜索游戏类别"
            >
              <svg class="h-4.5 w-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div class="mt-2">
            <div class="mb-3 text-sm text-white/70">标签列表</div>
            <div class="grid grid-cols-3 gap-2">
              {#each gtype as item (item.id)}
                <button
                  type="button"
                  onclick={() => getbytype(item.id)}
                  class="cursor-pointer rounded-md border border-white/15 bg-white/5 px-2 py-1.5 text-center text-xs text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-400/20 hover:text-white"
                >
                  {item.name}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <!-- 平台分类 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">平台分类</h3>
            <svg class="h-5 w-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          
          <div class="relative mb-5">
            <input 
              type="text" 
              bind:value={flatformSearch}
              onkeypress={(e) => e.key === 'Enter' && searchByPlatform()}
              placeholder="搜索游戏平台..."
              class="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 pr-9 text-sm text-white placeholder:text-white/50 focus:border-blue-400 focus:bg-white/15 focus:outline-none"
            />
            <button 
              onclick={searchByPlatform} 
              class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-1"
              aria-label="搜索游戏平台"
            >
              <svg class="h-4.5 w-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div class="mt-2">
            <div class="mb-3 text-sm text-white/70">标签列表</div>
            <div class="grid grid-cols-2 gap-2">
              {#each flatformType as item (item.id)}
                <button
                  type="button"
                  onclick={() => getbyflatform(item.id)}
                  class="cursor-pointer rounded-md border border-white/15 bg-white/5 px-2 py-1.5 text-center text-xs text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-400/20 hover:text-white"
                >
                  {item.name}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>