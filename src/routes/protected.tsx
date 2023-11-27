import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

import { Home } from '@/features/home/routes/Home'

const ProtectedRoutes = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to={'/log-in'} />
}

export const protectedRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/modules',
        element: <div>Modules</div>,
      },
    ],
  },
]
