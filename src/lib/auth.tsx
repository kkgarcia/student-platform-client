import { createContext, useContext, type PropsWithChildren } from 'react'
import { useUser } from '@/features/auth'

import storage from '@/utils/storage'

type AuthContextType = {
  user?: {
    id: number
    firstName: string
    lastName: string
    groupUnit: number
    role: 'STUDENT' | 'ADMIN'
  } | null
  logOut?: () => void
}

const AuthContext = createContext<AuthContextType>({})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user } = useUser()

  const logOut = () => {
    storage.clearToken()
  }

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext)
