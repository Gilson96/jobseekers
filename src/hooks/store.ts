import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../dataTypes'

type UserLoginTypes = {
    user: User
    setUserDetails: (user: User) => void
    logout: () => void
}

export const useUserLoginStore = create<UserLoginTypes>()(
    persist(
        (set, get) => ({
            user: { token: '' },
            setUserDetails: (user: User) => set(() => ({ user: user })),
            logout: () => set(() => ({ user: {}, token: '', localStorage: localStorage.removeItem('userLogin-storage') }))
        }),
        {
            name: 'userLogin-storage',

        }
    ),
)

