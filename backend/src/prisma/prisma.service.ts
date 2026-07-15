import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      console.log('Prisma Connection Success!!')
    } catch (err) {
      console.log(err)
      console.log('Prisma Connection Failed!!')
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
