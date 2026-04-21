<script lang="ts">
  interface Page {
    title: string
    content: string
  }
  
  export let page: Page | undefined = undefined
</script>

{#if page}
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        {page.title}
      </h1>
      
      <div class="text-gray-600 leading-relaxed">
        {page.content}
      </div>
      
      <!-- 动态内容的演示 -->
      {#if page.title === '首页'}
        <div class="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 class="text-xl font-semibold text-blue-800 mb-3">
            最新动态
          </h2>
          <ul class="space-y-2 text-gray-700">
            <li>✨ Svelte 5 已经发布</li>
            <li>🎉 UnoCSS 让样式编写更高效</li>
            <li>🚀 Flex 布局让界面更灵活</li>
          </ul>
        </div>
      {:else if page.title === '关于'}
        <div class="mt-8 flex justify-center gap-4">
          <div class="text-center p-4">
            <div class="text-4xl mb-2">⚡</div>
            <div class="font-semibold">高性能</div>
          </div>
          <div class="text-center p-4">
            <div class="text-4xl mb-2">🎨</div>
            <div class="font-semibold">易用性</div>
          </div>
          <div class="text-center p-4">
            <div class="text-4xl mb-2">🌍</div>
            <div class="font-semibold">响应式</div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8">
      <div class="text-center text-gray-500">加载中...</div>
    </div>
  </div>
{/if}