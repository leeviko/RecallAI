import { betterAuth, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { socialProviders } from 'better-auth/social-providers';

const options = {
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  // socialProviders: {
  //   google
  // }
} satisfies BetterAuthOptions;

export const auth = betterAuth({ ...options });
