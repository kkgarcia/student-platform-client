import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/lib/auth'

import { Login } from '@/features/auth'
import { Register } from '@/features/auth'

const PublicRoutes = () => {
  const { user } = useAuth()

  return user ? <Navigate to={'/'} /> : <Outlet />
}

export const publicRoutes = [
  {
    element: <PublicRoutes />,
    children: [
      {
        path: '/log-in',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]
