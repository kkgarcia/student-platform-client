import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

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
        element: <div>Home</div>,
      },
    ],
  },
]
