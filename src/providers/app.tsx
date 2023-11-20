import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from '@/lib/auth'
import { queryClient } from '@/lib/react-query'

import { ENVIRONMENT } from '@/config'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {ENVIRONMENT == 'dev' && <ReactQueryDevtools />}
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}
