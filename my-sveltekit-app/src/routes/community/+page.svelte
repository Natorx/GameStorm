<script lang="ts">
  import mockImage from '$lib/assets/mock.jpg';
  import { onMount } from 'svelte';

  // 类型定义
  interface Post {
    id: number;
    author: {
      id: number;
      name: string;
      avatar: string;
      level: number;
      badge: string;
    };
    title: string;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    createTime: string;
    tags: string[];
  }

  interface User {
    id: number;
    name: string;
    avatar: string;
    level: number;
    exp: number;
    nextLevelExp: number;
    followers: number;
    following: number;
    posts: number;
    badges: string[];
  }

  // Mock 用户数据
  const currentUser: User = {
    id: 1,
    name: '游戏玩家',
    avatar: mockImage,
    level: 15,
    exp: 2340,
    nextLevelExp: 3000,
    followers: 234,
    following: 156,
    posts: 45,
    badges: ['活跃分子', '攻略达人', '热心玩家']
  };

  // Mock 帖子数据
  const mockPosts: Post[] = [
    {
      id: 1,
      author: {
        id: 2,
        name: '星穹铁道攻略组',
        avatar: mockImage,
        level: 28,
        badge: '攻略大神'
      },
      title: '【攻略】星穹铁道1.6版本全角色配队指南',
      content: '本期为大家带来最新的角色配队思路，包括真理医生、阮梅等新角色的最佳搭配...',
      images: [mockImage, mockImage, mockImage],
      likes: 342,
      comments: 89,
      shares: 56,
      isLiked: false,
      createTime: '2小时前',
      tags: ['攻略', '星穹铁道', '配队']
    },
    {
      id: 2,
      author: {
        id: 3,
        name: '绝区零情报站',
        avatar: mockImage,
        level: 22,
        badge: '情报专家'
      },
      title: '绝区零二测体验报告：战斗系统深度解析',
      content: '参加了二测，给大家分享一下战斗系统的核心玩法，包括闪避机制、连招系统等...',
      images: [mockImage, mockImage],
      likes: 567,
      comments: 123,
      shares: 89,
      isLiked: true,
      createTime: '5小时前',
      tags: ['测评', '绝区零', '战斗系统']
    },
    {
      id: 3,
      author: {
        id: 4,
        name: '鸣潮创作者',
        avatar: mockImage,
        level: 19,
        badge: '创作达人'
      },
      title: '鸣潮隐藏任务汇总，你错过了哪些？',
      content: '整理了目前版本所有隐藏任务的触发方式和完成攻略，附赠成就获取方法...',
      images: [mockImage],
      likes: 234,
      comments: 56,
      shares: 34,
      isLiked: false,
      createTime: '昨天',
      tags: ['攻略', '鸣潮', '隐藏任务']
    },
    {
      id: 4,
      author: {
        id: 5,
        name: '原神玩家社区',
        avatar: mockImage,
        level: 35,
        badge: '元老玩家'
      },
      title: '4.4版本原石统计，海灯节福利大放送',
      content: '详细统计了4.4版本所有可获取原石数量，零氪党也能轻松攒出保底...',
      images: [mockImage, mockImage, mockImage, mockImage],
      likes: 891,
      comments: 234,
      shares: 167,
      isLiked: false,
      createTime: '昨天',
      tags: ['原神', '原石统计', '海灯节']
    }
  ];

  // 热门话题
  const hotTopics = [
    { id: 1, name: '星穹铁道', posts: 2345, icon: '🚀' },
    { id: 2, name: '绝区零', posts: 1876, icon: '⚡' },
    { id: 3, name: '鸣潮', posts: 1456, icon: '🌊' },
    { id: 4, name: '原神', posts: 3421, icon: '⭐' },
    { id: 5, name: '游戏推荐', posts: 5678, icon: '🎮' }
  ];

  // 推荐用户
  const recommendedUsers = [
    { id: 6, name: '游戏评测师', avatar: mockImage, followers: 1234, isFollowed: false },
    { id: 7, name: '二次元游戏圈', avatar: mockImage, followers: 2345, isFollowed: true },
    { id: 8, name: '单机游戏狂热', avatar: mockImage, followers: 987, isFollowed: false }
  ];

  // 响应式状态
  let posts = $state<Post[]>(mockPosts);
  let activeTab = $state('recommend');
  let showCreateModal = $state(false);
  let newPostContent = $state('');
  let selectedTags = $state<string[]>([]);
  let searchKeyword = $state('');

  // 处理函数
  function handleLike(postId: number) {
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    }
  }

  function handleFollow(userId: number) {
    const user = recommendedUsers.find(u => u.id === userId);
    if (user) {
      user.isFollowed = !user.isFollowed;
    }
  }

  function handleCreatePost() {
    if (!newPostContent.trim()) return;
    // 创建新帖子的逻辑
    console.log('创建帖子:', newPostContent);
    showCreateModal = false;
    newPostContent = '';
  }

  function formatNumber(num: number): string {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    return num.toString();
  }
