import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL ?? '', {
      user: process.env.DATABASE_USER ?? '',
      pass: process.env.DATABASE_PASS ?? '',
      dbName: process.env.DATABASE_NAME ?? ''
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
