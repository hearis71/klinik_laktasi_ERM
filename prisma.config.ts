import type { PrismaConfig } from 'prisma-config'

export default {
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrateDevOutput: 'prisma/migrations',
} satisfies PrismaConfig
