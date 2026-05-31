import { UserRole, SubscriptionTier, SubscriptionStatus } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      subscriptionTier: SubscriptionTier
      subscriptionStatus: SubscriptionStatus
    }
  }

  interface User {
    id: string
    role: UserRole
    subscriptionTier: SubscriptionTier
    subscriptionStatus: SubscriptionStatus
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    subscriptionTier: SubscriptionTier
    subscriptionStatus: SubscriptionStatus
  }
}