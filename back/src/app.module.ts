import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as Joi from '@hapi/joi';
import { AuthService } from './auth/auth.service';
import { User42Module } from './user42/user42.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.string().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  }), UserModule, User42Module, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
