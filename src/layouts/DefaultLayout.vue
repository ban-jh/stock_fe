<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><b class="brand-mark">S</b><div><strong>Stock AIM</strong><small>개인 투자 관리</small></div></div>
      <nav aria-label="주 메뉴"><RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-link">{{ item.label }}</RouterLink></nav>
      <div class="sidebar-note"><span>PAPER</span><p>가상매매 준비 모드</p></div>
    </aside>
    <div class="main-column">
      <header class="topbar"><div><p class="eyebrow">PERSONAL INVESTMENT WORKSPACE</p><h1>{{ title }}</h1></div><span>PAPER 모드</span></header>
      <main class="page-content"><RouterView /></main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

/** 메뉴와 상단 제목을 모든 화면이 공유하는 HolyLifeView식 레이아웃입니다. */
const menuItems = [
  { label: '대시보드', path: '/dashboard' }, { label: '투자 전략', path: '/strategies' },
  { label: '투자 종목', path: '/instruments' }, { label: '실행 이력', path: '/executions' },
  { label: '시스템 관리', path: '/system' },
]
const route = useRoute()
const title = computed(() => String(route.meta.title ?? 'Stock AIM'))
</script>