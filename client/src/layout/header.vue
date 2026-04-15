<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)

const navItems = [
  { path: '/', name: '首页',  },
  { path: '/games', name: '分类导航',  },
  { path: '/dynamic', name: '游戏动态',  },
  { path: '/peripherals', name: '周边商城',  },
  { path: '', name: '敬请期待', disabled: true }
]

const isCurrentRoute = (path: string) => {
  if (!path) return false
  return route.path === path
}

const navigateTo = (path: string) => {
  if (path) {
    router.push(path)
    isMenuOpen.value = false
  }
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] border-b border-white/10">
    <div class="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center h-[70px] sm:px-[4%]">
      <!-- Logo区域 -->
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-102" @click="navigateTo('/home')">
          <img src="../../assets/logo.svg" alt="logo" class="w-[45px] sm:w-[35px] brightness-0 invert" />
          <span class="text-2xl sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent tracking-wide">GameStorm</span>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="flex-1 flex justify-center">
        <ul class="flex items-center gap-2 list-none m-0 p-0 max-[968px]:hidden">
          <li 
            v-for="item in navItems" 
            :key="item.path || item.name"
            class="relative"
          >
            <div 
              @click="!item.disabled && navigateTo(item.path)"
              class="flex items-center gap-1.5 px-4 py-2 text-[#cecece] text-[15px] font-medium cursor-pointer rounded-lg transition-all duration-300 hover:text-orange-500 hover:bg-white/5 hover:-translate-y-px"
              :class="[
                isCurrentRoute(item.path) ? 'text-orange-500 bg-orange-500/10' : '',
                item.disabled ? 'cursor-not-allowed opacity-60 hover:text-[#cecece] hover:bg-transparent hover:translate-y-0' : ''
              ]"
            >
              <span>{{ item.name }}</span>
              <span v-if="item.disabled" class="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1.5 text-white/60">即将上线</span>
            </div>
            <div v-if="isCurrentRoute(item.path) && !item.disabled" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30px] h-0.5 bg-orange-500 rounded"></div>
          </li>
        </ul>
      </nav>

      <!-- 右侧占位，保持布局平衡 -->
      <div class="w-[97px] max-[968px]:hidden"></div>
    </div>
    
    <!-- 移动端菜单 -->
    <div 
      class="fixed top-[70px] left-[-100%] w-full h-[calc(100vh-70px)] bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] transition-all duration-300 overflow-y-auto p-5 max-[968px]:block hidden"
      :class="{ 'left-0': isMenuOpen }"
    >
      <ul class="flex flex-col gap-3 list-none m-0 p-0">
        <li 
          v-for="item in navItems" 
          :key="item.path || item.name"
          class="w-full"
        >
          <div 
            @click="!item.disabled && navigateTo(item.path)"
            class="flex items-center justify-center gap-1.5 px-4 py-3 text-[#cecece] text-base font-medium cursor-pointer rounded-lg transition-all duration-300 hover:text-orange-500 hover:bg-white/5"
            :class="[
              isCurrentRoute(item.path) ? 'text-orange-500 bg-orange-500/10' : '',
              item.disabled ? 'cursor-not-allowed opacity-60 hover:text-[#cecece] hover:bg-transparent' : ''
            ]"
          >
            <span>{{ item.name }}</span>
            <span v-if="item.disabled" class="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1.5 text-white/60">即将上线</span>
          </div>
        </li>
      </ul>
    </div>
  </header>
  
  <!-- 占位元素 -->
  <div class="h-[70px]"></div>
</template>