</script>

<div class="min-h-screen relative">
  <!-- 背景层 -->
  <div class="fixed inset-0 -z-10">
    <img src={mockImage} alt="background" class="h-full w-full object-cover blur-[10px]" />
    <div class="absolute inset-0 bg-black/70"></div>
  </div>

  <!-- 主内容 -->
  <div class="mx-auto max-w-[1400px] p-5">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="bg-linear-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent">
        玩家社区
      </h1>
      <div class="mt-2 h-1 w-24 rounded-full bg-linear-to-r from-orange-500 to-orange-300"></div>
      <p class="mt-3 text-gray-400">分享游戏心得，结交游戏好友</p>
    </div>

    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- 左侧：帖子列表 -->
      <div class="min-w-0 flex-1">
        <!-- 发帖按钮和标签页 -->
        <div class="mb-6 rounded-xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                class:bg-orange-100={activeTab === 'recommend'}
                class:text-orange-500={activeTab === 'recommend'}
                class:bg-white-100={activeTab !== 'recommend'}
                class:text-white-100={activeTab !== 'recommend'}
                onclick={() => activeTab = 'recommend'}
              >
                推荐
              </button>
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                class:bg-orange-500={activeTab === 'latest'}
                class:text-orange-500={activeTab === 'latest'}
                class:bg-white-100={activeTab !== 'latest'}
                class:text-white-100={activeTab !== 'latest'}
                onclick={() => activeTab = 'latest'}
              >
                最新
              </button>
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300"
                class:bg-orange-500={activeTab === 'following'}
                class:text-orange-500={activeTab === 'following'}
                class:bg-white-100={activeTab !== 'following'}
                class:text-white-100={activeTab !== 'following'}
                onclick={() => activeTab = 'following'}
              >
                关注
              </button>
            </div>
            
            <div class="relative flex-1 max-w-md">
              <input
                type="text"
                bind:value={searchKeyword}
                placeholder="搜索帖子..."
                class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 pr-10 text-sm text-white placeholder:text-white/50 focus:border-orange-400 focus:outline-none"
              />
              <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <button
              type="button"
              class="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
              onclick={() => showCreateModal = true}
            >
              发布帖子
            </button>
          </div>
        </div>

        <!-- 帖子列表 -->
        <div class="flex flex-col gap-5">
          {#each posts as post (post.id)}
            <div class="rounded-xl border border-white/10 bg-black/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-orange-400/40">
              <!-- 作者信息 -->
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} class="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-semibold text-white">{post.author.name}</span>
                      <span class="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">{post.author.badge}</span>
                      <span class="text-xs text-white/50">Lv.{post.author.level}</span>
                    </div>
                    <span class="text-xs text-white/40">{post.createTime}</span>
                  </div>
                </div>
                <button class="text-white/40 transition-colors hover:text-orange-400">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>

              <!-- 帖子内容 -->
              <div class="mb-4">
                <h3 class="mb-2 text-xl font-bold text-white">{post.title}</h3>
                <p class="text-white/70">{post.content}</p>
              </div>

              <!-- 图片 -->
              {#if post.images.length > 0}
                <div class="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {#each post.images.slice(0, 4) as image, index}
                    <div class="relative aspect-video overflow-hidden rounded-lg">
                      <img src={image} alt={`图片${index + 1}`} class="h-full w-full object-cover" />
                    </div>
                  {/each}
                </div>
              {/if}

              <!-- 标签 -->
              <div class="mb-4 flex flex-wrap gap-2">
                {#each post.tags as tag}
                  <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">{tag}</span>
                {/each}
              </div>

              <!-- 互动按钮 -->
              <div class="flex items-center gap-6 border-t border-white/10 pt-4">
                <button
                  type="button"
                  class="flex items-center gap-2 transition-colors"
                  class:text-orange-500={post.isLiked}
                  class:text-white-100={!post.isLiked}
                  onclick={() => handleLike(post.id)}
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>{formatNumber(post.likes)}</span>
                </button>
                <button type="button" class="flex items-center gap-2 text-white/60 transition-colors hover:text-orange-400">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{formatNumber(post.comments)}</span>
                </button>
                <button type="button" class="flex items-center gap-2 text-white/60 transition-colors hover:text-orange-400">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>{formatNumber(post.shares)}</span>
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 右侧：侧边栏 -->
      <div class="flex w-full shrink-0 flex-col gap-5 lg:w-80">
        <!-- 用户信息卡片 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <div class="mb-4 flex items-center gap-3">
            <img src={currentUser.avatar} alt={currentUser.name} class="h-14 w-14 rounded-full object-cover" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">{currentUser.name}</h3>
              <div class="flex items-center gap-2">
                <span class="text-xs text-white/50">Lv.{currentUser.level}</span>
                <div class="h-1 flex-1 rounded-full bg-white/10">
                  <div class="h-full rounded-full bg-orange-500" style="width: {currentUser.exp / currentUser.nextLevelExp * 100}%"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mb-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div class="text-lg font-bold text-white">{currentUser.followers}</div>
              <div class="text-xs text-white/50">粉丝</div>
            </div>
            <div>
              <div class="text-lg font-bold text-white">{currentUser.following}</div>
              <div class="text-xs text-white/50">关注</div>
            </div>
            <div>
              <div class="text-lg font-bold text-white">{currentUser.posts}</div>
              <div class="text-xs text-white/50">帖子</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            {#each currentUser.badges as badge}
              <span class="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-400">{badge}</span>
            {/each}
          </div>
        </div>

        <!-- 热门话题 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <h3 class="mb-4 text-lg font-semibold text-white">热门话题</h3>
          <div class="flex flex-col gap-3">
            {#each hotTopics as topic}
              <button
                type="button"
                class="flex items-center justify-between rounded-lg p-2 transition-all duration-300 hover:bg-white/5"
              >
                <div class="flex items-center gap-2">
                  <span class="text-xl">{topic.icon}</span>
                  <span class="text-white/80">{topic.name}</span>
                </div>
                <span class="text-xs text-white/40">{topic.posts} 帖子</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- 推荐用户 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <h3 class="mb-4 text-lg font-semibold text-white">推荐关注</h3>
          <div class="flex flex-col gap-4">
            {#each recommendedUsers as user}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} class="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div class="text-sm font-semibold text-white">{user.name}</div>
                    <div class="text-xs text-white/40">{user.followers} 粉丝</div>
                  </div>
                </div>
                <button
                  type="button"
                  class="rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-300"
                  class:bg-orange-500={!user.isFollowed}
                  class:bg-white-100={user.isFollowed}
                  class:text-white={!user.isFollowed}
                  class:text-white-100={user.isFollowed}
                  onclick={() => handleFollow(user.id)}
                >
                  {user.isFollowed ? '已关注' : '关注'}
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- 友情链接 -->
        <div class="rounded-xl border border-white/10 bg-black/80 p-5 backdrop-blur-md">
          <h3 class="mb-3 text-sm font-semibold text-white/70">友情链接</h3>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs text-white/40">游民星空</span>
            <span class="text-xs text-white/40">3DM游戏网</span>
            <span class="text-xs text-white/40">NGA玩家社区</span>
            <span class="text-xs text-white/40">TapTap</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 发帖模态框（完全修复无障碍问题版） -->
{#if showCreateModal}
  <!-- 1. 修复：外层背景遮罩的键盘事件 -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    onclick={() => showCreateModal = false}
    onkeydown={(e) => e.key === 'Enter' && (showCreateModal = false)}
    role="button"
    tabindex="0"
    aria-label="关闭对话框"
  >
    <!-- 2. 修复：为 dialog 容器添加 tabindex -->
  <div
    class="w-full max-w-2xl rounded-xl border border-white/10 bg-black/90 p-6 backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
  >
      <div class="mb-4 flex items-center justify-between">
        <h2 id="modal-title" class="text-2xl font-bold text-white">发布新帖子</h2>
        <button
          type="button"
          class="text-white/50 transition-colors hover:text-white"
          onclick={() => showCreateModal = false}
          aria-label="关闭"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 其余表单内容保持不变 -->
      <div class="mb-4">
        <input
          type="text"
          placeholder="帖子标题"
          class="mb-3 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-orange-400 focus:outline-none"
        />
        <textarea
          bind:value={newPostContent}
          rows={6}
          placeholder="分享你的游戏心得..."
          class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-orange-400 focus:outline-none"
        ></textarea>
      </div>

      <div class="mb-4">
        <div class="mb-2 text-sm text-white/70">添加标签</div>
        <div class="flex flex-wrap gap-2">
          {#each ['攻略', '测评', '讨论', '求助', '安利'] as tag}
            <button
              type="button"
              class="rounded-full px-3 py-1 text-xs transition-all duration-300 bg-orange-500 text-white {!selectedTags.includes(tag) && 'bg-white/10 text-white/60'}"
              onclick={() => {
                if (selectedTags.includes(tag)) {
                  selectedTags = selectedTags.filter(t => t !== tag);
                } else {
                  selectedTags = [...selectedTags, tag];
                }
              }}
            >
              {tag}
            </button>
          {/each}
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="rounded-lg border border-white/20 px-4 py-2 text-white/70 transition-all duration-300 hover:bg-white/5"
          onclick={() => showCreateModal = false}
        >
          取消
        </button>
        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-white transition-all duration-300 hover:bg-orange-600"
          onclick={handleCreatePost}
        >
          发布
        </button>
      </div>
    </div>
  </div>
{/if}