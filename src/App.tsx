import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppStore } from './lib/store'
import Layout from './components/Layout'
import Onboarding from './screens/Onboarding'
import PlacementTest from './screens/PlacementTest'
import Home from './screens/Home'
import Journey from './screens/Journey'
import Train from './screens/Train'
import Progress from './screens/Progress'
import Profile from './screens/Profile'
import MissionRunner from './screens/MissionRunner'
import TrainDrill from './screens/TrainDrill'
import VerbAttack from './screens/VerbAttack'

export default function App() {
  const { profile, loading, init } = useAppStore()

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    const theme = profile?.theme
    const root = document.documentElement
    if (theme === 'dark' || theme === 'light') root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
  }, [profile?.theme])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--sq-bg)', color: 'var(--sq-text-muted)' }}>
        <span className="sq-mono text-sm">Loading SAGEQUEST…</span>
      </div>
    )
  }

  if (!profile) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    )
  }

  if (!profile.placementCompleted) {
    return (
      <Routes>
        <Route path="*" element={<PlacementTest />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/mission/:day" element={<MissionRunner />} />
      <Route path="/train/verb-attack" element={<VerbAttack />} />
      <Route path="/train/:mode" element={<TrainDrill />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/train" element={<Train />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}
