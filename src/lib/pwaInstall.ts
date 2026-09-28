import { useSyncExternalStore } from 'react'

// The browser fires `beforeinstallprompt` once, early, and only on browsers
// that support installing a PWA programmatically (Chrome/Edge/Samsung Internet
// on Android and desktop). We capture it at startup so the Profile screen can
// trigger the install later. Safari (iOS/macOS) never fires it: installing
// there is manual (Share > Add to Home Screen).

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: BeforeInstallPromptEvent | null = null
let installed = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    emit()
  })
  window.addEventListener('appinstalled', () => {
    installed = true
    deferred = null
    emit()
  })
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function isSecureContextForPwa(): boolean {
  return typeof window !== 'undefined' && window.isSecureContext
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferred) return 'unavailable'
  await deferred.prompt()
  const { outcome } = await deferred.userChoice
  deferred = null
  emit()
  return outcome
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}
const getSnapshot = () => `${deferred ? 'p' : '-'}${installed ? 'i' : '-'}`

export function usePwaInstall() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => '--')
  return { canPrompt: snap[0] === 'p', justInstalled: snap[1] === 'i' }
}
