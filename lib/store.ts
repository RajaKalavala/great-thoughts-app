import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ThemeTag } from './theme'

export interface Thought {
  id: string
  text: string
  author?: string
  tags: ThemeTag[]
  createdAt?: string
  source: 'curated' | 'public_domain'
}

export interface UserPreferences {
  selectedThemes: ThemeTag[]
  notificationTime: string // HH:MM format
  themeMode: 'light' | 'dark' | 'system'
  fontScale: number // 0.9 - 1.2
  reduceMotion: boolean
  hasCompletedOnboarding: boolean
}

interface AppState {
  // User preferences
  preferences: UserPreferences
  setPreferences: (prefs: Partial<UserPreferences>) => void

  // Saved thoughts
  savedThoughtIds: Set<string>
  saveThought: (thoughtId: string) => void
  unsaveThought: (thoughtId: string) => void
  isThoughtSaved: (thoughtId: string) => boolean

  // Daily thought tracking
  lastShownThoughtIds: string[] // Keep last 30 to avoid repeats
  addShownThought: (thoughtId: string) => void
  hasRecentlyShown: (thoughtId: string) => boolean

  // Current session
  currentThoughtIndex: number
  setCurrentThoughtIndex: (index: number) => void
}

const defaultPreferences: UserPreferences = {
  selectedThemes: ['mindfulness', 'gratitude'],
  notificationTime: '08:00',
  themeMode: 'system',
  fontScale: 1.0,
  reduceMotion: false,
  hasCompletedOnboarding: false,
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User preferences
      preferences: defaultPreferences,
      setPreferences: (newPrefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPrefs },
        })),

      // Saved thoughts
      savedThoughtIds: new Set(),
      saveThought: (thoughtId) =>
        set((state) => ({
          savedThoughtIds: new Set([...state.savedThoughtIds, thoughtId]),
        })),
      unsaveThought: (thoughtId) =>
        set((state) => {
          const newSet = new Set(state.savedThoughtIds)
          newSet.delete(thoughtId)
          return { savedThoughtIds: newSet }
        }),
      isThoughtSaved: (thoughtId) => get().savedThoughtIds.has(thoughtId),

      // Daily thought tracking
      lastShownThoughtIds: [],
      addShownThought: (thoughtId) =>
        set((state) => ({
          lastShownThoughtIds: [
            thoughtId,
            ...state.lastShownThoughtIds.slice(0, 29), // Keep last 30
          ],
        })),
      hasRecentlyShown: (thoughtId) =>
        get().lastShownThoughtIds.includes(thoughtId),

      // Current session
      currentThoughtIndex: 0,
      setCurrentThoughtIndex: (index) => set({ currentThoughtIndex: index }),
    }),
    {
      name: 'life-thoughts-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        preferences: state.preferences,
        savedThoughtIds: Array.from(state.savedThoughtIds),
        lastShownThoughtIds: state.lastShownThoughtIds,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert savedThoughtIds back to Set
          state.savedThoughtIds = new Set(state.savedThoughtIds as string[])
        }
      },
    }
  )
)
