import { Body, Controller, Post, Logger } from "@nestjs/common";
import { ExecutorService } from "./executor.service";
import { ApiResponse, ExecuteOutput } from "../common/types";
import { isValidLanguage } from "../common/validator";
import { ExecuteDto } from "./dto/execute.dto";

@Controller()
export class ExecutorController {
  private readonly logger = new Logger(ExecutorController.name);
  constructor(private readonly executorService: ExecutorService) {}

  @Post("execute")
  async execute(@Body() body: ExecuteDto): Promise<ApiResponse<ExecuteOutput>> {
    const { code, input, lang } = body;

    this.logger.log(`Execution request received for language: ${lang}`);
    if (!code?.trim() || !isValidLanguage(lang)) {
      this.logger.warn(`Invalid execution request. Language: ${lang}`);
      return { success: false, errorMessage: "Bad request! 🙅🏻" };
    }

    try {
      const data = await this.executorService.run({ code, lang, input });
      this.logger.log(`Execution completed successfully.`);
      return { success: true, data };
    } catch (error:any) {
      this.logger.error("Execution request failed.", error.stack);
      return {
        success: false,
        errorMessage: "Some Truble in Executing your Code! 😶",
      };
    }
  }
}
