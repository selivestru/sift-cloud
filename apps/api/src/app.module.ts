import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller.js'
import { envSchema } from './app/env.schema.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      skipProcessEnv: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
