<template>
  <div class="view-stack">
    <section class="welcome panel">
      <div><p class="eyebrow">AIM OVERVIEW</p><h2>투자 운영 상태를 확인하세요</h2><p class="muted">토스 계좌와 AI 연결 전 단계입니다. 실제 잔고와 수익률은 표시하지 않습니다.</p></div>
      <button :disabled="loading" @click="refresh">{{ loading ? '확인 중...' : '상태 새로고침' }}</button>
    </section>
    <div class="metric-grid">
      <section class="panel metric"><small>실행 모드</small><strong>PAPER</strong><span>가상매매 전용</span></section>
      <section class="panel metric"><small>토스증권</small><strong>{{ summary?.brokerStatus ?? '확인 중' }}</strong><span>본인 계좌 연결 전</span></section>
      <section class="panel metric"><small>시세 데이터</small><strong>{{ summary?.marketDataStatus ?? '확인 중' }}</strong><span>국내·미국 주식 및 ETF</span></section>
      <section class="panel metric"><small>AI 분석</small><strong>{{ summary?.aiStatus ?? '확인 중' }}</strong><span>월간 한도 설정 필요</span></section>
    </div>
    <section class="panel">
      <div class="panel-heading"><div><h2>백엔드 연결</h2><p class="muted">프로세스 상태와 외부 연동을 구분해 표시합니다.</p></div><span>{{ health?.status ?? 'UNKNOWN' }}</span></div>
      <p v-if="error" class="error">{{ error }}</p>
      <dl v-else class="status-list">
        <div><dt>애플리케이션</dt><dd>{{ health?.application ?? '응답 대기' }}</dd></div>
        <div><dt>최근 확인</dt><dd>{{ checkedAt }}</dd></div>
        <div><dt>토스 연동</dt><dd>{{ health?.brokerConnected ? '연결됨' : '연결 전' }}</dd></div>
        <div><dt>AI 호출</dt><dd>{{ health?.aiEnabled ? '활성' : '비활성' }}</dd></div>
      </dl>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { dashboardApi, systemApi, type DashboardSummary, type SystemHealth } from '@/api'

/**
 * 서버가 실제 계좌 데이터로 응답하기 전에는 가상 잔고/손익을 표시하지 않습니다.
 * 연결 실패도 샘플 값으로 대체하지 않고 오류로 알려 오래된 수치로 오인하지 않게 합니다.
 */
const health = ref<SystemHealth | null>(null)
const summary = ref<DashboardSummary | null>(null)
const loading = ref(false)
const error = ref('')
const checkedAt = computed(() => health.value?.checkedAt ? new Date(health.value.checkedAt).toLocaleString('ko-KR') : '아직 확인되지 않았습니다.')

async function refresh() {
  loading.value = true
  error.value = ''
  try {
    const [h, s] = await Promise.all([systemApi.getHealth(), dashboardApi.getSummary()])
    health.value = h.data.data
    summary.value = s.data.data
  } catch {
    error.value = '백엔드 연결 실패. stock-be 실행 상태를 확인하세요.'
  } finally {
    loading.value = false
  }
}
onMounted(refresh)
</script>