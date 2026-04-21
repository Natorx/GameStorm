<template>
  <div class="min-h-screen relative">
    <!-- 背景层 -->
    <div class="fixed inset-0 -z-10">
      <img src="../../assets/mock.jpg" alt="background" class="w-full h-full object-cover blur-[10px]" />
      <div class="absolute inset-0 bg-black/70"></div>
    </div>

    <!-- 主内容 -->
    <div class="max-w-[1400px] mx-auto p-5">
      <div class="flex gap-6 flex-col lg:flex-row">
        <!-- 左侧游戏列表 -->
        <div class="flex-1 min-w-0">
          <!-- 统计栏 -->
          <div class="bg-black/80 backdrop-blur-md rounded-xl p-4 mb-5 border border-white/10">
            <div class="flex items-baseline gap-2">
              <span class="text-white/70 text-sm">为您找到</span>
              <span class="text-blue-400 text-2xl font-bold">{{ gameTotal }}</span>
              <span class="text-white/70 text-sm">款游戏</span>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-16">
            <div class="w-10 h-10 border-4 border-white/10 border-t-blue-400 rounded-full animate-spin"></div>
            <p class="text-white/70 mt-4">加载游戏中...</p>
          </div>

          <!-- 游戏列表 -->
          <div v-else-if="games.length > 0" class="flex flex-col gap-4">
            <div v-for="game in games" :key="game.id" class="game-card bg-black/60 backdrop-blur-md rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-lg cursor-pointer">
              <div @click="viewGameDetail(game.id)" class="flex flex-col sm:flex-row items-center p-4 gap-5 no-underline">
                <div class="w-full sm:w-52 h-32 rounded-lg overflow-hidden relative flex-shrink-0 group">
                  <img :src="game.path" :alt="game.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <span class="text-white text-sm bg-blue-400 px-4 py-1.5 rounded-full">查看详情</span>
                  </div>
                </div>
                
                <div class="flex-1 text-center sm:text-left">
                  <h3 class="text-white text-lg font-semibold mb-2">{{ game.name }}</h3>
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span class="flex items-center gap-1 text-white/60 text-xs">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {{ game.formattedDate }}
                    </span>
                    <span v-if="game.type" class="bg-white/10 border border-white/20 px-2 py-0.5 rounded text-white/80 text-xs">{{ game.type }}</span>
                  </div>
                </div>
                
                <div class="w-full sm:w-24 text-center flex-shrink-0">
                  <span v-if="game.price == 0" class="text-emerald-500 font-semibold text-sm">免费开玩</span>
                  <span v-else class="text-white font-bold text-lg">¥{{ game.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-16">
            <svg class="w-16 h-16 text-white/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="text-white/50 text-base">暂无游戏数据</p>
          </div>
        </div>

        <!-- 右侧筛选面板 -->
        <div class="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5">
          <!-- 游戏分类 -->
          <div class="bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-5">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-white text-lg font-semibold">游戏分类</h3>
              <svg class="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
            </div>
            
            <div class="relative mb-5">
              <input 
                type="text" 
                v-model="typeSearch"
                placeholder="搜索游戏类别..."
                @keyup.enter="searchByType"
                class="w-full py-2 pl-3 pr-9 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 placeholder:text-white/50"
              />
              <button @click="searchByType" class="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1">
                <svg class="w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            
            <div class="mt-2">
              <div class="text-white/70 text-sm mb-3">标签列表</div>
              <div class="grid grid-cols-3 gap-2">
                <div 
                  v-for="item in gtype" 
                  :key="item.id"
                  @click="getbytype(item.id)"
                  class="py-1.5 px-2 bg-white/5 border border-white/15 rounded-md text-white/70 text-xs text-center cursor-pointer transition-all duration-300 hover:bg-blue-400/20 hover:border-blue-400/40 hover:text-white hover:-translate-y-0.5"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- 平台分类 -->
          <div class="bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-5">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-white text-lg font-semibold">平台分类</h3>
              <svg class="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            
            <div class="relative mb-5">
              <input 
                type="text" 
                v-model="flatformSearch"
                placeholder="搜索游戏平台..."
                @keyup.enter="searchByPlatform"
                class="w-full py-2 pl-3 pr-9 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 placeholder:text-white/50"
              />
              <button @click="searchByPlatform" class="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1">
                <svg class="w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            
            <div class="mt-2">
              <div class="text-white/70 text-sm mb-3">标签列表</div>
              <div class="grid grid-cols-2 gap-2">
                <div 
                  v-for="item in flatformType" 
                  :key="item.id"
                  @click="getbyflatform(item.id)"
                  class="py-1.5 px-2 bg-white/5 border border-white/15 rounded-md text-white/70 text-xs text-center cursor-pointer transition-all duration-300 hover:bg-blue-400/20 hover:border-blue-400/40 hover:text-white hover:-translate-y-0.5"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 格式化日期函数（如果 utils 中没有，就在这里定义）
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Mock 数据类型定义
interface Game {
  id: string
  path: string
  title: string
  name: string
  type: string | null
  price: number
  createtime: string
  formattedDate: string
}

interface GameType {
  id: string
  name: string
}

interface PlatformType {
  id: string
  name: string
}

// 模拟数据
const mockGames: Game[] = [
  {
    id: '1',
    path: '../../assets/mock.jpg',
    title: '冒险之旅',
    name: '冒险之旅',
    type: '角色扮演',
    price: 98,
    createtime: '2024-01-15T00:00:00Z',
    formattedDate: formatDate(new Date('2024-01-15T00:00:00Z'))
  },
  {
    id: '2',
    path: '../../assets/mock.jpg',
    title: '极速狂飙',
    name: '极速狂飙',
    type: '竞速',
    price: 0,
    createtime: '2024-02-20T00:00:00Z',
    formattedDate: formatDate(new Date('2024-02-20T00:00:00Z'))
  },
  {
    id: '3',
    path: '../../assets/mock.jpg',
    title: '星际探索',
    name: '星际探索',
    type: '射击',
    price: 128,
    createtime: '2024-03-10T00:00:00Z',
    formattedDate: formatDate(new Date('2024-03-10T00:00:00Z'))
  },
  {
    id: '4',
    path: '../../assets/mock.jpg',
    title: '模拟城市',
    name: '模拟城市',
    type: '模拟经营',
    price: 88,
    createtime: '2024-04-05T00:00:00Z',
    formattedDate: formatDate(new Date('2024-04-05T00:00:00Z'))
  },
  {
    id: '5',
    path: '../../assets/mock.jpg',
    title: '忍者传奇',
    name: '忍者传奇',
    type: '动作',
    price: 0,
    createtime: '2024-05-18T00:00:00Z',
    formattedDate: formatDate(new Date('2024-05-18T00:00:00Z'))
  }
]

const mockGameTypes: GameType[] = [
  { id: '1', name: '角色扮演' },
  { id: '2', name: '动作' },
  { id: '3', name: '射击' },
  { id: '4', name: '竞速' },
  { id: '5', name: '模拟经营' },
  { id: '6', name: '策略' },
  { id: '7', name: '体育' },
  { id: '8', name: '休闲' }
]

const mockPlatforms: PlatformType[] = [
  { id: '1', name: 'Steam' },
  { id: '2', name: 'Epic Games' },
  { id: '3', name: 'PlayStation' },
  { id: '4', name: 'Xbox' },
  { id: '5', name: 'Nintendo Switch' },
  { id: '6', name: 'iOS' },
  { id: '7', name: 'Android' }
]

// 状态
const typeSearch = ref('')
const flatformSearch = ref('')
const loading = ref(false)
const gameTotal = ref(mockGames.length)
const games = ref<Game[]>([...mockGames])
const gtype = ref<GameType[]>([...mockGameTypes])
const flatformType = ref<PlatformType[]>([...mockPlatforms])

// 查看游戏详情
const viewGameDetail = (id: string) => {
  // 方式1: 使用 alert 或 console 查看效果
  console.log('查看游戏详情，ID:', id)
  alert(`查看游戏详情，ID: ${id}`)
  
  // 方式2: 如果你后续会添加路由，可以取消下面的注释
  // router.push({ name: 'gdetails', params: { id } })
  
  // 方式3: 使用事件总线或 emit 传递给父组件
  // emit('view-detail', id)
}

// 根据类型筛选
const getbytype = (id: string) => {
  loading.value = true
  // 模拟异步筛选
  setTimeout(() => {
    const selectedType = mockGameTypes.find(t => t.id === id)
    if (selectedType) {
      const filtered = mockGames.filter(game => game.type === selectedType.name)
      games.value = [...filtered]
      gameTotal.value = filtered.length
    } else {
      games.value = [...mockGames]
      gameTotal.value = mockGames.length
    }
    loading.value = false
  }, 300)
}

// 根据平台筛选
const getbyflatform = (id: string) => {
  loading.value = true
  // 模拟异步筛选
  setTimeout(() => {
    const selectedPlatform = mockPlatforms.find(p => p.id === id)
    if (selectedPlatform) {
      // 模拟平台筛选：根据平台名称随机返回游戏
      // 这里可以根据实际业务逻辑修改
      const filtered = mockGames.filter((_, index) => {
        // 简单的模拟逻辑：根据平台id决定返回哪些游戏
        const platformId = parseInt(id)
        return index % 2 === (platformId % 2)
      })
      games.value = filtered.length ? filtered : []
      gameTotal.value = filtered.length
    } else {
      games.value = [...mockGames]
      gameTotal.value = mockGames.length
    }
    loading.value = false
  }, 300)
}

// 搜索游戏类型（模拟）
const searchByType = () => {
  if (typeSearch.value.trim()) {
    loading.value = true
    setTimeout(() => {
      const keyword = typeSearch.value.toLowerCase()
      const filtered = mockGameTypes.filter(t => t.name.toLowerCase().includes(keyword))
      gtype.value = filtered.length ? filtered : []
      loading.value = false
    }, 200)
  } else {
    // 清空搜索时重置
    gtype.value = [...mockGameTypes]
  }
}

// 搜索平台（模拟）
const searchByPlatform = () => {
  if (flatformSearch.value.trim()) {
    loading.value = true
    setTimeout(() => {
      const keyword = flatformSearch.value.toLowerCase()
      const filtered = mockPlatforms.filter(p => p.name.toLowerCase().includes(keyword))
      flatformType.value = filtered.length ? filtered : []
      loading.value = false
    }, 200)
  } else {
    flatformType.value = [...mockPlatforms]
  }
}
</script>

<style scoped>
/* 保留自定义动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

/* 游戏卡片样式 */
.game-card {
  cursor: pointer;
}
</style>