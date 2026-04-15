<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/date'

// 定义 Banner 接口
interface Banner {
  state: number
  picPath: string
  title: string
}

// 定义 Game 接口
interface Game {
  id: number
  path: string
  title: string
  name: string
  type: string
  price: number
  createtime: string
  state: number
}

// 本地图片路径
const mockImage = '../../assets/mock.jpg'

// Mock Banner 数据
const mockBanners: Banner[] = [
  { state: 1, picPath: mockImage, title: '《暗黑破坏神：不朽》震撼来袭' },
  { state: 1, picPath: mockImage, title: '《原神》4.0版本「仿若无因飘落的轻雨」' },
  { state: 1, picPath: mockImage, title: '《崩坏：星穹铁道》全新角色上线' },
  { state: 1, picPath: mockImage, title: '《绝区零》全球预约开启' },
  { state: 0, picPath: mockImage, title: '隐藏 Banner' }
]

// Mock 游戏数据 - 最新发布
const mockGames: Game[] = [
  { id: 1, path: mockImage, title: 'game1', name: '艾尔登法环', type: '动作角色扮演', price: 298, createtime: formatDate(new Date('2024-01-15')), state: 1 },
  { id: 2, path: mockImage, title: 'game2', name: '赛博朋克2077', type: '开放世界', price: 199, createtime: formatDate(new Date('2024-01-20')), state: 1 },
  { id: 3, path: mockImage, title: 'game3', name: '战神：诸神黄昏', type: '动作冒险', price: 399, createtime: formatDate(new Date('2024-01-25')), state: 1 },
  { id: 4, path: mockImage, title: 'game4', name: '荒野大镖客2', type: '西部冒险', price: 249, createtime: formatDate(new Date('2024-02-01')), state: 1 },
  { id: 5, path: mockImage, title: 'game5', name: '最后生还者', type: '生存恐怖', price: 299, createtime: formatDate(new Date('2024-02-05')), state: 1 },
  { id: 6, path: mockImage, title: 'game6', name: '对马岛之魂', type: '武士动作', price: 279, createtime: formatDate(new Date('2024-02-10')), state: 1 },
  { id: 7, path: mockImage, title: 'game7', name: '地平线：西之绝境', type: '科幻冒险', price: 329, createtime: formatDate(new Date('2024-02-15')), state: 1 },
  { id: 8, path: mockImage, title: 'game8', name: '蜘蛛侠：迈尔斯', type: '动作', price: 199, createtime: formatDate(new Date('2024-02-20')), state: 1 },
  { id: 9, path: mockImage, title: 'game9', name: '瑞奇与叮当', type: '平台冒险', price: 249, createtime: formatDate(new Date('2024-02-25')), state: 1 },
  { id: 10, path: mockImage, title: 'game10', name: '死亡搁浅', type: '动作', price: 199, createtime: formatDate(new Date('2024-03-01')), state: 1 }
]

// Mock 游戏数据 - 每日推荐
const mockRandomGames: Game[] = [
  { id: 11, path: mockImage, title: 'random1', name: '星穹铁道', type: '回合制RPG', price: 0, createtime: formatDate(new Date('2024-03-05')), state: 1 },
  { id: 12, path: mockImage, title: 'random2', name: '绝区零', type: '动作RPG', price: 0, createtime: formatDate(new Date('2024-03-10')), state: 1 },
  { id: 13, path: mockImage, title: 'random3', name: '鸣潮', type: '开放世界', price: 0, createtime: formatDate(new Date('2024-03-15')), state: 1 },
  { id: 14, path: mockImage, title: 'random4', name: '无限暖暖', type: '换装冒险', price: 0, createtime: formatDate(new Date('2024-03-20')), state: 1 },
  { id: 15, path: mockImage, title: 'random5', name: '明日方舟', type: '策略塔防', price: 0, createtime: formatDate(new Date('2024-03-25')), state: 1 },
  { id: 16, path: mockImage, title: 'random6', name: '幻塔', type: '开放世界', price: 0, createtime: formatDate(new Date('2024-03-30')), state: 1 }
]

const banners = ref<string[]>([])
const bannerTitle = ref<string[]>([])
const games = ref<Game[]>([])
const gamesRandom = ref<Game[]>([])

onMounted(async () => {
  // 处理 Banner 数据
  banners.value = mockBanners
    .filter((item: Banner) => item.state == 1)
    .map((item: Banner) => item.picPath)
  
  bannerTitle.value = mockBanners
    .filter((item: Banner) => item.state == 1)
    .map((item: Banner) => item.title)
  
  // 处理最新游戏数据
  games.value = mockGames
    .filter((game: Game) => game.state == 1)
  
  // 处理随机推荐数据
  gamesRandom.value = mockRandomGames
    .filter((game: Game) => game.state == 1)
  
  console.log('Mock 数据加载完成:', {
    banners: banners.value.length,
    games: games.value.length,
    random: gamesRandom.value.length
  })
})

// 查看详情（暂不做跳转）
const handleViewDetail = (game: Game) => {
  console.log('查看详情:', game.name, game.id)
}

