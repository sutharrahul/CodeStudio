import { config } from 'dotenv'
config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api/v1')

  const port = process.env.PORT || 3001
  await app.listen(port, () => {
    console.log(`Compiler engine up and running at port: ${port}`)
  })
}
bootstrap()
