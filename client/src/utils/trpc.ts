import { type AppRouter } from 'server/trpc'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include'
        })
      }
    })
  ]
})
