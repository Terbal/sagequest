import { useEffect, useState } from 'react'
import { useAppStore } from '../lib/store'
import { SKILL_LABELS, type SkillId } from '../core/types'
import { getGrammarById } from '../content'
import { loadErrors } from '../lib/db'
import type { ErrorRecord } from '../core/types'

export default function Progress() {
  const profile = useAppStore((s) => s.profile)
  const progressMap = useAppStore((s) => s.progressMap)
  const [errors, setErrors] = useState<ErrorRecord[]>([])
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    loadErrors().then((e) => setErrors(e.slice(-6).reverse()))
  }, [])

  if (!profile) return null

  const skills = Object.entries(profile.skills) as [SkillId, number][]
  const concepts = Object.values(progressMap).filter((p) => p.kind === 'grammar')
  const strong = concepts.filter((c) => c.status === 'known' || c.status === 'mastered')
  const weak = concepts.filter((c) => c.status === 'learning' || c.status === 'developing')

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Progress</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--sq-text-muted)' }}>
        Estimated level: <span style={{ color: 'var(--sq-accent)' }}>{profile.estimatedCefr}</span>
      </p>

      <div className="sq-panel p-5 mb-6">
        <div className="text-xs font-semibold mb-4" style={{ color: 'var(--sq-text-faint)' }}>SKILLS</div>
        <div className="space-y-4">
          {skills.map(([id, value]) => (
            <div key={id}>
              <div className="flex justify-between text-sm mb-1.5">
                <span>{SKILL_LABELS[id]}</span>
                <span className="sq-mono" style={{ color: 'var(--sq-text-muted)' }}>{value}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: 'var(--sq-border)' }}>
                <div className="h-1.5 rounded-full" style={{ width: `${value}%`, background: 'var(--sq-accent)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="sq-panel p-5">
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-success)' }}>STRONG</div>
          {strong.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>Nothing mastered yet — keep training.</p>
          ) : (
            <div className="space-y-2">
              {strong.map((c) => (
                <div key={c.conceptId} className="text-sm flex items-center gap-2">
                  <span style={{ color: 'var(--sq-success)' }}>✓</span>
                  {getGrammarById(c.conceptId)?.label ?? c.conceptId}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sq-panel p-5">
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--sq-warning)' }}>WEAK</div>
          {weak.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--sq-text-faint)' }}>No weak spots detected yet.</p>
          ) : (
            <div className="space-y-2">
              {weak.map((c) => (
                <div key={c.conceptId} className="text-sm flex items-center gap-2">
                  <span style={{ color: 'var(--sq-warning)' }}>!</span>
                  {getGrammarById(c.conceptId)?.label ?? c.conceptId}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {concepts.length > 0 && (
        <div className="sq-panel p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold" style={{ color: 'var(--sq-text-faint)' }}>MASTERY</div>
            <button
              onClick={() => setShowDetail((v) => !v)}
              className="text-xs font-medium"
              style={{ color: 'var(--sq-accent)' }}
            >
              {showDetail ? 'Masquer le détail' : 'Voir le détail'}
            </button>
          </div>
          <div className="space-y-4">
            {concepts.map((c) => {
              const label = getGrammarById(c.conceptId)?.label ?? c.conceptId
              const statusColor =
                c.status === 'mastered' ? 'var(--sq-success)'
                : c.status === 'known' ? 'var(--sq-accent)'
                : c.status === 'developing' ? 'var(--sq-warning)'
                : c.status === 'learning' ? 'var(--sq-error)'
                : 'var(--sq-text-faint)'
              return (
                <div key={c.conceptId}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: 'var(--sq-text)' }}>{label}</span>
                    <span className="sq-mono text-xs uppercase" style={{ color: statusColor }}>{c.status}</span>
                  </div>
                  <div className="h-1.5 rounded-full mb-1" style={{ background: 'var(--sq-border)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${c.stats.masteryScore}%`, background: statusColor }} />
                  </div>
                  {showDetail && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-[11px]" style={{ color: 'var(--sq-text-muted)' }}>
                      <span>Accuracy (précision) {c.stats.accuracy}%</span>
                      <span>Speed (vitesse) {c.stats.speed}%</span>
                      <span>Retention (mémorisation) {c.stats.retention}%</span>
                      <span>Contexts (variété) {c.stats.contextVariation}%</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {showDetail && (
            <div className="text-[11px] leading-relaxed mt-5 pt-4 border-t" style={{ borderColor: 'var(--sq-border)', color: 'var(--sq-text-faint)' }}>
              Accuracy = % de réponses correctes récentes · Speed = rapidité par rapport à un temps de référence ·
              Retention = capacité à rester correct dans le temps · Contexts = nombre de situations différentes rencontrées.
              Le score de maîtrise combine les quatre.
            </div>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <div className="sq-panel p-5">
          <div className="text-xs font-semibold mb-4" style={{ color: 'var(--sq-text-faint)' }}>RECURRING ERRORS</div>
          <div className="space-y-2">
            {errors.map((e) => (
              <div key={e.id} className="text-sm">
                <span style={{ color: 'var(--sq-error)' }}>{e.wrongText}</span>
                {' → '}
                <span style={{ color: 'var(--sq-success)' }}>{e.rightText}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
