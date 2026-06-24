import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CodeService } from './code.service'
import { ApiResponse, CodeData } from '../common/types'
import { isValidLanguage } from '../common/validator'
import { SaveCodeDto } from './dto/save-code.dto'

@Controller()
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('save/:id')
  async fetchCode(
    @Param('id') idParam: string,
  ): Promise<ApiResponse<CodeData>> {
    const id = +idParam
    if (isNaN(id)) {
      return { success: false, errorMessage: 'Bad request! 🙅🏻' }
    }

    try {
      const data = await this.codeService.getCode({ id })
      if (data === null) {
        return { success: false, errorMessage: `code not found ${id} 🫙` }
      }
      return { success: true, data }
    } catch {
      return { success: false, errorMessage: '500 Internal Server Error 😶' }
    }
  }

  @Post('save')
  async uploadCode(
    @Body() body: SaveCodeDto,
  ): Promise<ApiResponse<CodeData>> {
    const { code, lang } = body
    if (!code?.trim() || !isValidLanguage(lang)) {
      return { success: false, errorMessage: 'Bad request! 🙅🏻' }
    }

    try {
      const data = await this.codeService.saveCode({ code, lang })
      if (data === null) {
        return { success: false, errorMessage: 'Failed to save code 🎃' }
      }
      return { success: true, data }
    } catch {
      return { success: false, errorMessage: '500 Internal Server Error 😶' }
    }
  }
}
