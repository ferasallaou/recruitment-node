import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CarbonModule } from './carbon/carbon.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? '', {
      user: process.env.DATABASE_USER ?? '',
      pass: process.env.DATABASE_PASS ?? '',
      dbName: process.env.DATABASE_NAME ?? ''
    }),
    CarbonModule,
    UserModule],
  controllers: [AppController],
})
export class AppModule { }
