import { createRouter, createWebHistory } from 'vue-router'

/**
 * HolyLifeView처럼 각 페이지를 독립된 View로 관리하고 공통 레이아웃을 부모로 둡니다.
 * 자식 라우트는 DefaultLayout 내부의 RouterView에 그려져 사이드바와 헤더를 공유합니다.
 */
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: '대시보드' } },
        { path: 'strategies', component: () => import('@/views/ModulePlaceholder.vue'), meta: { title: '투자 전략', description: '전략 조건과 버전 이력 관리' } },
        { path: 'instruments', component: () => import('@/views/ModulePlaceholder.vue'), meta: { title: '투자 종목', description: '국내·미국 주식 및 ETF 허용 목록 관리' } },
        { path: 'executions', component: () => import('@/views/ModulePlaceholder.vue'), meta: { title: '실행 이력', description: '예약·수동 PAPER 실행 이력 관리' } },
        { path: 'system', component: () => import('@/views/ModulePlaceholder.vue'), meta: { title: '시스템 관리', description: '예약 시각, AI 한도, 상태와 전체 중지' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})