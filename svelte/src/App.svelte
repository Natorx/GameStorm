<script>
  import { Route, router } from 'tinro5';
  import Header from './layout/Header.svelte';
  import Home from './routes/Home.svelte';
  import Games from './routes/Games.svelte';
  import Dynamic from './routes/Dynamic.svelte';

  // 可选：启用 hash 模式（如果不需要后端配置）
  // router.mode.hash();
  
  // 可选：路由切换时滚动到顶部
  router.subscribe(() => window.scrollTo(0, 0));
</script>

<Header />

<main>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/games">
    <Games />
  </Route>
  <Route path="/dynamic">
    <Dynamic />
  </Route>
</main>