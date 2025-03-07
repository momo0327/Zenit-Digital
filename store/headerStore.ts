import { create } from 'zustand'

type HeaderTheme = 'light' | 'dark'

interface HeaderStore {
  theme: HeaderTheme
  setTheme: (theme: HeaderTheme) => void
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
})) 