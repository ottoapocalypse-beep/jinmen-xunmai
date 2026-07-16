/**
 * 滚动触发动画工具
 * 使用 Intersection Observer 监听元素进入视口，自动添加 .animate-visible 类
 */

export function initScrollAnimations(): void {
  // 不要在前端框架导航时重复注册
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible')
          // 动画只触发一次
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    },
  )

  // 观察所有 .animate-on-scroll 元素
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })

  // 当 DOM 变化时重新扫描（适用于路由切换后的新内容）
  const mutationObserver = new MutationObserver(() => {
    document.querySelectorAll('.animate-on-scroll:not(.animate-visible)').forEach((el) => {
      observer.observe(el)
    })
  })

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  })
}
