import { Injectable } from '@nestjs/common'
import * as util from 'node:util'
import { exec } from 'child_process'
import * as fs from 'fs/promises'

import { executionCmd, extension } from '../common/constants'
import { ExecuteInput, ExecuteOutput } from '../common/types'

const execute = util.promisify(exec)

@Injectable()
export class ExecutorService {
  async run({ code, input, lang }: ExecuteInput): Promise<ExecuteOutput> {
    const copyCodePromise = Promise.all([
      fs.writeFile(`code.${extension[lang]}`, code),
      fs.writeFile('input', input),
    ])

    try {
      const output = await copyCodePromise.then(async () => {
        const { stdout } = await execute(executionCmd[lang])
        return stdout
      })

      return { output, error: false }
    } catch (err: any) {
      return { output: err?.stderr, error: true }
    } finally {
      exec(`rm -rf code.${extension[lang]} input a.out`)
    }
  }
}
