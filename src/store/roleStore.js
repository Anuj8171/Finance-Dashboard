import { create } from 'zustand'

const useRoleStore = create((set) => ({
  role: 'viewer',
  setRole: (role) => set({ role }),
}))

export default useRoleStore