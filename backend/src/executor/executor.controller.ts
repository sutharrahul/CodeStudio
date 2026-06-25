import { Body, Controller, Post } from '@nestjs/common'
import { ExecutorService } from './executor.service'
import { ApiResponse, ExecuteOutput } from '../common/types'
import { isValidLanguage } from '../common/validator'
import { ExecuteDto } from './dto/execute.dto'

@Controller()
export class ExecutorController {
  constructor(private readonly executorService: ExecutorService) {}

  @Post('execute')
  async execute(
    @Body() body: ExecuteDto,
  ): Promise<ApiResponse<ExecuteOutput>> {
    const { code, input, lang } = body
    if (!code?.trim() || !isValidLanguage(lang)) {
      return { success: false, errorMessage: 'Bad request! 🙅🏻' }
    }

    try {
      const data = await this.executorService.run({ code, lang, input })
      return { success: true, data }
    } catch {
      return {
        success: false,
        errorMessage: 'Some Truble in Executing your Code! 😶',
      }
    }
  }
}
