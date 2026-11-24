import { StandardSchemaValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestNodeApplication, NodeAdapter } from '@nestjs/platform-node'

import { AppModule } from './app.module.js'
import { Env } from './app/env.schema.js'

async function bootstrap() {
  const app = await NestFactory.create<NestNodeApplication>(AppModule, new NodeAdapter())

  const configService = app.get(ConfigService<Env, true>)

  const origin = configService.get('ORIGIN', { infer: true })
  const port = configService.get('PORT', { infer: true })

  app.enableCors({
    origin,
    credentials: true,
  })

  app.useGlobalPipes(new StandardSchemaValidationPipe())

  await app.listen(port)
}

await bootstrap()
