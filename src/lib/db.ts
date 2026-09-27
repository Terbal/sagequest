import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type {
  UserProfile,
  ConceptProgress,
  ErrorRecord,
  DailyMissionState,
  XPLogEntry,
  PlacementResult,
} from '../core/types'

interface SageQuestDB extends DBSchema {
  profile: {
    key: string
    value: UserProfile
  }
  progress: {
    key: string // conceptId
    value: ConceptProgress
    indexes: { 'by-kind': string; 'by-next-review': number }
  }
  errors: {
    key: string
    value: ErrorRecord
    indexes: { 'by-resolved': number }
  }
  missionState: {
    key: number // day
    value: DailyMissionState
  }
  xpLog: {
    key: string
    value: XPLogEntry
  }
  placement: {
    key: string
    value: PlacementResult
  }
}

const DB_NAME = 'sagequest-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<SageQuestDB>> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<SageQuestDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('progress')) {
          const store = db.createObjectStore('progress', { keyPath: 'conceptId' })
          store.createIndex('by-kind', 'kind')
          store.createIndex('by-next-review', 'nextReviewDue')
        }
        if (!db.objectStoreNames.contains('errors')) {
          const store = db.createObjectStore('errors', { keyPath: 'id' })
          store.createIndex('by-resolved', 'resolvedFlag')
        }
        if (!db.objectStoreNames.contains('missionState')) {
          db.createObjectStore('missionState', { keyPath: 'day' })
        }
        if (!db.objectStoreNames.contains('xpLog')) {
          db.createObjectStore('xpLog', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('placement')) {
          db.createObjectStore('placement', { keyPath: 'id' } as any)
        }
      },
    })
  }
  return dbPromise
}

export const PROFILE_KEY = 'local-user'

export async function loadProfile(): Promise<UserProfile | undefined> {
  const db = await getDB()
  return db.get('profile', PROFILE_KEY)
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  const db = await getDB()
  await db.put('profile', profile)
}

export async function loadAllProgress(): Promise<ConceptProgress[]> {
  const db = await getDB()
  return db.getAll('progress')
}

export async function saveProgress(progress: ConceptProgress): Promise<void> {
  const db = await getDB()
  await db.put('progress', progress)
}

export async function getProgress(conceptId: string): Promise<ConceptProgress | undefined> {
  const db = await getDB()
  return db.get('progress', conceptId)
}

export async function loadDueProgress(now = Date.now()): Promise<ConceptProgress[]> {
  const all = await loadAllProgress()
  return all.filter((p) => p.nextReviewDue > 0 && p.nextReviewDue <= now)
}

export async function addError(err: ErrorRecord): Promise<void> {
  const db = await getDB()
  await db.put('errors', err)
}

export async function loadErrors(): Promise<ErrorRecord[]> {
  const db = await getDB()
  return db.getAll('errors')
}

export async function saveMissionState(state: DailyMissionState): Promise<void> {
  const db = await getDB()
  await db.put('missionState', state)
}

export async function loadMissionState(day: number): Promise<DailyMissionState | undefined> {
  const db = await getDB()
  return db.get('missionState', day)
}

export async function logXP(entry: XPLogEntry): Promise<void> {
  const db = await getDB()
  await db.put('xpLog', entry)
}

export async function loadXPLog(): Promise<XPLogEntry[]> {
  const db = await getDB()
  return db.getAll('xpLog')
}

export async function savePlacement(result: PlacementResult & { id: string }): Promise<void> {
  const db = await getDB()
  await db.put('placement', result as any)
}

export async function wipeAllData(): Promise<void> {
  const db = await getDB()
  await Promise.all([
    db.clear('profile'),
    db.clear('progress'),
    db.clear('errors'),
    db.clear('missionState'),
    db.clear('xpLog'),
    db.clear('placement'),
  ])
}
