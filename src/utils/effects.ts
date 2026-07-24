/**
 * 网站特效工具
 * - mouseGlow: 鼠标光晕跟随
 * - initTilt: 卡片3D倾斜
 */

/** 开启鼠标光晕跟随 */
export function initMouseGlow(container: HTMLElement) {
  const glow = document.createElement('div')
  glow.className = 'mouse-glow'
  Object.assign(glow.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '9999',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.04) 40%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.3s',
    opacity: '0',
    willChange: 'transform',
  })
  container.appendChild(glow)

  let timer: number | null = null

  function onMove(e: MouseEvent | Touch) {
    glow.style.opacity = '1'
    glow.style.left = `${e.clientX}px`
    glow.style.top = `${e.clientY}px`
    if (timer) cancelAnimationFrame(timer)
    timer = null
  }

  function onLeave() {
    glow.style.opacity = '0'
  }

  function onMouseMove(e: MouseEvent) {
    onMove(e)
  }

  function onTouchMove(e: TouchEvent) {
    if (e.touches.length === 1) onMove(e.touches[0])
  }

  function onTouchEnd() {
    timer = requestAnimationFrame(() => { glow.style.opacity = '0' })
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('touchmove', onTouchMove, { passive: true })
  document.addEventListener('touchend', onTouchEnd)

  return () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onLeave)
    document.removeEventListener('touchmove', onTouchMove as any)
    document.removeEventListener('touchend', onTouchEnd)
    glow.remove()
  }
}

/** 给所有匹配的选择器元素启用 3D 倾斜效果 */
export function initTilt(selector: string = '.floating-card, .media-card, .tilt-card'): (() => void) | void {
  const cards = document.querySelectorAll<HTMLElement>(selector)
  if (!cards.length) return

  cards.forEach(card => {
    card.style.transition = 'transform 0.15s ease-out'
    card.style.transformStyle = 'preserve-3d'
    card.style.willChange = 'transform'
    card.style.transform = 'perspective(600px) translateY(0px) rotateX(0deg) rotateY(0deg)'
  })

  function onMouseMove(this: HTMLElement, e: MouseEvent) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    // 最大倾斜 ±8 度，加轻微上浮
    const rotateY = ((x - cx) / cx) * 8
    const rotateX = ((cy - y) / cy) * 8
    const lift = -2 // 上浮 2px
    this.style.transform = `perspective(600px) translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function onMouseLeave(this: HTMLElement) {
    this.style.transform = 'perspective(600px) translateY(0px) rotateX(0deg) rotateY(0deg)'
  }

  cards.forEach(card => {
    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)
  })

  return () => {
    cards.forEach(card => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
      card.style.transform = ''
    })
  }
}
