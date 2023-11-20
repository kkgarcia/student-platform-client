import { useCallback } from 'react'
import { useAuth } from './auth'

export enum ROLES {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

type RoleTypes = keyof typeof ROLES

export const POLICIES = {
  // TODO: implement comment feature
  'comment:delete': () => true,
}

export const useAuthorization = () => {
  const { user } = useAuth()

  if (!user) {
    throw Error('User does not exist!')
  }

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      return allowedRoles?.includes(user.role)
    },
    [user.role]
  )

  return { checkAccess, role: user.role }
}

type AuthorizationProps = {
  children: React.ReactNode
} & (
  | {
      allowedRoles: RoleTypes[]
      policyCheck?: never
    }
  | {
      allowedRoles?: never
      policyCheck: boolean
    }
)

export const Authorization = ({
  policyCheck,
  allowedRoles,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization()

  let canAccess = false

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles })
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck
  }

  return <>{canAccess ? children : null}</>
}