// 查看更多（暂不做跳转）
const handleViewMore = (section: string) => {
  console.log('查看更多:', section)
}
</script>

<template>
  <div class="bg-gradient-to-br from-#3D3D41 to-#2D2D31 c-white min-h-screen">
    <div class="max-w-1200px mx-auto px-6 py-8">
      
      <!-- 轮播图区域 -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              新游预约
            </h2>
            <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
          </div>
          <span 
            class="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors"
            @click="handleViewMore('新游预约')"
          >
            查看更多 →
          </span>
        </div>
        
        <div class="banner rounded-2xl overflow-hidden shadow-2xl">
          <a-carousel
            :autoPlay="true"
            animation-name="card"
            show-arrow="never"
            indicator-position="outer"
            class="w-100% h-96"
            indicator-type="slider"
          >
            <a-carousel-item
              v-for="(picture, index) in banners"
              :key="index"
              :style="{ width: '60%' }"
            >
              <div class="relative h-full group cursor-pointer overflow-hidden rounded-xl">
                <a-image 
                  width="100%" 
                  height="100%"
                  :src="picture" 
                  :title="bannerTitle[index]" 
                  :preview="false"
                  fit="cover"
                  class="transform transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="absolute bottom-0 left-0 right-0 p-6">
                    <h3 class="text-2xl font-bold text-white">{{ bannerTitle[index] }}</h3>
                  </div>
                </div>
              </div>
            </a-carousel-item>
          </a-carousel>
        </div>
      </section>

      <!-- 最新游戏表 -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              新游发布
            </h2>
            <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
          </div>
          <span 
            class="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors"
            @click="handleViewMore('新游发布')"
          >
            查看全部 →
          </span>
        </div>
        
        <div class="latest-games">
          <a-row :gutter="[24, 24]">
            <a-col
              :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
              v-for="(game, index) in games.slice(0, 8)"
              :key="index"
            >
              <div class="game-card group">
                <div class="date-badge mb-3">
                  <div class="inline-flex items-center px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full">
                    <span class="text-blue-400 text-sm font-semibold">{{ game.createtime }}</span>
                  </div>
                </div>
                
                <div class="bg-#4C4C50/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div class="relative overflow-hidden aspect-square">
                    <a-image
                      width="100%"
                      height="100%"
                      :src="game.path"
                      :title="game.title"
                      class="transform transition-transform duration-500 group-hover:scale-110"
                      :preview="false"
                      fit="cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div class="p-4">
                    <h3 class="text-lg font-bold text-white mb-2 line-clamp-1">{{ game.name }}</h3>
                    <div class="text-gray-400 text-sm mb-2 line-clamp-1">{{ game.type }}</div>
                    
                    <div class="flex items-center justify-between">
                      <div v-if="game.price == 0" class="text-green-400 font-semibold">
                        <span class="text-sm">免费开玩</span>
                      </div>
                      <div v-else class="text-white font-bold">
                        <span class="text-lg">¥</span>
                        <span class="text-xl">{{ game.price }}</span>
                      </div>
                      
                      <button 
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold transition-colors duration-300"
                        @click="handleViewDetail(game)"
                      >
                        详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </section>

      <!-- 每日推荐 -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              今日推荐
            </h2>
            <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
            <p class="text-gray-400 text-sm mt-2">你可能会喜欢这些游戏~</p>
          </div>
          <span 
            class="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors"
            @click="handleViewMore('今日推荐')"
          >
            更多推荐 →
          </span>
        </div>
        
        <div class="daily-recommendations">
          <a-row :gutter="[24, 24]">
            <a-col
              :xs="24" :md="12" :lg="8"
              v-for="(game, index) in gamesRandom.slice(0, 6)"
              :key="index"
            >
              <div class="bg-#4C4C50/30 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex group">
                <div class="w-32 h-32 flex-shrink-0 overflow-hidden">
                  <a-image
                    width="100%"
                    height="100%"
                    :src="game.path"
                    :title="game.title"
                    class="transform transition-transform duration-500 group-hover:scale-110 object-cover"
                    :preview="false"
                    fit="cover"
                  />
                </div>
                
                <div class="flex-1 p-4">
                  <h3 class="text-lg font-bold text-white mb-1 line-clamp-1">{{ game.name }}</h3>
                  <div class="text-gray-400 text-sm mb-2">{{ game.type || '休闲游戏' }}</div>
                  
                  <div class="flex items-center justify-between">
                    <div v-if="game.price == 0" class="text-green-400 font-semibold">
                      <span class="text-sm">免费开玩</span>
                    </div>
                    <div v-else class="text-white font-bold">
                      <span class="text-lg">¥</span>
                      <span class="text-xl">{{ game.price }}</span>
                    </div>
                    
                    <button 
                      class="px-3 py-1.5 bg-blue-500/80 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-all duration-300"
                      @click="handleViewDetail(game)"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #2D2D31;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #4C4C50;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6C6C70;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .max-w-1200px {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* 卡片动画效果 */
.game-card, .daily-recommendations > div {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>