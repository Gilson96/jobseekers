import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../dataTypes'

type UserLoginTypes = {
    user: User
    setUserDetails: (user?: User) => void
    logout: () => void
}

export const useUserLoginStore = create<UserLoginTypes>()(
    persist(
        (set, get) => ({
            user: {},
            setUserDetails: (user?: User) => set(() => ({ user: user })),
            logout: () => set(() => ({ user: {}, localStorage: localStorage.removeItem('userLogin-storage') }))
        }),
        { name: 'userLogin-storage' }
    ),
)

