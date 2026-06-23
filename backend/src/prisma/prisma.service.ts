import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
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
