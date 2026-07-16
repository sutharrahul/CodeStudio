import { Injectable, Logger } from "@nestjs/common";
import * as util from "node:util";
import { exec } from "child_process";
import * as fs from "fs/promises";

import { executionCmd, extension } from "../common/constants";
import { ExecuteInput, ExecuteOutput } from "../common/types";

const execute = util.promisify(exec);

@Injectable()
export class ExecutorService {
  private readonly logger = new Logger(ExecutorService.name);
  async run({ code, input, lang }: ExecuteInput): Promise<ExecuteOutput> {
    this.logger.log(`Starting ${lang} code execution`);
    const copyCodePromise = Promise.all([
      fs.writeFile(`code.${extension[lang]}`, code),
      fs.writeFile("input", input),
    ]);

    try {
      const output = await copyCodePromise.then(async () => {
        this.logger.debug("Files written successfully.");
        const { stdout } = await execute(executionCmd[lang]);
        this.logger.log("Execution finished.");
        return stdout;
      });

      return { output, error: false };
    } catch (err: any) {
      this.logger.error(`Execution failed for ${lang}.`, err?.stack);
      return { output: err?.stderr, error: true };
    } finally {
      this.logger.debug("Cleaning temporary files.");
      exec(`rm -rf code.${extension[lang]} input a.out`);
    }
  }
}
