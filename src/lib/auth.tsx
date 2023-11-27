import { createContext, useContext, type PropsWithChildren } from 'react'
import { useUser } from '@/features/auth/api/getUser'

import storage from '@/utils/storage'

type AuthContextType = {
  user?: {
    id: number
    firstName: string
    lastName: string
    groupUnit: number
    role: 'STUDENT' | 'ADMIN'
  } | null
  logOut: () => void
}

const logOut = () => {
  storage.clearToken()
  window.location.assign(window.location.origin)
}

const AuthContext = createContext<AuthContextType>({ logOut })

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return
  }

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext)
