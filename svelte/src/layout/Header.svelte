<script>
  import { active, reactive_meta } from 'tinro5';

  // 导航项配置
  const navItems = [
    { path: '/', name: '首页', disabled: false },
    { path: '/games', name: '游戏大厅', disabled: false },
    { path: '/dynamic', name: '游戏社区', disabled: false },
    { path: '', name: '敬请期待', disabled: true }
  ];

  let isMenuOpen = false;

  // 辅助函数：生成桌面端菜单项的类名
  const getDesktopItemClass = (item) => {
    const baseClass = "flex items-center gap-1.5 px-4 py-2 text-[#cecece] text-[15px] font-medium rounded-lg transition-all duration-300 hover:text-orange-500 hover:bg-white/5 hover:-translate-y-px";
    const isDisabledClass = item.disabled ? "cursor-not-allowed opacity-60 hover:text-[#cecece] hover:bg-transparent hover:translate-y-0" : "";
    return `${baseClass} ${isDisabledClass}`.trim();
  };

  // 辅助函数：生成移动端菜单项的类名
  const getMobileItemClass = (item) => {
    const baseClass = "flex items-center justify-center gap-1.5 px-4 py-3 text-[#cecece] text-base font-medium rounded-lg transition-all duration-300 hover:text-orange-500 hover:bg-white/5";
    const isDisabledClass = item.disabled ? "cursor-not-allowed opacity-60 hover:text-[#cecece] hover:bg-transparent" : "";
    return `${baseClass} ${isDisabledClass}`.trim();
  };
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] border-b border-white/10">
  <div class="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center h-[70px] sm:px-[4%]">
    <!-- Logo区域 -->
    <div class="flex items-center gap-5">
      <a href="/" class="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-102">
        <img src="/logo.svg" alt="logo" class="w-[45px] sm:w-[35px] brightness-0 invert" />
        <span class="text-2xl sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent tracking-wide">GameStorm</span>
      </a>
    </div>

    <!-- 导航菜单 - 桌面端 -->
    <nav class="flex-1 flex justify-center">
      <ul class="flex items-center gap-2 list-none m-0 p-0 max-[968px]:hidden">
        {#each navItems as item (item.path || item.name)}
          <li class="relative">
            {#if !item.disabled}
              <a 
                href={item.path}
                use:active
                active-class="active-link"
                exact
                class={getDesktopItemClass(item)}
                on:click={() => isMenuOpen = false}
              >
                <span>{item.name}</span>
              </a>
            {:else}
              <div class={getDesktopItemClass(item)}>
                <span>{item.name}</span>
                <span class="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1.5 text-white/60">即将上线</span>
              </div>
            {/if}
            {#if !item.disabled && reactive_meta.url === item.path}
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30px] h-0.5 bg-orange-500 rounded"></div>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>

    <!-- 右侧占位，保持布局平衡 -->
    <div class="w-[97px] max-[968px]:hidden"></div>

    <!-- 移动端菜单按钮 -->
    <button 
      class="hidden max-[968px]:block text-white text-2xl"
      on:click={() => isMenuOpen = !isMenuOpen}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
  
  <!-- 移动端菜单 -->
  <div 
    class="fixed top-[70px] left-[-100%] w-full h-[calc(100vh-70px)] bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] transition-all duration-300 overflow-y-auto p-5 max-[968px]:block hidden"
    class:left-0={isMenuOpen}
  >
    <ul class="flex flex-col gap-3 list-none m-0 p-0">
      {#each navItems as item (item.path || item.name)}
        <li class="w-full">
          {#if !item.disabled}
            <a 
              href={item.path}
              use:active
              active-class="active-link"
              exact
              class={getMobileItemClass(item)}
              on:click={() => isMenuOpen = false}
            >
              <span>{item.name}</span>
            </a>
          {:else}
            <div class={getMobileItemClass(item)}>
              <span>{item.name}</span>
              <span class="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1.5 text-white/60">即将上线</span>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</header>

<!-- 占位元素 -->
<div class="h-[70px]"></div>

<style>
  /* 自定义缩放效果 */
  .hover\:scale-102:hover {
    transform: scale(1.02);
  }
  
  /* tinro5 激活链接样式 */
  .active-link {
    color: #f97316 !important;
    background-color: rgba(249, 115, 22, 0.1) !important;
  }
  
  /* 桌面端激活链接的底部指示线 */
  a.active-link + div {
    display: block;
  }
</style>