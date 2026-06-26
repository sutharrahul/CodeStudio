import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaModule } from './prisma/prisma.module'
import { CodeModule } from './code/code.module'
import { ExecutorModule } from './executor/executor.module'

@Module({
  imports: [PrismaModule, CodeModule, ExecutorModule],
  controllers: [AppController],
})
export class AppModule {}
