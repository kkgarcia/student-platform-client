import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const queryGlobalConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
    enabled: true,
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryGlobalConfig,
})

export type ExtractFnReturnType<
  FnType extends (...args: unknown[]) => unknown
> = Awaited<ReturnType<FnType>>
