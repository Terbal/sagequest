import { NavLink, Outlet } from 'react-router-dom'
import { useAppStore } from '../lib/store'
import { rankForXP } from '../core/engines/xp'

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/journey', label: 'Journey', icon: JourneyIcon },
  { to: '/train', label: 'Train', icon: TrainIcon },
  { to: '/progress', label: 'Progress', icon: ProgressIcon },
  { to: '/profile', label: 'Profile', icon: ProfileIcon },
]

export default function Layout() {
  const profile = useAppStore((s) => s.profile)

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text)' }}>
      {/* Desktop sidebar — fixed, does not scroll with page content */}
      <aside
        className="hidden md:flex md:flex-col w-60 shrink-0 border-r h-screen sticky top-0 overflow-y-auto"
        style={{ borderColor: 'var(--sq-border)', background: 'var(--sq-bg-raised)' }}
      >
        <div className="px-5 py-6">
          <div className="text-lg font-bold tracking-tight sq-mono">SAGEQUEST</div>
          <div className="text-xs mt-1" style={{ color: 'var(--sq-text-faint)' }}>
            90 days to make English automatic.
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[var(--sq-radius-sm)] text-sm font-medium transition-colors ${
                  isActive ? 'nav-active' : 'nav-inactive'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--sq-bg-inset)' : 'transparent',
                color: isActive ? 'var(--sq-text)' : 'var(--sq-text-muted)',
                borderLeft: isActive ? '2px solid var(--sq-accent)' : '2px solid transparent',
              })}
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>
        {profile && (
          <div className="px-5 py-4 border-t text-xs" style={{ borderColor: 'var(--sq-border)' }}>
            <div className="flex items-center justify-between">
              <span style={{ color: 'var(--sq-text-muted)' }}>{rankForXP(profile.xp)}</span>
              <span className="sq-mono" style={{ color: 'var(--sq-accent)' }}>{profile.xp} XP</span>
            </div>
            <div className="mt-1" style={{ color: 'var(--sq-text-faint)' }}>
              Day {profile.currentDay} / 90 · {profile.streak} day streak
            </div>
          </div>
        )}
      </aside>

      {/* Main content — this is the scrollable area, independent of the sidebar */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0 h-screen overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around border-t z-40"
        style={{
          background: 'var(--sq-bg-raised)',
          borderColor: 'var(--sq-border)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 py-2.5 px-2 flex-1 text-[11px] font-medium"
            style={({ isActive }) => ({
              color: isActive ? 'var(--sq-accent)' : 'var(--sq-text-faint)',
            })}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>
}
function JourneyIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3v18M18 3v18" /><circle cx="6" cy="7" r="2" /><circle cx="18" cy="13" r="2" /><circle cx="6" cy="19" r="2" /></svg>
}
function TrainIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
}
function ProgressIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></svg>
}
function ProfileIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>
}
