import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Saved_job, User } from '../dataTypes'

type UserLoginTypes = {
    user: User
    setUserDetails: (user?: User, saved_jobs?: Saved_job) => void
    logout: () => void
}

export const useUserLoginStore = create<UserLoginTypes>()(
    persist(
        (set, get) => ({
            user: { token: '' },
            setUserDetails: (user?: User, saved_jobs?: Saved_job) => set(() => ({ user: user, saved_jobs: saved_jobs })),
            logout: () => set(() => ({ user: {}, token: '', localStorage: localStorage.removeItem('userLogin-storage') }))
        }),
        {
            name: 'userLogin-storage',

        }
    ),
)

