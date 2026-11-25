import axios from 'axios'

/**
 * HolyLifeView와 같이 공용 Axios 인스턴스를 둡니다.
 * 토스·AI 키는 서버에서만 보관하며 브라우저 코드나 번들에 포함하지 않습니다.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})
export interface ApiResponse<T> { success: boolean; data: T | null; error: { code: string; message: string } | null }
export interface SystemHealth { application: string; status: 'UP' | 'DOWN'; executionMode: 'PAPER' | 'LIVE'; brokerConnected: boolean; aiEnabled: boolean; checkedAt: string }
export interface DashboardSummary { executionMode: string; brokerStatus: string; marketDataStatus: string; aiStatus: string; portfolioStatus: string }

/** API 경로와 타입을 컴포넌트에서 분리하여 응답 형식 변경을 한 곳에서 관리합니다. */
export const systemApi = { getHealth: () => api.get<ApiResponse<SystemHealth>>('/system/health') }
export const dashboardApi = { getSummary: () => api.get<ApiResponse<DashboardSummary>>('/dashboard/summary') }