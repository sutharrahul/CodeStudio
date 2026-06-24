import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CodeData, SaveCodeInput } from '../common/types'

@Injectable()
export class CodeService {
  constructor(private readonly prisma: PrismaService) {}

  async saveCode({ lang, code }: SaveCodeInput): Promise<CodeData | null> {
    return this.prisma.code_base.create({
      data: { lang, code },
    })
  }

  async getCode({ id }: { id: number }): Promise<CodeData | null> {
    return this.prisma.code_base.findUnique({
      where: { id },
    })
  }
}
