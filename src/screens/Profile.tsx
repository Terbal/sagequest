import { useState } from 'react'
import { useAppStore } from '../lib/store'
import { RANK_ORDER, RANK_XP_THRESHOLDS } from '../core/types'
import { xpToNextRank } from '../core/engines/xp'
import { usePwaInstall, promptInstall, isStandalone, isIOS, isSecureContextForPwa } from '../lib/pwaInstall'

export default function Profile() {
  const profile = useAppStore((s) => s.profile)
  const setTheme = useAppStore((s) => s.setTheme)
  const setSpeechRate = useAppStore((s) => s.setSpeechRate)
  const resetAll = useAppStore((s) => s.resetAll)
  const [confirmReset, setConfirmReset] = useState(false)
  const { canPrompt, justInstalled } = usePwaInstall()
  const [installMsg, setInstallMsg] = useState<string | null>(null)

  if (!profile) return null

  const { next, remaining, progress } = xpToNextRank(profile.xp)

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--sq-text-muted)' }}>
        Training since {new Date(profile.createdAt).toLocaleDateString()}
      </p>

      <div className="sq-panel p-6 mb-6">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-2xl font-bold sq-mono">{profile.rank}</span>
          <span className="text-sm sq-mono" style={{ color: 'var(--sq-accent)' }}>{profile.xp} XP</span>
        </div>
        {next && (
          <>
            <div className="h-1.5 rounded-full my-3" style={{ background: 'var(--sq-border)' }}>
              <div className="h-1.5 rounded-full" style={{ width: `${progress * 100}%`, background: 'var(--sq-accent)' }} />
            </div>
            <div className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>
              {remaining} XP to {next}
            </div>
          </>
        )}
      </div>

      <div className="sq-panel p-6 mb-6">
        <div className="text-xs font-semibold mb-4" style={{ color: 'var(--sq-text-faint)' }}>RANK PATH</div>
        <div className="flex flex-wrap gap-2">
          {RANK_ORDER.map((r) => (
            <span
              key={r}
              className="text-xs px-2.5 py-1 rounded-[var(--sq-radius-sm)] sq-mono"
              style={{
                background: RANK_XP_THRESHOLDS[r] <= profile.xp ? 'var(--sq-accent)' : 'var(--sq-bg-inset)',
                color: RANK_XP_THRESHOLDS[r] <= profile.xp ? 'var(--sq-accent-text)' : 'var(--sq-text-faint)',
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="sq-panel p-6 mb-6 flex justify-between items-center">
        <div>
          <div className="text-sm font-medium">Streak</div>
          <div className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>Consecutive active days</div>
        </div>
        <div className="text-2xl font-bold sq-mono" style={{ color: 'var(--sq-accent)' }}>{profile.streak}</div>
      </div>

      <div className="sq-panel p-6 mb-6">
        <div className="text-xs font-semibold mb-4" style={{ color: 'var(--sq-text-faint)' }}>APPEARANCE</div>
        <div className="flex gap-2">
          {(['system', 'dark', 'light'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className="flex-1 py-2 text-sm font-medium rounded-[var(--sq-radius-sm)] capitalize"
              style={{
                background: profile.theme === t ? 'var(--sq-accent)' : 'var(--sq-bg-inset)',
                color: profile.theme === t ? 'var(--sq-accent-text)' : 'var(--sq-text-muted)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="sq-panel p-6 mb-6">
        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--sq-text-faint)' }}>PRONUNCIATION AUDIO</div>
        <p className="text-xs mb-4" style={{ color: 'var(--sq-text-faint)' }}>
          Playback speed for word and sentence audio, throughout the app.
        </p>
        <div className="flex gap-2">
          {[
            { label: 'Normal', value: 1 },
            { label: 'Slow', value: 0.75 },
            { label: 'Very slow', value: 0.5 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSpeechRate(opt.value)}
              className="flex-1 py-2 text-sm font-medium rounded-[var(--sq-radius-sm)]"
              style={{
                background: (profile.speechRate ?? 1) === opt.value ? 'var(--sq-accent)' : 'var(--sq-bg-inset)',
                color: (profile.speechRate ?? 1) === opt.value ? 'var(--sq-accent-text)' : 'var(--sq-text-muted)',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sq-panel p-6 mb-6">
        <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>INSTALL THE APP</div>
        {isStandalone() || justInstalled ? (
          <p className="text-sm" style={{ color: 'var(--sq-success)' }}>✓ SAGEQUEST is installed on this device.</p>
        ) : canPrompt ? (
          <div>
            <p className="text-xs mb-3" style={{ color: 'var(--sq-text-muted)' }}>
              Install SAGEQUEST to open it like a normal app, full screen, and use it offline.
            </p>
            <button
              onClick={async () => {
                const r = await promptInstall()
                if (r === 'dismissed') setInstallMsg('Install cancelled. You can try again any time.')
              }}
              className="px-5 py-2.5 text-sm font-semibold rounded-[var(--sq-radius-sm)]"
              style={{ background: 'var(--sq-accent)', color: 'var(--sq-accent-text)' }}
            >
              INSTALL SAGEQUEST
            </button>
            {installMsg && <p className="text-xs mt-3" style={{ color: 'var(--sq-text-faint)' }}>{installMsg}</p>}
          </div>
        ) : isIOS() ? (
          <p className="text-xs leading-relaxed" style={{ color: 'var(--sq-text-muted)' }}>
            On iPhone/iPad, installing is manual and only works from <strong>Safari</strong>: tap the Share button,
            then <strong>Add to Home Screen</strong>.
          </p>
        ) : (
          <div className="text-xs leading-relaxed space-y-2" style={{ color: 'var(--sq-text-muted)' }}>
            <p>The browser is not offering installation right now. Common reasons:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                {isSecureContextForPwa()
                  ? 'Secure connection: OK.'
                  : 'This page is not served over HTTPS. Installation only works on https:// or on localhost — not on http://192.168.x.x.'}
              </li>
              <li>You are running <code>npm run dev</code>. The service worker only exists in a production build: use <code>npm run build</code> then <code>npm run preview</code>, or the deployed site.</li>
              <li>Browser: use Chrome, Edge or Samsung Internet. Firefox desktop cannot install web apps.</li>
              <li>On Chrome Android, also try the ⋮ menu → <strong>Install app</strong> (or <strong>Add to Home screen</strong>).</li>
              <li>The app may already be installed — look for it in your app list.</li>
            </ul>
          </div>
        )}
      </div>

      <div className="sq-panel p-6">
        <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-text-faint)' }}>DATA</div>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} className="text-sm" style={{ color: 'var(--sq-error)' }}>
            Reset all progress
          </button>
        ) : (
          <div>
            <p className="text-xs mb-3" style={{ color: 'var(--sq-text-muted)' }}>
              This permanently deletes your local progress. This can't be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => resetAll()}
                className="px-4 py-2 text-sm font-semibold rounded-[var(--sq-radius-sm)]"
                style={{ background: 'var(--sq-error)', color: '#fff' }}
              >
                Confirm reset
              </button>
              <button onClick={() => setConfirmReset(false)} className="px-4 py-2 text-sm" style={{ color: 'var(--sq-text-faint)' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
