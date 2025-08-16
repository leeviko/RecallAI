import { betterAuth } from 'better-auth';
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
  // socialProviders: {
  //   google
  // }
};

export const auth = betterAuth({ ...options });
