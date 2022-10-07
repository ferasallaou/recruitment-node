import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarbonController } from './carbon.controller';
import { CarbonCertificate, CarbonCertificateSchema } from './carbon.schema';
import { CarbonService } from './carbon.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CarbonCertificate.name, schema: CarbonCertificateSchema }])],
  controllers: [CarbonController],
  providers: [CarbonService]
})
export class CarbonModule { }
