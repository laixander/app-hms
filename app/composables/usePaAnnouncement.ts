let timeoutId: ReturnType<typeof setTimeout> | null = null

export function usePaAnnouncement() {
  const isVisible = useState('pa-announcement-visible', () => false)

  const announce = (duration = 5000) => {
    isVisible.value = true
    
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  const dismiss = () => {
    isVisible.value = false
    if (timeoutId) clearTimeout(timeoutId)
  }

  return {
    isVisible,
    announce,
    dismiss
  }
}
