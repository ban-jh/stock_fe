<template>
  <section class="panel">
    <p class="eyebrow">AIM MODULE</p><h2>{{ title }}</h2><p class="muted">{{ description }}</p>
    <div class="empty-state"><strong>기능 모듈 준비 중</strong><span>초기 운영은 PAPER 모드이며 실계좌 주문은 아직 연결되지 않았습니다.</span></div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/** 라우트 메타의 화면 설명을 재사용해 아직 구현되지 않은 메뉴도 빈 화면이 되지 않게 합니다. */
const route = useRoute()
const title = computed(() => String(route.meta.title ?? 'AIM 모듈'))
const description = computed(() => String(route.meta.description ?? ''))
</script>