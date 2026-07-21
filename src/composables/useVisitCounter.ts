/**
 * 访问计数器 composable
 * 客户端统计，管理者可见，普通用户不可见
 */
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'jinmen_visits'
const HIDDEN_COUNT_KEY = 'jinmen_hidden_clicks'

/** 全局访问次数（累加，不同设备独立） */
const visitCount = ref(0)

/** 是否已解锁管理者视图 */
const adminVisible = ref(false)

export function useVisitCounter() {
  onMounted(() => {
    // 读取或初始化计数值
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      visitCount.value = parseInt(stored, 10) + 1
    } else {
      visitCount.value = 1
    }
    localStorage.setItem(STORAGE_KEY, String(visitCount.value))
  })

  /** 秘密解锁：点击 5 次 */
  function secretTap() {
    const cached = localStorage.getItem(HIDDEN_COUNT_KEY)
    let count = cached ? parseInt(cached, 10) : 0
    count++
    localStorage.setItem(HIDDEN_COUNT_KEY, String(count))
    if (count >= 5) {
      adminVisible.value = !adminVisible.value
      localStorage.setItem(HIDDEN_COUNT_KEY, '0')
    }
  }

  return { visitCount, adminVisible, secretTap }
}
